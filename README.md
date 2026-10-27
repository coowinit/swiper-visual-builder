# Swiper Visual Builder v0.1.0

无需构建的 HTML + CSS + ES Modules 配置工具。统一 `config` 数据模型驱动表单、响应式 CSS、Swiper 初始化 JS 和独立 iframe 预览。

## 启动

在项目根目录启动静态服务器（由于使用 JavaScript ES Modules，部分浏览器不允许直接通过 `file://` 加载）：

```powershell
python -m http.server 8000
```

然后在 Chrome 访问 `http://localhost:8000/`。如果未安装 Python，也可以使用 VS Code Live Server 或其他静态 HTTP 服务。

## 功能

- 三设备容器 width / max-width / height 和 slidesPerView / spaceBetween 设置；CSS 断点为 768px 和 1024px。
- 自定义 Swiper ID 和类名；组件 CSS 以 ID 为作用域，避免与网站其他组件相互干扰。
- 导航、分页、自动播放、间隔、动画速度、循环。
- 幻灯片增删、排序、内容编辑；支持图片 URL 或网站相对路径。
- 实时 iframe 预览；查看、复制和下载 HTML/CSS/JS/完整 HTML。
- 配置 JSON 导入、导出。

## 文件

- `index.html`：编辑器界面
- `assets/css/app.css`：编辑器样式
- `assets/js/config.js`：配置默认值和验证
- `assets/js/exporter.js`：**唯一**的 HTML/CSS/JS 生成器
- `assets/js/app.js`：编辑器交互和预览

## 生产环境集成

完整 HTML 导出已引入固定版本 Swiper `14.3.0`（jsDelivr CDN）。分离导出时：

1. 在网站中引入 `https://cdn.jsdelivr.net/npm/swiper@14.3.0/swiper-bundle.min.css`。
2. 插入导出的 HTML。
3. 在主题 CSS 中添加导出的 CSS。
4. 页面已引入 `https://cdn.jsdelivr.net/npm/swiper@14.3.0/swiper-bundle.min.js` 后，执行导出的 JS。应确保 Swiper 全局变量已经加载。

WordPress 可以用 `wp_enqueue_style`、`wp_enqueue_script` 注册资源；避免同页面多次加载 bundle。

## 说明与限制

- **图片未打包**：`picsum.photos` 示例依赖网络，实际网站请替换为自己的图片 URL 或相对路径；导出后不会把图片复制到项目中。
- **CDN 依赖**：编辑器自身无需构建，但轮播预览和完整 HTML 使用 CDN，所以首次显示需要网络。
- **循环保护**：幻灯片数量不足以满足最大列数时，生成器自动关闭 `loop`，避免出现 Swiper 循环所需数量不足的警告。不要把此降级误认为循环已启用。
- `height: auto` 时高度由内容决定；本示例图文卡片采用百分比高度，建议为需要固定画面高度的轮播使用 px/vh。
- 版本定位为轻量配置器，不是图层拖拽设计器；尺寸输入只接受白名单 CSS 长度表达式。
- ID 和类名必须由字母开头，只支持字母数字、下划线、连字符；在页面中请确保组件 ID 唯一。
- iframe 中使用的源码来自 `generate(config).full`，导出的完整 HTML 亦直接使用同一字符串。预览视口宽度固定模拟为 PC 1100px、平板 820px、手机 390px，并非浏览器设备模拟器。
- 配置文件不运行任意 JS，文本经 HTML 转义；URL 字段仍应使用可信的图片及链接地址。

## 后续规划

更完整的模板系统、拖拽排序、图片上传/压缩打包、ZIP 导出、WordPress 动态查询等放入后续版本。


### v0.1.2 界面优化

- 宽屏布局下固定左右侧栏的标题区，右侧「添加」按钮不随幻灯片滚动而消失。
- 两侧内容区域保持独立滚动，但隐藏传统粗滚动条；鼠标滚轮、触控板和键盘滚动依然可用。
- 中间预览与代码区独立滚动，浏览器整体不会因幻灯片过多而持续变长。
- 窄屏设备保留自然页面滚动，避免嵌套滚动区域。
- 本次只调整编辑器布局，不改变项目 JSON、Swiper 生成器或导出代码。

## v0.1.2 更新：折叠配置分组

- 左侧设置划分为「基础标识」「响应式容器」「轮播选项」三个原生 `<details>` 可折叠区域；默认展开前两组。
- 支持键盘 Tab 聚焦、Enter/空格展开或折叠，保留焦点可视轮廓。
- 可使用「全部展开」「全部收起」批量操作；折叠只影响编辑界面，不影响 JSON 数据、实时预览或代码导出。
- 沿用 v0.1.1 三栏布局与隐藏滚动条策略。

## v0.2.0 模板系统

- 新增 Hero / Product / Gallery / Testimonials / Coverflow / Blog 六个模板，支持直接切换。
- 每个模板在同一编辑会话内保留独立草稿；JSON 导出保存当前模板配置。
- Gallery 使用两个 Swiper 实例与 Thumbs 联动；Coverflow 使用官方效果。
- 每个模板共享 generate()，预览与完整导出使用同一 HTML。
- 旧版 v0.1.2 JSON（无 schemaVersion）导入时自动迁移为 Product 模板。
- 限制：暂未实现跨模板草稿持久化、图库图片打包及拖拽式图层编辑。

## v0.2.1 样式修正（待浏览器复测）

- 新建的 Testimonials / Blog 模板默认高度改为 `auto`，避免沿用图片轮播的 420px 固定高度造成长空白。已保存的 JSON 中用户指定高度不会被覆盖。
- Testimonials 卡片采用最小高度及弹性排版，正文和头像不会被固定高度异常分离。
- Blog 图片采用 16:10 比例，内容自然撑开，避免固定高度导致卡片下方空白。
- Gallery 缩略图列表与主轮播共享响应式 width / max-width，并改进活动缩略图边框与移动端高度。
- 编辑器预览与完整 HTML 仍共用 `generate(config).full`；旧项目 JSON 结构未变。
- 如需测试已保存项目的旧固定高度，请手动把 Testimonials / Blog 的 PC、平板、手机高度分别改为 `auto`。

## 静态资源缓存版本（v0.2.1）

- `index.html` 的 CSS、入口 JS 添加 `?v=0.2.1`。
- ES Modules 的相对 `import` 路径也统一添加 `?v=0.2.1`，避免仅更新入口模块却继续命中旧依赖缓存。
- 后续修改 CSS/JS 并部署到 GitHub Pages 时，**同步更新以上各处版本号**（建议和 Release 版本一致）。
- 若未来资源文件较多，可改用构建工具的内容哈希文件名自动管理缓存。
- `?v=` 是浏览器的缓存键变更方法，不会修改文件本身；需确保服务器/CDN 对查询参数缓存行为符合预期。
