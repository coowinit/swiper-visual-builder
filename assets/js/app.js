import {DEFAULT_CONFIG,clone,validateConfig} from './config.js';
import {generate} from './exporter.js';
let config = clone(DEFAULT_CONFIG);
let currentDevice='desktop',sizeDevice='desktop',codeTab='html',generated=null;
const $=id=>document.getElementById(id);
const status=(message,error=false)=>{ $('status').textContent=message; $('status').classList.toggle('error',error); };
const dims={desktop:1100,tablet:820,mobile:390};
const renderInputs=()=>{
  document.querySelectorAll('[data-path]').forEach(el=>el.value=config[el.dataset.path]);
  document.querySelectorAll('[data-size]').forEach(el=>el.value=config.sizes[sizeDevice][el.dataset.size]);
  document.querySelectorAll('[data-option]').forEach(el=>{const value=config.options[el.dataset.option];if(el.type==='checkbox')el.checked=value;else el.value=value;});
  $('sizeDevice').value=sizeDevice;
};
function download(content,name,type='text/plain'){
  const blob=new Blob([content],{type:`${type};charset=utf-8`}),url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function displayCode(){if(generated)$('codeOutput').value=generated[codeTab];}
let updateTimer;
function render(){
  try{
    generated=generate(config);
    const iframe=$('preview');
    // Same HTML/CSS/JS output as downloadable standalone file; no separate preview renderer.
    iframe.srcdoc=generated.full;
    displayCode();status('配置有效 · 预览和代码已同步');
  }catch(e){ generated=null;$('codeOutput').value='';status(e.message,true); }
}
function scheduleRender(){clearTimeout(updateTimer);updateTimer=setTimeout(render,260);}
function refreshDevice(){document.querySelectorAll('[data-device]').forEach(b=>b.classList.toggle('active',b.dataset.device===currentDevice));$('deviceFrame').style.width=dims[currentDevice]+'px';$('previewNote').textContent=`${{desktop:'PC',tablet:'平板',mobile:'手机'}[currentDevice]}预览宽度 ${dims[currentDevice]}px · 容器尺寸按 iframe 实际视口计算`;}
function slideInput(label,value,key,index){const wrap=document.createElement('div');wrap.className='field';const lbl=document.createElement('label');lbl.textContent=label;const input=document.createElement('input');input.value=value;input.setAttribute('aria-label',`${label} ${index+1}`);input.addEventListener('input',()=>{config.slides[index][key]=input.value;scheduleRender();});wrap.append(lbl,input);return wrap;}
function renderSlides(){const list=$('slidesList');list.replaceChildren();config.slides.forEach((slide,i)=>{
  const card=document.createElement('div');card.className='slide-item';const head=document.createElement('div');head.className='slide-item-header';const title=document.createElement('span');title.textContent=`幻灯片 ${i+1}`;const actions=document.createElement('div');
  const buttons=[['↑',()=>move(i,-1)],['↓',()=>move(i,1)],['×',()=>{if(config.slides.length<=1){status('至少保留一张幻灯片',true);return;}config.slides.splice(i,1);renderSlides();render();}]];
  buttons.forEach(([t,fn],j)=>{const b=document.createElement('button');b.className='mini-btn';b.textContent=t;b.title=['上移','下移','删除'][j];b.addEventListener('click',fn);actions.append(b);});head.append(title,actions);card.append(head);
  for(const [label,key] of [['标题','title'],['副标题','subtitle'],['图片 URL','image'],['链接 URL','link']])card.append(slideInput(label,slide[key],key,i));list.append(card);
});}
function move(i,d){const j=i+d;if(j<0||j>=config.slides.length)return;[config.slides[i],config.slides[j]]=[config.slides[j],config.slides[i]];renderSlides();render();}
document.querySelectorAll('[data-path]').forEach(el=>el.addEventListener('input',()=>{config[el.dataset.path]=el.value;scheduleRender();}));
document.querySelectorAll('[data-size]').forEach(el=>el.addEventListener('input',()=>{const k=el.dataset.size;config.sizes[sizeDevice][k]=el.type==='number'?Number(el.value):el.value;scheduleRender();}));
document.querySelectorAll('[data-option]').forEach(el=>el.addEventListener('input',()=>{const k=el.dataset.option;config.options[k]=el.type==='checkbox'?el.checked:Number(el.value);scheduleRender();}));
$('sizeDevice').addEventListener('change',e=>{sizeDevice=e.target.value;currentDevice=sizeDevice;renderInputs();refreshDevice();});
document.querySelectorAll('[data-device]').forEach(b=>b.addEventListener('click',()=>{currentDevice=b.dataset.device;sizeDevice=currentDevice;renderInputs();refreshDevice();}));
document.querySelectorAll('[data-code]').forEach(b=>b.addEventListener('click',()=>{codeTab=b.dataset.code;document.querySelectorAll('[data-code]').forEach(x=>x.classList.toggle('active',x===b));displayCode();}));
$('addSlideBtn').addEventListener('click',()=>{if(config.slides.length>=100){status('最多支持 100 张幻灯片',true);return;}config.slides.push({title:'新幻灯片',subtitle:'请输入描述',image:'',link:'#'});renderSlides();render();});
$('resetBtn').addEventListener('click',()=>{if(!confirm('确定恢复全部默认配置？'))return;config=clone(DEFAULT_CONFIG);renderInputs();renderSlides();render();});
$('saveBtn').addEventListener('click',()=>{try{validateConfig(config);download(JSON.stringify(config,null,2),'swiper-project.json','application/json');}catch(e){status(e.message,true);}});
$('downloadBtn').addEventListener('click',()=>{if(generated)download(generated.full,config.id+'.html','text/html');else status('请先修正配置错误',true);});
$('downloadCodeBtn').addEventListener('click',()=>{if(generated)download(generated[codeTab],config.id+'.'+({full:'html',html:'html',css:'css',js:'js'}[codeTab]),codeTab==='full'||codeTab==='html'?'text/html':'text/plain');else status('请先修正配置错误',true);});
$('copyBtn').addEventListener('click',async()=>{if(!generated)return;try{await navigator.clipboard.writeText(generated[codeTab]);status('代码已复制');}catch{ $('codeOutput').focus();$('codeOutput').select();status('浏览器限制自动复制，已选中代码，请按 Ctrl+C'); }});
$('importBtn').addEventListener('click',()=>$('fileInput').click());
$('fileInput').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>1024*1024)throw Error('JSON 文件超过 1MB');const parsed=JSON.parse(await file.text());validateConfig(parsed);config=clone(parsed);renderInputs();renderSlides();render();status('项目 JSON 导入成功');}catch(err){status('导入失败：'+err.message,true);}finally{e.target.value='';}});
renderInputs();renderSlides();refreshDevice();render();

// Group visibility is editor UI state only; it never changes exported swiper configuration.
const settingGroups=[...document.querySelectorAll('.settings-group')];
$('expandSettingsBtn').addEventListener('click',()=>{settingGroups.forEach(group=>{group.open=true;});});
$('collapseSettingsBtn').addEventListener('click',()=>{settingGroups.forEach(group=>{group.open=false;});});
