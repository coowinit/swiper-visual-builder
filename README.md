# Swiper Visual Builder

**一个基于 [Swiper.js](https://swiperjs.com/) 的轻量级可视化轮播设计与代码生成工具。**

无需编写 Swiper 初始化代码，即可选择轮播模板、调整响应式布局与视觉样式、实时预览，并导出可集成到 HTML 网站或 WordPress 主题中的 HTML、CSS 和 JavaScript。

**当前稳定版本：v0.3.3** · [查看 Releases](https://github.com/coowinit/swiper-visual-builder/releases)

## 核心功能

- **六种内置模板**：Hero Banner、Product Carousel、Thumbnail Gallery、Testimonials、Coverflow、Blog Carousel。选择模板即可加载对应的内容结构和默认样式。
- **响应式配置**：分别设置 PC、平板、手机的容器宽度、最大宽度、高度、显示列数和间距；在编辑器中切换设备预览。
- **导航与分页**：选择 SVG 箭头图标，设置尺寸、颜色、背景、圆角、Inside / Outside 和偏移；分页支持 Bullets、Fraction、Progressbar、对齐与位置设置。
- **外观编辑**：调整卡片背景、圆角、边框、阴影、Padding，图片 Cover / Contain、比例与遮罩，以及标题和描述的字号、颜色、对齐方式和行数。
- **轮播交互**：导航、分页、循环、自动播放、间隔、速度与悬停暂停；按模板限制 Slide / Fade / Coverflow 的适用组合。
- **内容管理**：添加、编辑、删除及调整幻灯片顺序。各模板在当前编辑会话中保留独立草稿。
- **即时预览与代码导出**：独立 iframe 预览；查看、复制或下载 HTML、CSS、JavaScript，也可导出完整 HTML 页面。
- **JSON 项目管理**：保存当前项目配置并重新导入；支持迁移早期版本的 JSON。
- **内置 SVG 演示素材**：默认预览不需要外部占位图片；导出的 HTML 可内嵌这些演示 SVG。

## 六种轮播模板

| 模板 | 适用场景 | 主要特色 |
| --- | --- | --- |
| **Hero Banner** | 网站首页横幅 | 大图、标题、描述、按钮，支持 Fade |
| **Product Carousel** | 产品展示 | 响应式多列图片卡片 |
| **Thumbnail Gallery** | 产品图片画廊 | 主图与缩略图联动，支持 Fade |
| **Testimonials** | 客户评价 | 评价、头像与作者信息 |
| **Coverflow** | 特色图片展示 | 3D 透视切换 |
| **Blog Carousel** | 博客与资讯 | 封面图、分类、日期与摘要 |

> 模板与切换效果不是一回事。编辑器会根据所选模板限制不合适的效果组合，避免生成不兼容的配置。

## 快速开始

本项目使用原生 **HTML + CSS + JavaScript ES Modules**，无需 npm 安装或前端构建。

克隆或下载仓库后，在项目根目录运行：

```powershell
python -m http.server 8000
```

随后在浏览器打开 **http://localhost:8000/**。也可以使用 VS Code Live Server 等静态 HTTP 服务。由于采用 ES Modules，不建议直接使用 `file://` 打开编辑器。

基本使用流程：

1. 选择轮播模板并修改幻灯片内容。
2. 设置组件 ID / Class、响应式尺寸、导航、分页及视觉样式。
3. 切换 PC / 平板 / 手机预览，确认实际效果。
4. 导出完整 HTML 进行独立测试，或将分离的 HTML / CSS / JS 集成到网站。
5. 导出 JSON，便于以后重新编辑当前项目。

## 网站集成

- **完整 HTML**：包含演示页面结构、样式、初始化脚本和 Swiper CDN 引用，适合快速测试。
- **分离代码**：适合已有 HTML 项目或 WordPress 主题；由网站统一加载 Swiper 资源，避免在同一页面重复引入。
- **自定义 ID 与 Class**：导出 CSS 主要以组件 ID 为作用域，便于多个轮播共存。

当前使用 **Swiper.js 14.3.0**。生成代码引用的 Swiper 库与编辑器自身 `?v=` 静态资源缓存版本是两个独立概念。

**注意：** 编辑器内置占位 SVG 可嵌入导出代码，但用户填写的外部图片 URL 或站点相对路径不会自动打包；发布前请替换为真实素材并检查路径。完整 HTML 默认仍使用 Swiper CDN，不能视为完全离线包。

## 技术设计

```text
统一 JSON 配置
    ├── 模板定义与默认样式
    ├── 参数校验与旧配置迁移
    └── 统一代码生成器
          ├── iframe 实时预览
          └── HTML / CSS / JS 导出
```

预览和完整 HTML 导出共用生成逻辑，减少“编辑器看起来正确、导出后不一致”的风险。编辑器 CSS、JS 与 ES Module 引用使用发布版本参数进行缓存管理。

## 后续扩展方向

当前 **v0.3.3 已封板**，后续扩展以实际网站交付为目标，优先补齐资源管理和完整项目导出，而不是继续增加大量参数。以下为研究方向，**尚未实现，也不构成版本承诺**。

| 优先级 | 方向 | 计划内容 |
| --- | --- | --- |
| **优先** | 图片资源管理 | 本地图片上传、预览、压缩，以及导出资源处理 |
| **优先** | ZIP 完整打包 | HTML / CSS / JS / 图片一起导出，改善离线部署体验 |
| **中期** | 模板与样式完善 | 扩充高质量模板预设，优化移动端、默认视觉及可访问性 |
| **中期** | 项目管理 | 多模板草稿持久化、配置版本迁移、项目导入导出体验 |
| **中期** | WordPress 集成 | 提供主题接入示例，研究与动态文章、产品查询对接 |
| **后期** | 高级交互 | 图片放大预览、更多经过验证的过渡效果与性能优化 |
| **暂缓** | 自由图层编辑 | 类似 Swiper Studio 的拖放、图层和动画时间线，评估维护成本后再决定 |

### 下一阶段建议：v0.4.0

聚焦形成一条完整的交付流程：**添加或上传真实图片 → 配置轮播 → 实时预览 → 导出包含资源的 ZIP → 在独立 HTML / WordPress 网站中验证**。开发前先明确图片路径重写、文件重名、体积限制、格式与压缩策略，以及多轮播实例的资源去重和 Swiper 库加载方式。

### 长期参考资源

| 资源 | 主要借鉴方向 |
| --- | --- |
| [Swiper Playground](https://swiperjs.com/playground) | 参数配置、兼容性校验与实时预览 |
| [Swiper Studio](https://studio.swiperjs.com/play) | 模板管理、属性面板和可视化交互 |
| [Carousel Builder](https://webdevpuneet.com/carousel-builder/) | 轻量轮播配置、代码导出和交付体验 |
| [Smart Slider 3](https://wordpress.org/plugins/smart-slider-3/) | WordPress 模板及内容编辑流程 |
| [Depicter](https://wordpress.org/plugins/depicter/) | WordPress 动态文章与产品内容设计 |
| [Embla Carousel](https://github.com/davidjerleke/embla-carousel) / [Keen Slider](https://github.com/rcbyr/keen-slider) | 研究交互架构，不作为现有 Swiper 引擎的替代依赖 |

仅参考公开的交互原则和实现思路，不复制第三方商业素材或受限制的代码。

**项目原则：** 优先生成适合实际网站使用、可维护的标准代码；配置、预览与导出保持一致；不过度堆砌设置选项。

## 项目链接

- [GitHub 仓库](https://github.com/coowinit/swiper-visual-builder)
- [版本发布记录](https://github.com/coowinit/swiper-visual-builder/releases)
- [Swiper 官方文档](https://swiperjs.com/)
