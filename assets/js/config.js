export const SWIPER_VERSION = '14.3.0';
export const DEFAULT_CONFIG = {
  id: 'home-product-slider', className: 'product-swiper',
  sizes: {
    desktop: { width:'100%', maxWidth:'1200px', height:'420px', slidesPerView:3, gap:24 },
    tablet:  { width:'100%', maxWidth:'100%', height:'340px', slidesPerView:2, gap:16 },
    mobile:  { width:'100%', maxWidth:'100%', height:'280px', slidesPerView:1, gap:12 }
  },
  options: { navigation:true, pagination:true, autoplay:false, delay:3000, loop:false, speed:500 },
  slides: [
    {title:'Outdoor Decking', subtitle:'Featured collection', image:'https://picsum.photos/seed/decking101/1000/700', link:'#'},
    {title:'Wall Cladding', subtitle:'Modern exterior', image:'https://picsum.photos/seed/cladding202/1000/700', link:'#'},
    {title:'Garden Living', subtitle:'Designed for outdoors', image:'https://picsum.photos/seed/garden303/1000/700', link:'#'},
    {title:'Architectural Series', subtitle:'Inspired by materials', image:'https://picsum.photos/seed/architecture404/1000/700', link:'#'},
    {title:'Timber Collection', subtitle:'Natural textures', image:'https://picsum.photos/seed/wood505/1000/700', link:'#'}
  ]
};
export const clone = value => JSON.parse(JSON.stringify(value));
const slug = value => /^[A-Za-z][A-Za-z0-9_-]*$/.test(value);
const cssSize = value => value === 'auto' || /^(?:0|(?:\d+(?:\.\d+)?)(?:px|%|vw|vh|rem|em))$/.test(value);
export function validateConfig(c) {
  if (!c || typeof c !== 'object') throw Error('项目 JSON 结构不正确');
  if (!slug(c.id || '') || !slug(c.className || '')) throw Error('ID 和类名必须以字母开头，仅包含字母、数字、- 或 _');
  for (const key of ['desktop','tablet','mobile']) {
    const s = c.sizes?.[key];
    if (!s) throw Error(`缺少 ${key} 设备配置`);
    for (const name of ['width','maxWidth','height']) if (!cssSize(s[name] || '')) throw Error(`${key} 的 ${name} 无效，请使用 px、%、vw、vh、rem、em 或 auto`);
    if (!Number.isInteger(s.slidesPerView) || s.slidesPerView < 1 || s.slidesPerView > 10) throw Error('每屏列数应为 1–10');
    if (!Number.isFinite(s.gap) || s.gap < 0 || s.gap > 200) throw Error('间距应为 0–200');
  }
  const o=c.options;
  if (!o || ['navigation','pagination','autoplay','loop'].some(k=>typeof o[k]!=='boolean')) throw Error('轮播选项不正确');
  if (!Number.isFinite(o.delay)||o.delay<500||o.delay>60000||!Number.isFinite(o.speed)||o.speed<100||o.speed>10000) throw Error('自动播放间隔或切换速度无效');
  if (!Array.isArray(c.slides)||c.slides.length<1||c.slides.length>100) throw Error('需要 1–100 张幻灯片');
  for(const s of c.slides) if (['title','subtitle','image','link'].some(k=>typeof s?.[k]!=='string')) throw Error('幻灯片字段格式不正确');
  return true;
}
