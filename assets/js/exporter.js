import { SWIPER_VERSION, validateConfig } from './config.js';
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const cssValue = value => value === 'auto' ? 'auto' : value;
const safeJson = obj => JSON.stringify(obj,null,2).replaceAll('<','\\u003c');
export function generate(c) {
  validateConfig(c);
  const id = c.id;
  const selector = `#${id}`;
  const slides = c.slides.map(s=>`    <div class="swiper-slide">\n      <a class="svb-card" href="${esc(s.link || '#')}">\n        ${s.image ? `<img src="${esc(s.image)}" alt="${esc(s.title)}" loading="lazy">` : '<div class="svb-placeholder"></div>'}\n        <span class="svb-card-content"><strong>${esc(s.title)}</strong><small>${esc(s.subtitle)}</small></span>\n      </a>\n    </div>`).join('\n');
  const html = `<div id="${id}" class="swiper ${c.className}">\n  <div class="swiper-wrapper">\n${slides}\n  </div>\n${c.options.pagination ? '  <div class="swiper-pagination"></div>\n' : ''}${c.options.navigation ? '  <div class="swiper-button-prev"></div>\n  <div class="swiper-button-next"></div>\n' : ''}</div>`;
  const rules = (s) => `width: ${cssValue(s.width)};\n  max-width: ${cssValue(s.maxWidth)};\n  height: ${cssValue(s.height)};`;
  const css = `/* Swiper Visual Builder · scoped to ${selector} */\n${selector} {\n  ${rules(c.sizes.mobile)}\n  margin-inline: auto;\n  --swiper-theme-color: #2563eb;\n}\n${selector} .swiper-slide { min-width: 0; height: 100%; }\n${selector} .svb-card { position: relative; display: block; width: 100%; height: 100%; overflow: hidden; border-radius: 12px; background: #dbe4ee; color: #fff; text-decoration: none; }\n${selector} .svb-card img { display: block; width: 100%; height: 100%; object-fit: cover; }\n${selector} .svb-placeholder { width: 100%; height: 100%; background: linear-gradient(130deg,#9bb6d8,#587b9d); }\n${selector} .svb-card-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 50px 20px 22px; background: linear-gradient(transparent,rgba(0,0,0,.72)); display: grid; gap: 5px; }\n${selector} .svb-card-content strong { font: 600 22px/1.3 system-ui,sans-serif; }\n${selector} .svb-card-content small { font: 400 13px/1.4 system-ui,sans-serif; }\n${selector} .swiper-button-next, ${selector} .swiper-button-prev { color: #fff; filter: drop-shadow(0 2px 4px #3339); }\n${selector} .swiper-pagination-bullet-active { background: #fff; }\n@media (min-width: 768px) {\n  ${selector} {\n    ${rules(c.sizes.tablet)}\n  }\n}\n@media (min-width: 1024px) {\n  ${selector} {\n    ${rules(c.sizes.desktop)}\n  }\n}\n`;
  const options = {
    slidesPerView: c.sizes.mobile.slidesPerView, spaceBetween:c.sizes.mobile.gap,
    speed:c.options.speed, loop:c.options.loop && c.slides.length > Math.max(...Object.values(c.sizes).map(s=>s.slidesPerView)),
    ...(c.options.autoplay ? {autoplay:{delay:c.options.delay,disableOnInteraction:false}} : {autoplay:false}),
    ...(c.options.pagination ? {pagination:{el:`${selector} .swiper-pagination`,clickable:true}} : {}),
    ...(c.options.navigation ? {navigation:{nextEl:`${selector} .swiper-button-next`,prevEl:`${selector} .swiper-button-prev`}} : {}),
    breakpoints: {768:{slidesPerView:c.sizes.tablet.slidesPerView,spaceBetween:c.sizes.tablet.gap},1024:{slidesPerView:c.sizes.desktop.slidesPerView,spaceBetween:c.sizes.desktop.gap}}
  };
  const js = `/* Requires Swiper bundle ${SWIPER_VERSION} */\n(() => {\n  const root = document.getElementById(${JSON.stringify(id)});\n  if (!root || typeof Swiper === 'undefined') return;\n  new Swiper(root, ${safeJson(options).replaceAll('\\u003c','\\u003c')});\n})();\n`;
  const base = `https://cdn.jsdelivr.net/npm/swiper@${SWIPER_VERSION}`;
  const full = `<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width,initial-scale=1">\n  <title>${esc(id)} · Swiper Demo</title>\n  <link rel="stylesheet" href="${base}/swiper-bundle.min.css">\n  <style>\n${css}  </style>\n</head>\n<body style="margin:0;padding:24px;background:#f3f5f9">\n${html}\n<script src="${base}/swiper-bundle.min.js"><\/script>\n<script>\n${js}<\/script>\n</body>\n</html>`;
  return {html,css,js,full,options};
}
