import { brand, siteName, email, links, github, studies } from './content.mjs';

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

// WebGL 检测未通过时仍可阅读个人资料、查看作品和打开外部链接。
export function staticHome() {
  const projects = studies.slice(0, 6).map(project => `
    <article>
      <a href="${escape(project.projectURL)}"><img src="${escape(project.video.thumbnail)}" alt="" loading="lazy"><h2>${escape(project.name)} ↗</h2></a>
      <p>${escape(project.description)}</p>
    </article>`).join('');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${siteName}</title>
  <style>
    @font-face{font-family:MiSans;src:url('/assets/boot/regular.woff2');font-display:swap}
    *{box-sizing:border-box}body{margin:0;background:#0e141a;color:#e9eceb;font:16px/1.65 MiSans,sans-serif}
    main{max-width:1120px;margin:auto;padding:64px 24px}header{max-width:650px;margin-bottom:48px}
    h1{font-size:40px;line-height:1.2;margin:8px 0 20px}h2{font-size:20px;margin:12px 0 8px}
    p{color:#b8c2c3;margin:0}a{color:inherit;text-underline-offset:5px}a:focus-visible{outline:2px solid #b8c2c3;outline-offset:5px}
    nav{display:flex;flex-wrap:wrap;gap:12px 24px;margin-top:24px}.projects{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:40px 28px}
    article>a{text-decoration:none}img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover}
    footer{margin-top:48px;font-size:13px;color:#b8c2c3}@media(max-width:640px){main{padding:36px 20px}.projects{grid-template-columns:1fr}}
  </style>
</head>
<body><main>
  <header><p>Rhine Lab / Personal Node</p><h1>${brand}</h1><p>${escape(studies[6].description)}</p>
    <nav aria-label="Personal links"><a href="${github}">GitHub</a><a href="${links.blog}">Blog</a><a href="${links.music}">Music</a><a href="${links.steam}">Steam</a><a href="mailto:${email}">Email</a></nav>
  </header>
  <section class="projects" aria-label="Projects">${projects}</section>
  <footer><a href="/">Interactive homepage</a> · <a href="/photo-credits.html">Photo Credits</a></footer>
</main></body></html>`;
}
