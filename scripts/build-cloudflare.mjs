import './build.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { gzipSync, gunzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { createAssetsWorker } from '../src/pages-assets.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'out');
assert.equal(path.dirname(output), root);
assert.equal(path.basename(output), 'out');
await fs.rm(output, { recursive: true, force: true });
await fs.cp(path.join(root, 'public'), output, { recursive: true });

// Pages 的单文件上限为 25 MiB。大模型只做无损传输压缩，解压后的字节完全一致。
const compressedAssets = {};
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
  compressedAssets[url] = url + '.gz';
  console.log(`${url}: ${stat.size} → ${compressed.length} bytes`);
}
if (Object.keys(compressedAssets).length) {
  const worker = `${createAssetsWorker.toString()}\nexport default createAssetsWorker(${JSON.stringify(compressedAssets)});\n`;
  await fs.writeFile(path.join(output, '_worker.js'), worker, 'utf8');
  await fs.writeFile(path.join(output, '_routes.json'), JSON.stringify({ version: 1, include: Object.keys(compressedAssets), exclude: [] }), 'utf8');
}
console.log('Cloudflare Pages 构建完成，输出目录 out。');
