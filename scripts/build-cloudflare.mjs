import './build.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { gzipSync, gunzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'out');
assert.equal(path.dirname(output), root);
assert.equal(path.basename(output), 'out');
await fs.rm(output, { recursive: true, force: true });
await fs.cp(path.join(root, 'public'), output, { recursive: true });

// Pages 的单文件上限为 25 MiB。大模型只做无损传输压缩，解压后的字节完全一致。
const redirects = [];
const headers = [];
const limit = 25 * 1024 * 1024;
for (const entry of await fs.readdir(output, { recursive: true, withFileTypes: true })) {
  if (!entry.isFile()) continue;
  const filename = path.join(entry.parentPath, entry.name);
  const stat = await fs.stat(filename);
  if (stat.size <= limit) continue;
  assert.equal(path.extname(filename), '.json', `需要单独处理的大文件 ${filename}`);
  const original = await fs.readFile(filename);
  const compressed = gzipSync(original, { level: 9 });
  assert.ok(compressed.length <= limit);
  assert.deepEqual(gunzipSync(compressed), original);
  await fs.writeFile(filename + '.gz', compressed);
  await fs.unlink(filename);
  const url = '/' + path.relative(output, filename).split(path.sep).join('/');
  redirects.push(`${url} ${url}.gz 200`);
  headers.push(`${url}.gz\n  Content-Type: application/json\n  Content-Encoding: gzip\n  Cache-Control: public, max-age=0, must-revalidate, no-transform`);
  console.log(`${url}: ${stat.size} → ${compressed.length} bytes`);
}
await fs.writeFile(path.join(output, '_redirects'), redirects.join('\n') + '\n', 'utf8');
await fs.writeFile(path.join(output, '_headers'), headers.join('\n\n') + '\n', 'utf8');
console.log('Cloudflare Pages 构建完成，输出目录 out。');
