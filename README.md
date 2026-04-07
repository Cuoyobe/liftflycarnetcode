# 🎯 领飞特网页代码库
这是领飞特网页代码提交库，用于存放和部署网页代码。

<!-- 可选：加一个项目封面图或演示动图 -->
![项目演示](https://github.com/你的用户名/项目名/raw/main/assets/demo.gif)

## 📊 项目：liftflycar.com

### 🏗️ 项目架构

| 属性 | 详情 |
|------|------|
| **框架** | Next.js 16.1.3 (App Router) |
| **语言** | TypeScript 5.7.2 |
| **样式** | Tailwind CSS 3.4.17 |
| **动画** | Framer Motion |
| **图标** | Lucide React |
| **CMS** | Notion API (新闻/知识库) |
| **邮件** | EmailJS (预订表单) |

### 📁 文件结构

```
liftflycarnetcode/
├── src/
│   ├── app/              # 7个页面路由
│   │   ├── page.tsx      # 首页
│   │   ├── about/        # 关于我们
│   │   ├── product/      # 产品页
│   │   ├── news/         # 新闻页
│   │   ├── support/      # 支持/知识库
│   │   ├── preorder/     # 预订页
│   │   └── policy/       # 隐私政策
│   ├── components/       # 17个React组件
│   ├── context/          # 语言/主题上下文
│   ├── data/             # 产品数据、假数据
│   ├── hooks/            # 自定义Hooks
│   └── lib/              # 工具函数、i18n、Notion API
├── public/               # 静态资源
│   ├── img/              # 图片 (~50张)
│   ├── video/            # 视频文件
│   ├── font/             # 字体文件
│   └── social/           # 社交媒体图标
```

---

### 🖼️ 图片资源清单（需要修改的重点）

#### **首页 (`/`)**
| 位置 | 文件路径 | 用途 |
|------|----------|------|
| Hero背景视频 | `/video/intro.webm` | 首页首屏视频 |
| 产品特性图1 | `/img/home/feature-lightweight.png` | 轻量化特性 |
| 产品特性图2 | `/img/home/feature-safety.webp` | 安全特性 |
| 产品特性图3 | `/img/home/feature-easy.webp` | 易用特性 |
| 应用场景图1-6 | `/img/home/scenario-*.webp` | 6个场景卡片 |
| 新闻封面1-3 | `/img/home/news-*.webp` | 新闻区域 |
| CSR轮播图1-3 | `/img/home/news-lab.webp` 等 | 社会责任区块 |

#### **产品页 (`/product`)**
| 位置 | 文件路径 | 用途 |
|------|----------|------|
| 产品主图 | `/img/product/hero.jpg` | 产品页首屏 |
| 特性图1 | `/img/product/electric-drive.webp` | 电力驱动 |
| 特性图2 | `/img/product/lightweight.webp` | 轻量化 |
| 特性图3 | `/img/product/easy-control.webp` | 易操控 |
| 特性图4 | `/img/product/safety.webp` | 安全性 |
| 展示图1-2 | `/img/product/showcase-*.webp` | 产品展示画廊 |
| 六视图 | `/img/product/{front,back,left,right,top,bird}.webp` | 产品六视图 |

#### **关于页 (`/about`)**
| 位置 | 文件路径 | 用途 |
|------|----------|------|
| Hero背景 | `/img/ground.webp` | 首屏背景 |
| 创新区块 | `/img/about/innovation.webp` | 创新力量 |
| 人文区块 | `/img/about/people-first.webp` | 以人为本 |
| 加入我们图标1-3 | `/img/about/{rd,global-service,market-expansion}.webp` | 三个岗位 |
| 展示图1-2 | `/img/about/showcase-about.webp`, `ground3.webp` | 全屏展示 |

#### **新闻页 (`/news`)**
| 位置 | 文件路径 | 用途 |
|------|----------|------|
| Hero背景 | `/img/fly5.webp` | 新闻列表页首屏 |

#### **其他**
| 位置 | 文件路径 | 用途 |
|------|----------|------|
| Logo | `/img/header.png`, `/img/footer.png` | 导航栏/页脚 |
| 社交媒体图标 | `/social/*.svg` | 7个社交平台 |

---

### 🎬 视频资源清单

| 文件路径 | 用途 | 引用位置 |
|----------|------|----------|
| `/video/intro.webm` | 首页Hero背景视频 | `Hero.tsx` |
| `/video/bg.mp4` | 产品页背景(预留) | `products.ts` (未实际使用) |

---

### 🔧 修改图片/视频的操作指南

**1. 直接替换文件**
```bash
# 替换首页视频
cp 新视频.webm /Users/a1/Downloads/liftflycarnetcode/public/video/intro.webm

# 替换产品主图
cp 新图片.jpg /Users/a1/Downloads/liftflycarnetcode/public/img/product/hero.jpg
```

**2. 修改代码引用路径**（如果需要改文件名或新增图片）

*例如修改 `Hero.tsx` 中的视频：*
```tsx
// 当前代码 (Hero.tsx 第45-48行)
<video ...>
    <source src="/video/intro.webm" type="video/webm" />
</video>

// 改为新视频
<source src="/video/new-video.mp4" type="video/mp4" />
```

**3. 关键组件的图片引用位置**

| 组件 | 图片引用方式 | 位置 |
|------|-------------|------|
| `Hero.tsx` | `<video src="/video/intro.webm">` | 第45-48行 |
| `ProductIntro.tsx` | `backgroundImage` 数组 | 第12-16行 |
| `ApplicationScenarios.tsx` | `scenarioImages` 数组 | 第25-32行 |
| `CSR.tsx` | `backgroundImage` 数组 | 第12-16行 |
| `product/page.tsx` | `selectedProduct.image` | 第47行 |
| `about/page.tsx` | `backgroundImage` style | 多处 |

---

### 💡 建议

1. **视频格式**：目前用 WebM，如果新视频是 MP4，需要改代码里的 `type="video/webm"` 为 `type="video/mp4"`

2. **图片格式**：项目混用了 `.webp` 和 `.png`/`.jpg`。建议统一用 WebP 以获得更好压缩率，但保持原格式也能工作

3. **响应式图片**：大尺寸展示图建议准备多个分辨率版本，目前项目用的是单图方案

4. **备份**：修改前先备份原文件，特别是 `/video/intro.webm` 和 `/img/product/hero.jpg`
  
## ✨ 核心特性
- ✅ 特性 1：无服务部署成本低
- ✅ 特性 2：模块化搭建效率高
- ✅ 特性 3：代码简洁加载快
  
## 🚀 快速开始
### 环境要求
- Node.js >= 18.x
- npm / yarn / pnpm

### 安装步骤
```bash
# 1. 克隆项目
git clone https://github.com/Cuoyobe/liftflycarnetcode.git

# 2. 进入项目目录
cd 项目名

# 3. 安装依赖
npm install

# 4. 启动开发服务器
npm run dev
