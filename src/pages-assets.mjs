// Pages 静态响应头会触发二次压缩，使用手动编码流式返回已压缩资源。
export function createAssetsWorker(compressedAssets) {
  return {
    async fetch(request, env) {
      const url = new URL(request.url);
      const asset = compressedAssets[url.pathname];
      if (!asset) return env.ASSETS.fetch(request);

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('Accept-Encoding', 'identity');
      requestHeaders.delete('Range');
      const response = await env.ASSETS.fetch(new Request(new URL(asset, url), {
        method: request.method,
        headers: requestHeaders
      }));
      if (response.status !== 200) return response;

      const headers = new Headers(response.headers);
      headers.set('Content-Type', 'application/json');
      headers.set('Content-Encoding', 'gzip');
      headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
      return new Response(response.body, { status: 200, headers, encodeBody: 'manual' });
    }
  };
}
