export const TEMPLATE_DEFS = {
  hero:{name:'Hero Banner',description:'全宽横幅 · 标题与按钮',fields:['title','subtitle','image','link','buttonText'], defaults:{title:'Explore the Outdoors',subtitle:'Beautiful spaces begin here',image:'./assets/images/placeholders/hero-01.svg',link:'#',buttonText:'Explore Now'},columns:[1,1,1]},
  product:{name:'Product Carousel',description:'产品网格 · 图片与名称',fields:['title','subtitle','image','link'],defaults:{title:'Outdoor Decking',subtitle:'Featured collection',image:'./assets/images/placeholders/product-01.svg',link:'#'},columns:[3,2,1]},
  gallery:{name:'Thumbnail Gallery',description:'主图 · 缩略图联动',fields:['title','subtitle','image'],defaults:{title:'Product Detail',subtitle:'Gallery image',image:'./assets/images/placeholders/gallery-01.svg'},columns:[1,1,1]},
  testimonials:{name:'Testimonials',description:'客户评价 · 引言与头像',fields:['title','subtitle','quote','image'],defaults:{title:'Alex Morgan',subtitle:'Operations Director',quote:'Great product quality and attentive service from start to finish.',image:'./assets/images/placeholders/testimonials-01.svg'},columns:[3,2,1]},
  coverflow:{name:'Coverflow',description:'3D 透视 · 居中卡片',fields:['title','subtitle','image','link'],defaults:{title:'Featured Design',subtitle:'Explore collection',image:'./assets/images/placeholders/coverflow-01.svg',link:'#'},columns:[1,1,1]},
  blog:{name:'Blog Carousel',description:'文章卡片 · 分类与日期',fields:['title','subtitle','image','link','category','date'],defaults:{title:'Designing Outdoor Living',subtitle:'Ideas for sustainable exterior spaces.',image:'./assets/images/placeholders/blog-01.svg',link:'#',category:'Insights',date:'2026-10-27'},columns:[3,2,1]}
};
export const FIELDS={title:'标题 / 姓名',subtitle:'副标题 / 描述',image:'图片 URL',link:'链接 URL',buttonText:'按钮文案',quote:'评价内容',category:'分类',date:'日期'};
export const templateSlide=(key,index=0)=>({...TEMPLATE_DEFS[key].defaults,image:`./assets/images/placeholders/${key}-${String(index%5+1).padStart(2,'0')}.svg`});
export function templateConfig(base,key){const def=TEMPLATE_DEFS[key];const c=JSON.parse(JSON.stringify(base));c.template=key;c.effect=key==='coverflow'?'coverflow':'slide';c.slides=Array.from({length:key==='gallery'?5:5},(_,i)=>({...templateSlide(key,i),title:i?`${def.defaults.title} ${i+1}`:def.defaults.title}));for(const [i,d] of ['desktop','tablet','mobile'].entries()){c.sizes[d].slidesPerView=def.columns[i];}if(key==='hero'){for(const d of Object.keys(c.sizes)) c.sizes[d].maxWidth='100%';}
// Template-specific visual presets are applied only when a new template is created.
// The user's adjustments are retained in the per-template draft and JSON export.
const overlay=key==='hero'||key==='product'||key==='coverflow';
c.style.typography.titleColor=overlay?'#ffffff':'#1e293b';
c.style.typography.descriptionColor=overlay?'#f1f5f9':'#64748b';
c.style.typography.titleSize=key==='hero'?36:key==='testimonials'?18:20;
c.style.typography.descriptionSize=key==='hero'?16:14;
c.style.image.fit=key==='gallery'?'contain':'cover';
c.style.card.background=key==='testimonials'||key==='blog'?'#ffffff':'#f1f5f9';
c.style.navigation.placement='inside';
c.style.navigation.icon='chevron';
c.style.pagination.placement=key==='hero'?'inside':'outside';
c.style.pagination.align='center';
c.style.navigation.position='center';
c.style.image.overlay=key==='hero'||key==='product'||key==='coverflow'?55:0;
c.style.navigation.background=key==='hero'||key==='gallery'?'#00000055':'#1e293b99';
c.style.pagination.position='bottom';
if(key==='testimonials'||key==='blog'){for(const d of Object.keys(c.sizes))c.sizes[d].height='auto';}if(key==='gallery'){c.style.pagination.placement='outside';c.options.pagination=false;c.options.navigation=true;c.options.loop=false;}if(key==='coverflow'){c.options.loop=false;c.options.pagination=true;}return c;}
