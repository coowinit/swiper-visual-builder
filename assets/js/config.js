import { TEMPLATE_DEFS } from './templates/registry.js?v=0.3.3';
export const DEFAULT_STYLE = {
 navigation: { icon:'chevron', position:'center', color:'#ffffff', background:'#00000055', iconSize:22, buttonSize:44, radius:50, offset:12, placement:'inside' },
 pagination: { type:'bullets', color:'#cbd5e1', activeColor:'#2563eb', size:9, gap:8, position:'bottom', placement:'outside', align:'center', clickable:true },
 card: { radius:12, borderWidth:1, borderColor:'#e2e8f0', shadow:'subtle', background:'#ffffff', padding:20 },
 image: { fit:'cover', overlay:55, ratio:'auto', customRatio:'4 / 3' },
 typography: { titleSize:20, descriptionSize:14, titleColor:'#1e293b', descriptionColor:'#64748b', align:'left', titleLines:2 }
};
export function withStyleDefaults(input){
 const c=clone(input); c.style ||= {};
 for(const [part,defaults] of Object.entries(DEFAULT_STYLE)) c.style[part]={...defaults,...(c.style[part]||{})};
 c.options.pauseOnMouseEnter ??= false;
 return c;
}

export const SWIPER_VERSION = '14.3.0';
export const DEFAULT_CONFIG = {
  schemaVersion: 3, template: 'product', effect: 'slide',
  id: 'home-product-slider', className: 'product-swiper',
  sizes: {
    desktop: { width:'100%', maxWidth:'1200px', height:'420px', slidesPerView:3, gap:24 },
    tablet:  { width:'100%', maxWidth:'100%', height:'340px', slidesPerView:2, gap:16 },
    mobile:  { width:'100%', maxWidth:'100%', height:'280px', slidesPerView:1, gap:12 }
  },
  options: { navigation:true, pagination:true, autoplay:false, delay:3000, loop:false, speed:500, pauseOnMouseEnter:false },
  style: JSON.parse(JSON.stringify(DEFAULT_STYLE)),
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
  if(!TEMPLATE_DEFS[c.template]) throw Error('模板类型无效');
  if(!['slide','fade','coverflow'].includes(c.effect)) throw Error('效果类型无效');
  const compat={hero:['slide','fade'],product:['slide'],gallery:['slide','fade'],testimonials:['slide'],coverflow:['slide','coverflow'],blog:['slide']};
  if(!compat[c.template].includes(c.effect)) throw Error('该模板不支持当前效果，请选择兼容的切换效果');
  if(typeof o.pauseOnMouseEnter!=='boolean') throw Error('悬停暂停参数无效');
  const s=c.style;if(!s || !s.navigation || !s.pagination || !s.card || !s.image || !s.typography)throw Error('缺少样式配置');
  const enums=[[s.navigation.icon,['simple','chevron','circle','long','thin','double','triangle','sharp','open','dash']],[s.navigation.placement,['inside','outside']],[s.navigation.position,['top','center','bottom']],[s.pagination.placement,['inside','outside']],[s.pagination.align,['left','center','right']],[s.pagination.type,['bullets','fraction','progressbar']],[s.pagination.position,['top','bottom']],[s.card.shadow,['none','subtle','medium']],[s.image.fit,['cover','contain']],[s.image.ratio,['auto','1/1','4/3','16/9','custom']],[s.typography.align,['left','center','right']]];
  for(const [v,allowed] of enums)if(!allowed.includes(v))throw Error('样式枚举值无效');
  const ints=[[s.navigation.iconSize,10,80],[s.navigation.buttonSize,24,120],[s.navigation.radius,0,60],[s.navigation.offset,0,100],[s.pagination.size,3,24],[s.pagination.gap,0,32],[s.card.radius,0,80],[s.card.borderWidth,0,12],[s.card.padding,0,100],[s.image.overlay,0,100],[s.typography.titleSize,10,72],[s.typography.descriptionSize,10,40],[s.typography.titleLines,1,8]];
  for(const [v,min,max] of ints)if(!Number.isFinite(v)||v<min||v>max)throw Error('样式数值超出允许范围');
  if(s.navigation.buttonSize<s.navigation.iconSize)throw Error('导航按钮尺寸不能小于箭头图标尺寸');
  for(const v of [s.navigation.color,s.navigation.background,s.pagination.color,s.pagination.activeColor,s.card.borderColor,s.card.background,s.typography.titleColor,s.typography.descriptionColor])if(!/^(#[0-9a-fA-F]{3,8}|transparent)$/.test(v))throw Error('颜色必须使用十六进制值或 transparent');
  if(typeof s.pagination.clickable!=='boolean')throw Error('分页点击选项无效');
  if(s.image.ratio==='custom' && !/^[1-9]\d{0,2}\s*\/\s*[1-9]\d{0,2}$/.test(s.image.customRatio))throw Error('自定义比例应为 4 / 3 格式');
  for(const s of c.slides) if (Object.values(s).some(v=>typeof v!=='string')) throw Error('幻灯片字段格式不正确');
  return true;
}

export function migrateConfig(input){
 let c=clone(input);
 if(c.schemaVersion===undefined){c.schemaVersion=2;c.template='product';c.effect='slide';}
 if(c.schemaVersion!==2 && c.schemaVersion!==3)throw Error('不支持此项目文件版本');
 c.template ||= 'product';c.effect ||= 'slide';
 const oldPaginationPlacement=c.style?.pagination?.placement; c=withStyleDefaults(c); if(oldPaginationPlacement===undefined && input.schemaVersion!==3)c.style.pagination.placement='inside'; if(c.style.pagination.align===undefined)c.style.pagination.align='center'; c.schemaVersion=3;
 validateConfig(c);return c;
}
