import {PLACEHOLDER_DATA} from './placeholders.js?v=0.3.3';
import {SWIPER_VERSION,validateConfig} from './config.js?v=0.3.3';
const esc=v=>String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const attr=v=>esc(v||'#');
const img=(s,cls='')=>s.image?`<img class="${cls}" src="${attr(PLACEHOLDER_DATA[s.image]||s.image)}" alt="${esc(s.title||'Gallery image')}" loading="lazy">`:'<div class="svb-placeholder"></div>';
const content=(s,type)=>{
 switch(type){
 case 'hero':return `<div class="svb-hero">${img(s)}<div class="svb-hero-copy"><h2>${esc(s.title)}</h2><p>${esc(s.subtitle)}</p><a class="svb-cta" href="${attr(s.link)}">${esc(s.buttonText||'Learn more')}</a></div></div>`;
 case 'gallery':return `<div class="svb-gallery-image">${img(s)}</div>`;
 case 'testimonials':return `<article class="svb-quote"><p class="svb-quote-text">“${esc(s.quote)}”</p><div class="svb-author">${img(s)}<div><strong>${esc(s.title)}</strong><small>${esc(s.subtitle)}</small></div></div></article>`;
 case 'blog':return `<a class="svb-blog" href="${attr(s.link)}">${img(s)}<div class="svb-blog-copy"><span>${esc(s.category)} · ${esc(s.date)}</span><h3>${esc(s.title)}</h3><p>${esc(s.subtitle)}</p></div></a>`;
 default:return `<a class="svb-card" href="${attr(s.link)}">${img(s)}<span class="svb-card-content"><strong>${esc(s.title)}</strong><small>${esc(s.subtitle)}</small></span></a>`;
 }
};
const rules=s=>`width:${s.width};max-width:${s.maxWidth};height:${s.height};`;
const styleRules=(id,c)=>{
 const x='#'+id,n=c.style.navigation,p=c.style.pagination,card=c.style.card,im=c.style.image,ty=c.style.typography;
 const ratio=im.ratio==='custom'?im.customRatio:im.ratio==='auto'?'auto':im.ratio.replace('/',' / ');
 const shadows={none:'none',subtle:'0 3px 12px rgba(15,23,42,.09)',medium:'0 10px 28px rgba(15,23,42,.20)'};
 const shapes={simple:'M4 12h16m-7-7 7 7-7 7',chevron:'m8 4 8 8-8 8',circle:'M20 12H4m9-7 7 7-7 7',long:'M2 12h20m-9-8 8 8-8 8',thin:'m9 3 9 9-9 9',double:'m5 4 8 8-8 8m8-16 8 8-8 8',triangle:'M8 4 19 12 8 20Z',sharp:'M7 3 16 12 7 21',open:'m6 6 6 6-6 6m7-12 6 6-6 6',dash:'M4 12h16m-6-6 6 6-6 6'};
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${shapes[n.icon]}" stroke="black" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
 const svgUri='data:image/svg+xml,'+encodeURIComponent(svg);
 const pos=n.placement==='outside'?'8px':`${n.offset}px`;
 const outerGutter=n.placement==='outside'&&c.options.navigation ? n.buttonSize+n.offset+8 : 0;
 const navTop=n.position==='top'?`${n.buttonSize/2+n.offset}px`:n.position==='bottom'?`calc(var(--svb-main-height, 420px) - ${n.buttonSize/2+n.offset}px)`:'calc(var(--svb-main-height, 420px) / 2)';
 const paginationPlacement=p.placement==='outside';
 const paginationAlign=p.align==='left'?'left':p.align==='right'?'right':'center';
 const cardSelector=`${x} .svb-card,${x} .svb-blog,${x} .svb-quote`;
 return `/* Visual styles · v0.3.3 */
${x}{--swiper-theme-color:${p.activeColor};overflow:hidden;}
${x}-stage{position:relative;box-sizing:border-box;width:100%;margin-inline:auto;${n.placement==='outside'&&c.options.navigation?`padding-inline:${outerGutter}px;`:''}}
${cardSelector}{border-radius:${card.radius}px;border:${card.borderWidth}px solid ${card.borderColor};box-shadow:${shadows[card.shadow]};background:${card.background};}
${x} .svb-quote{padding:${card.padding}px;}
${x} .svb-blog-copy{padding:${card.padding}px;}
${x} .svb-card-content{padding-left:${card.padding}px;padding-right:${card.padding}px;}
${x} .svb-card img,${x} .svb-blog img,${x} .svb-gallery-image img,${x} .svb-hero img{object-fit:${im.fit};${ratio==='auto'?'':`aspect-ratio:${ratio};`}}
${x} .svb-blog img{${ratio==='auto'?'aspect-ratio:16 / 10;':'height:auto;'}}
${x} .svb-card-content,${x} .svb-blog-copy,${x} .svb-quote,${x} .svb-hero-copy{text-align:${ty.align};}
${x} .svb-card-content strong,${x} .svb-blog-copy h3,${x} .svb-author strong{font-size:${ty.titleSize}px;color:${ty.titleColor};line-height:1.35;display:-webkit-box;-webkit-line-clamp:${ty.titleLines};-webkit-box-orient:vertical;overflow:hidden;}
${x} .svb-card-content small,${x} .svb-blog-copy p,${x} .svb-author small{font-size:${ty.descriptionSize}px;color:${ty.descriptionColor};}
${x} .svb-quote-text{font-size:${ty.titleSize}px;color:${ty.titleColor};}
${x} .svb-card-content,${x} .svb-hero:after{--svb-overlay:${im.overlay/100};}
${x} .svb-card-content{background:linear-gradient(transparent,rgba(0,0,0,${im.overlay/100}));}
${x} .svb-hero:after{background:linear-gradient(90deg,rgba(0,0,0,${im.overlay/100}),transparent 90%);}
${x} .svb-hero-copy h2{color:${ty.titleColor};}
${x} .svb-hero-copy p{font-size:${ty.descriptionSize}px;color:${ty.descriptionColor};}
${x}-stage > .swiper-button-prev,${x}-stage > .swiper-button-next{top:${navTop};width:${n.buttonSize}px;height:${n.buttonSize}px;border-radius:${n.radius}px;background:${n.background};color:${n.color};margin-top:-${n.buttonSize/2}px;display:flex;align-items:center;justify-content:center;text-shadow:none;filter:none;}
${x}-stage > .swiper-button-prev{left:${pos};right:auto;}
${x}-stage > .swiper-button-next{right:${pos};left:auto;}
${x}-stage > .swiper-button-prev svg,${x}-stage > .swiper-button-next svg{display:none;}
${x}-stage > .swiper-button-prev:after,${x}-stage > .swiper-button-next:after{font-family:Arial,sans-serif;font-weight:400;font-size:${n.iconSize}px;line-height:1;}
${x}-stage > .swiper-button-prev:after,${x}-stage > .swiper-button-next:after{content:"";width:${n.iconSize}px;height:${n.iconSize}px;background:currentColor;mask:url("${svgUri}") center/contain no-repeat;-webkit-mask:url("${svgUri}") center/contain no-repeat;}
${x}-stage > .swiper-button-prev:after{transform:rotate(180deg);}
${x}-stage > .svb-pagination{position:${paginationPlacement?'relative':'absolute'};left:auto;right:auto;top:auto;bottom:auto;box-sizing:border-box;width:100%;min-height:${paginationPlacement?'28px':'auto'};margin:${paginationPlacement?'8px 0 0':'0'};padding:${paginationPlacement?'5px 0':'0 12px'};display:flex;align-items:center;justify-content:${paginationAlign==='left'?'flex-start':paginationAlign==='right'?'flex-end':'center'};z-index:6;${!paginationPlacement?'bottom:12px;pointer-events:none;':''}color:${p.activeColor};}
${x}-stage > .svb-pagination .swiper-pagination-bullet{pointer-events:auto;}
${x}-stage > .svb-pagination.swiper-pagination-progressbar{position:${paginationPlacement?'relative':'absolute'};width:100%;${paginationPlacement?'margin-top:8px;':'bottom:0;'}padding:0;min-height:0;}
${x}-stage .swiper-pagination-bullet{width:${p.size}px;height:${p.size}px;background:${p.color};opacity:1;margin-left:${p.gap/2}px!important;margin-right:${p.gap/2}px!important;}
${x}-stage .swiper-pagination-bullet-active{background:${p.activeColor};}
${x}-stage .swiper-pagination-progressbar{height:${Math.max(2,Math.round(p.size/2))}px;background:${p.color};}
${x}-stage .swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:${p.activeColor};}
${x}-thumbs .swiper-slide-thumb-active{border-color:${p.activeColor};}
`;
};
const sty=(id,c)=>{
const compact=c.template==='testimonials'||c.template==='blog';
const x=`#${id}`;
return `/* Generated by Swiper Visual Builder v0.3.3 */\n${x}-stage{max-width:${c.sizes.mobile.maxWidth};--svb-main-height:${c.sizes.mobile.height==='auto'?'220px':c.sizes.mobile.height};}
${x}{${rules(c.sizes.mobile)}max-width:100%;min-width:0;margin-inline:auto;--swiper-theme-color:#2563eb;}\n${x} .swiper-slide{min-width:0;height:${compact?'auto':'100%'};box-sizing:border-box;}\n${compact?`${x} .swiper-wrapper{align-items:stretch;}\n`: ''}\n${x} img{display:block;width:100%;height:100%;object-fit:cover;}\n${x} .svb-placeholder{width:100%;height:100%;background:linear-gradient(130deg,#9bb6d8,#587b9d);}\n${x} .svb-card{position:relative;display:block;width:100%;height:100%;overflow:hidden;border-radius:12px;color:#fff;background:#dbe4ee;text-decoration:none;}\n${x} .svb-card-content{position:absolute;bottom:0;left:0;right:0;padding:50px 20px 22px;background:linear-gradient(transparent,#000b);display:grid;gap:5px;}\n${x} .svb-card-content strong{font:600 22px/1.3 system-ui;}\n${x} .svb-card-content small{font:400 13px/1.4 system-ui;}\n${x} .svb-hero{position:relative;width:100%;height:100%;background:#263344;color:white;}\n${x} .svb-hero:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#000a,transparent 85%);pointer-events:none;}\n${x} .svb-hero-copy{position:absolute;z-index:1;top:50%;left:8%;transform:translateY(-50%);max-width:580px;}\n${x} .svb-hero-copy h2{font:700 clamp(24px,4vw,54px)/1.13 system-ui;margin:0 0 12px;}\n${x} .svb-hero-copy p{font:16px/1.6 system-ui;margin:0 0 25px;}\n${x} .svb-cta{display:inline-block;background:#fff;color:#18253b;text-decoration:none;padding:13px 20px;border-radius:6px;font:600 14px system-ui;}\n${x} .svb-gallery-image{height:100%;background:#eef2f7;}\n${x} .svb-quote{height:100%;min-height:215px;box-sizing:border-box;padding:24px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;display:flex;flex-direction:column;justify-content:flex-start;gap:24px;font-family:system-ui;color:#263348;}\n${x} .svb-quote-text{font-size:clamp(14px,1.5vw,19px);line-height:1.65;margin:0;}\n${x} .svb-author{display:flex;align-items:center;gap:12px;margin-top:auto;min-width:0;}\n${x} .svb-author img{width:46px;height:46px;border-radius:50%;} \n${x} .svb-author strong,${x} .svb-author small{display:block;}\n${x} .svb-author small{font-size:12px;color:#64748b;}\n${x} .svb-blog{display:block;height:100%;box-sizing:border-box;border-radius:12px;background:#fff;color:#1e293b;overflow:hidden;text-decoration:none;font-family:system-ui;border:1px solid #e5e7eb;}\n${x} .svb-blog img{height:auto;aspect-ratio:16/10;object-fit:cover;} \n${x} .svb-blog-copy{padding:18px;}\n${x} .svb-blog-copy span{font-size:11px;color:#64748b;}\n${x} .svb-blog-copy h3{font-size:17px;line-height:1.35;margin:8px 0;}\n${x} .svb-blog-copy p{font-size:12px;color:#64748b;margin:0;line-height:1.5;}\n${x} .swiper-button-next,${x} .swiper-button-prev{color:#fff;text-shadow:0 1px 6px #0009;}\n${x}-stage .swiper-pagination-bullet-active{background:#fff;}\n${x}-thumbs{width:100%;max-width:100%;height:76px;margin:12px auto 0;cursor:pointer;}\n${x}-thumbs .swiper-slide img{width:100%;height:100%;object-fit:cover;}\n${x}-thumbs .swiper-slide{box-sizing:border-box;height:100%;opacity:.55;border:2px solid transparent;border-radius:7px;overflow:hidden;transition:opacity .2s ease,border-color .2s ease;}\n${x}-thumbs .swiper-slide-thumb-active{opacity:1;border-color:#2563eb;}\n${x}-stage > .swiper-button-next,${x}-stage > .swiper-button-prev{z-index:5;}\n/* pagination position is controlled by the style configuration */\n@media(max-width:767px){${x} .svb-quote{min-height:185px;padding:18px;}${x} .svb-blog-copy{padding:14px;}${x}-thumbs{height:60px;}}\n@media(min-width:768px){${x}-stage{max-width:${c.sizes.tablet.maxWidth};--svb-main-height:${c.sizes.tablet.height==='auto'?'220px':c.sizes.tablet.height};}${x}{${rules(c.sizes.tablet)}max-width:100%;}${x}-thumbs{width:100%;max-width:100%;}}\n@media(min-width:1024px){${x}-stage{max-width:${c.sizes.desktop.maxWidth};--svb-main-height:${c.sizes.desktop.height==='auto'?'220px':c.sizes.desktop.height};}${x}{${rules(c.sizes.desktop)}max-width:100%;}${x}-thumbs{width:100%;max-width:100%;}}\n`;
};
export function generate(c){
 validateConfig(c);
 const id=c.id,selector=`#${id}`,gallery=c.template==='gallery',cover=c.template==='coverflow';
 const slides=c.slides.map(s=>`    <div class="swiper-slide">${content(s,c.template)}</div>`).join('\n');
 const thumbHtml=gallery?`\n<div id="${id}-thumbs" class="swiper svb-thumbs"><div class="swiper-wrapper">${c.slides.map(s=>`<div class="swiper-slide">${img(s)}</div>`).join('')}</div></div>`:'';
 const html=`<div id="${id}-stage" class="svb-stage"><div id="${id}" class="swiper ${c.className}">\n  <div class="swiper-wrapper">\n${slides}\n  </div>\n</div>${thumbHtml}${c.options.pagination&&!gallery?'  <div class="svb-pagination swiper-pagination"></div>\n':''}${c.options.navigation?'  <div class="swiper-button-prev"></div>\n  <div class="swiper-button-next"></div>\n':''}</div>`;
 const css=sty(id,c)+styleRules(id,c);
 const minCount=Math.max(...Object.values(c.sizes).map(s=>s.slidesPerView));
 const options={slidesPerView:gallery||cover?1:c.sizes.mobile.slidesPerView,spaceBetween:gallery?0:c.sizes.mobile.gap,speed:c.options.speed,loop:!gallery&&!cover&&c.options.loop&&c.slides.length>minCount,...(c.options.autoplay?{autoplay:{delay:c.options.delay,disableOnInteraction:false,pauseOnMouseEnter:c.options.pauseOnMouseEnter}}:{autoplay:false}),...(c.options.pagination&&!gallery?{pagination:{el:`${selector}-stage > .svb-pagination`,type:c.style.pagination.type,clickable:c.style.pagination.type==='bullets'&&c.style.pagination.clickable}}:{}),...(c.options.navigation?{navigation:{nextEl:`${selector}-stage > .swiper-button-next`,prevEl:`${selector}-stage > .swiper-button-prev`}}:{}),...(c.effect==='fade'?{effect:'fade',fadeEffect:{crossFade:true}}:{}),...(cover&&c.effect==='coverflow'?{effect:'coverflow',centeredSlides:true,coverflowEffect:{rotate:35,stretch:0,depth:110,modifier:1,slideShadows:true}}:{}),breakpoints:gallery||cover?{}:{768:{slidesPerView:c.sizes.tablet.slidesPerView,spaceBetween:c.sizes.tablet.gap},1024:{slidesPerView:c.sizes.desktop.slidesPerView,spaceBetween:c.sizes.desktop.gap}}};
 const js=`/* Requires Swiper bundle ${SWIPER_VERSION} */\n(() => {\n const root=document.getElementById(${JSON.stringify(id)});\n if(!root || typeof Swiper==='undefined') return;\n${gallery?` const thumbs=new Swiper(${JSON.stringify('#'+id+'-thumbs')},{slidesPerView:5,spaceBetween:10,watchSlidesProgress:true,freeMode:true});\n`:''} new Swiper(root,${JSON.stringify({...options,...(gallery?{thumbs:{swiper:'__THUMBS__'}}:{})},null,2).replace('"__THUMBS__"','thumbs')});\n})();`;
 const base=`https://cdn.jsdelivr.net/npm/swiper@${SWIPER_VERSION}`;
 const full=`<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(id)} - Swiper</title><link rel="stylesheet" href="${base}/swiper-bundle.min.css"><style>body{margin:0;padding:24px;background:#f3f5f9;}\n${css}</style></head><body>${html}\n<script src="${base}/swiper-bundle.min.js"><\/script><script>${js}<\/script></body></html>`;
 return {html,css,js,full,options};
}
