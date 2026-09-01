import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Home,
  Images,
  Mail,
  MoveRight,
  Palette,
  Sparkles,
  Layers3,
  MessageSquareMore,
  ShieldCheck,
  Workflow,
  Orbit,
  Menu,
  UserRound,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portrait from './assets/portrait-new.png';
import Particles from './Particles';
import ParticleText from './ParticleText';

gsap.registerPlugin(ScrollTrigger);

const heroVideos = ['/hero-video-01.mp4', '/hero-video-02.mp4', '/hero-video-03.mp4'];
const postHeroParticleColors = ['#ffffff', '#ffffff'];
const contactEmail = '240036296@qq.com';

const navItems = [
  { label: '首页', href: '#home', icon: Home },
  { label: '经历', href: '#about', icon: UserRound },
  { label: '作品集', href: '#projects', icon: Images },
  { label: '联系', href: '#contact', icon: Mail },
];

const stats = [
  { value: '1998', label: '出生年' },
  { value: '2', label: '学历阶段' },
  { value: '7', label: '常用工具' },
  { value: '3', label: '核心方向' },
];

const strengths = [
  {
    icon: Palette,
    title: '审美判断',
    text: '把画面、信息和品牌气质统一到一条干净的视觉语言里。',
  },
  {
    icon: Workflow,
    title: '协作推进',
    text: '跨部门沟通、商务谈判和节奏把控都能稳稳接住。',
  },
  {
    icon: Sparkles,
    title: 'AI 视觉',
    text: '能把生成式工具融入提案、素材和实验性视觉里。',
  },
  {
    icon: ShieldCheck,
    title: '关系维护',
    text: '对客户心理和多线程沟通敏感，适合长期项目协同。',
  },
];

const adsMedia = {
  videos: [
    ['参考模式', '/portfolio/ads/01-参考模式.mp4'],
    ['参考模式 retry 02', '/portfolio/ads/01-参考模式-retry-02.mp4'],
  ],
  outdoor: [
    ['户外广告牌 01', '/portfolio/ads/outdoor/户外广告牌-09_画板 1.jpg'],
    ['户外广告牌 02', '/portfolio/ads/outdoor/户外广告牌-09-02.jpg'],
    ['户外广告牌 03', '/portfolio/ads/outdoor/户外广告牌-09-03.jpg'],
    ['户外广告牌 04', '/portfolio/ads/outdoor/户外广告牌-09-04.jpg'],
    ['户外广告牌 05', '/portfolio/ads/outdoor/户外广告牌-09-05.jpg'],
    ['户外广告牌 06', '/portfolio/ads/outdoor/户外广告牌-09-06.jpg'],
    ['户外广告牌 07', '/portfolio/ads/outdoor/户外广告牌-09-07.jpg'],
    ['户外广告牌 08', '/portfolio/ads/outdoor/户外广告牌-09-08.jpg'],
    ['户外广告牌 09', '/portfolio/ads/outdoor/户外广告牌-09-09.jpg'],
  ],
};

const comicMedia = {
  videos: [
    ['分开', '/portfolio/comic/分开.mp4'],
    ['古风权谋', '/portfolio/comic/古风权谋合并.mp4'],
    ['迷途星环', '/portfolio/comic/迷途星环.mp4'],
  ],
};

const brandCases = [
  {
    id: 'cuco-cookies',
    title: 'CUCO饼干包装',
    badge: '包装设计',
    summary: '饼干包装完整提案，去掉重复页后保留 22 页，包含品牌命名、包装展开、技术页和配色方向。',
    cover: '/portfolio/brand/cuco-cookies/Main Comp.mp4',
    type: 'video',
    chips: ['视频', '包装设计', '品牌命名', '展开图', '配色方案'],
    frames: [
      ...Array.from({ length: 26 }, (_, index) => index + 1)
        .filter((pageNumber) => !new Set([16, 17, 20, 26]).has(pageNumber))
        .map((pageNumber) => {
          const page = String(pageNumber).padStart(2, '0');
          const labelMap = {
            1: '封面',
            2: '目标定义',
            5: '概念页',
            6: '技术页',
            7: '技术页 2',
            8: '命名与草案',
            10: '包装展开',
            11: '包装展示 01',
            12: '包装展示 02',
            13: '包装展示 03',
            14: '包装展示 04',
            15: '包装展示 05',
            18: '包装展示 06',
            19: '包装展示 07',
            21: '包装展示 08',
            22: '包装展示 09',
            23: '包装展示 10',
            24: '包装展示 11',
            25: '包装展示 12',
          };
          return [labelMap[pageNumber] || `第 ${page} 页`, `/portfolio/brand/cuco-cookies/pages/cuco-${page}.png`];
        }),
    ],
  },
  {
    id: 'mirage-hotel',
    title: '海市蜃楼酒店',
    badge: '品牌项目',
    summary: '同一个酒店品牌项目下，包含导视系统、门牌和包装设计，用文字标签区分不同内容。',
    cover: '/portfolio/brand/guidance/2.jpg',
    chips: ['导视系统', '门牌', '包装设计', '品牌延展'],
    frames: [
      ['导视系统 01', '/portfolio/brand/guidance/2.jpg'],
      ['导视系统 02', '/portfolio/brand/guidance/11.jpg'],
      ['导视系统 03', '/portfolio/brand/guidance/9.jpg'],
      ['导视系统 04', '/portfolio/brand/guidance/12.jpg'],
      ['导视系统 05', '/portfolio/brand/guidance/12.1.png'],
      ['导视系统 06', '/portfolio/brand/guidance/14.jpg'],
      ['导视系统 07', '/portfolio/brand/guidance/15.jpg'],
      ['门牌 01', '/portfolio/brand/doorplate/7.jpg'],
      ['门牌 02', '/portfolio/brand/doorplate/13.jpg'],
      ['门牌 03', '/portfolio/brand/doorplate/13.1.jpg'],
      ['包装设计 01', '/portfolio/brand/packaging/4.jpg'],
      ['包装设计 02', '/portfolio/brand/packaging/5.jpg'],
      ['包装设计 03', '/portfolio/brand/packaging/5.1.jpg'],
      ['包装设计 04', '/portfolio/brand/packaging/6.jpg'],
      ['包装设计 05', '/portfolio/brand/packaging/8.jpg'],
      ['包装设计 06', '/portfolio/brand/packaging/10.jpg'],
    ],
  },
  {
    id: 'flower-spirit',
    title: '花中有灵音乐治疗品牌VI',
    badge: '品牌VI',
    summary: '音乐治疗品牌 VI 系统，包含 LOGO、插画、包装、延展、海报广告、标准色和 IP 形象。',
    cover: '/portfolio/brand/flower-spirit/LOGO  标准化_画板 1.png',
    chips: ['LOGO', '插画', '包装', '延展', '海报广告', '标准色', 'IP形象'],
    frames: [
      ['LOGO 标准化', '/portfolio/brand/flower-spirit/LOGO  标准化_画板 1.png'],
      ['LOGO', '/portfolio/brand/flower-spirit/LOGO_画板 1.png'],
      ['标准色', '/portfolio/brand/flower-spirit/标准色、辅助色_画板_画板 1 副本.png'],
      ['IP形象 01', '/portfolio/brand/flower-spirit/IP 动作1.png'],
      ['IP形象 02', '/portfolio/brand/flower-spirit/IP 动作2.png'],
      ['IP形象 03', '/portfolio/brand/flower-spirit/IP 动作3.png'],
      ['IP形象 04', '/portfolio/brand/flower-spirit/IP 动作4.png'],
      ['IP形象 05', '/portfolio/brand/flower-spirit/IP 动作5.png'],
      ['IP形象 06', '/portfolio/brand/flower-spirit/IP 动作6.png'],
      ['插画场景 01', '/portfolio/brand/flower-spirit/场景1.jpg'],
      ['插画场景 02', '/portfolio/brand/flower-spirit/场景2.jpg'],
      ['插画场景 03', '/portfolio/brand/flower-spirit/场景5.jpg'],
      ['插画场景 04', '/portfolio/brand/flower-spirit/场景6.jpg'],
      ['包装设计 01', '/portfolio/brand/flower-spirit/1.jpg'],
      ['包装设计 02', '/portfolio/brand/flower-spirit/2.jpg'],
      ['包装设计 03', '/portfolio/brand/flower-spirit/3.jpg'],
      ['包装设计 04', '/portfolio/brand/flower-spirit/4.jpg'],
      ['包装设计 05', '/portfolio/brand/flower-spirit/5.jpg'],
      ['包装设计 06', '/portfolio/brand/flower-spirit/7.jpg'],
      ['包装设计 07', '/portfolio/brand/flower-spirit/8.jpg'],
      ['包装设计 08', '/portfolio/brand/flower-spirit/10.jpg'],
      ['包装设计 09', '/portfolio/brand/flower-spirit/11.jpg'],
      ['包装设计 10', '/portfolio/brand/flower-spirit/12.jpg'],
      ['包装设计 11', '/portfolio/brand/flower-spirit/14.jpg'],
      ['包装设计 12', '/portfolio/brand/flower-spirit/17.jpg'],
      ['品牌应用 01', '/portfolio/brand/flower-spirit/18.jpg'],
      ['品牌应用 02', '/portfolio/brand/flower-spirit/19.jpg'],
      ['品牌应用 03', '/portfolio/brand/flower-spirit/21.jpg'],
      ['品牌应用 04', '/portfolio/brand/flower-spirit/22.jpg'],
      ['包装延展 01', '/portfolio/brand/flower-spirit/b 3.jpg'],
      ['包装延展 02', '/portfolio/brand/flower-spirit/b 6.jpg'],
      ['延展物料 01', '/portfolio/brand/flower-spirit/b 1.jpg'],
      ['延展物料 02', '/portfolio/brand/flower-spirit/b 7.jpg'],
      ['延展物料 03', '/portfolio/brand/flower-spirit/b 4.1.jpg'],
      ['延展物料 04', '/portfolio/brand/flower-spirit/b 4.2.jpg'],
      ['延展物料 05', '/portfolio/brand/flower-spirit/b 4.3.jpg'],
      ['延展物料 06', '/portfolio/brand/flower-spirit/b 4.4.jpg'],
      ['延展物料 07', '/portfolio/brand/flower-spirit/b 4.5.jpg'],
      ['延展物料 08', '/portfolio/brand/flower-spirit/b 4.6.jpg'],
      ['延展物料 09', '/portfolio/brand/flower-spirit/b 5.jpg'],
      ['海报广告 01', '/portfolio/brand/flower-spirit/a 1.jpg'],
      ['海报广告 02', '/portfolio/brand/flower-spirit/a 3.jpg'],
      ['海报广告 03', '/portfolio/brand/flower-spirit/a 4.jpg'],
    ],
  },
];

const ecommerceCases = [
  {
    id: 'mouse',
    title: '鼠标案例',
    badge: '外设类',
    summary: '三色鼠标的主图和详情链路，重点展示手感、参数、场景与品牌感。',
    cover: '/portfolio/ecommerce/mouse/游戏办公.mp4',
    type: 'video',
    chips: ['商品主图', '功能卖点', '参数说明', '细节特写'],
    frames: [
      ['首图', '/portfolio/ecommerce/mouse/01-三色齐发首图.png'],
      ['核心卖点', '/portfolio/ecommerce/mouse/02-核心卖点总结.png'],
      ['颜色款式', '/portfolio/ecommerce/mouse/03-颜色款式选择.png'],
      ['微观细节', '/portfolio/ecommerce/mouse/04-微观细节特写.png'],
      ['桌面场景', '/portfolio/ecommerce/mouse/05-极简桌面场景.png'],
      ['尺寸参数', '/portfolio/ecommerce/mouse/06-精准尺寸参数.png'],
      ['品牌封面', '/portfolio/ecommerce/mouse/07-品牌感详情封面.png'],
      ['手感卖点', '/portfolio/ecommerce/mouse/08-手感核心卖点.png'],
      ['色彩画报', '/portfolio/ecommerce/mouse/09-色彩情绪画报.png'],
      ['按键连接', '/portfolio/ecommerce/mouse/10-按键与连接细节.png'],
      ['多场景演示', '/portfolio/ecommerce/mouse/11-多场景适用演示.png'],
      ['手型适配', '/portfolio/ecommerce/mouse/12-手型适配指南.png'],
      ['专业参数', '/portfolio/ecommerce/mouse/13-专业参数规格.png'],
      ['收口页', '/portfolio/ecommerce/mouse/14-购买服务收口.png'],
    ],
  },
  {
    id: 'candy',
    title: '食品案例',
    badge: '休闲食品',
    summary: '果汁橡皮糖的电商视觉链路，覆盖主图、卖点、工艺、包装、场景与购买须知。',
    cover: '/portfolio/ecommerce/candy/01-主图1-爆点首图.png',
    chips: ['爆点主图', '卖点图', '包装呈现', '信任收口'],
    frames: [
      ['爆点首图', '/portfolio/ecommerce/candy/01-主图1-爆点首图.png'],
      ['核心卖点', '/portfolio/ecommerce/candy/02-主图2-核心卖点图.png'],
      ['造型展示', '/portfolio/ecommerce/candy/03-主图3-造型展示图.png'],
      ['包装便携', '/portfolio/ecommerce/candy/04-主图4-包装便携图.png'],
      ['材质细节', '/portfolio/ecommerce/candy/05-主图5-材质细节图.png'],
      ['信任收口', '/portfolio/ecommerce/candy/06-主图6-信任收口图.png'],
      ['封面海报', '/portfolio/ecommerce/candy/07-详情页1-封面海报.png'],
      ['果汁成分', '/portfolio/ecommerce/candy/08-详情页2-果汁成分页.png'],
      ['工艺解析', '/portfolio/ecommerce/candy/09-详情页3-工艺解析页.png'],
      ['萌趣造型', '/portfolio/ecommerce/candy/10-详情页4-萌趣造型页.png'],
      ['场景代入', '/portfolio/ecommerce/candy/11-详情页5-场景代入页.png'],
      ['包装规格', '/portfolio/ecommerce/candy/12-详情页6-包装规格页.png'],
      ['信任保障', '/portfolio/ecommerce/candy/13-详情页7-信任保障页.png'],
      ['购买须知', '/portfolio/ecommerce/candy/14-详情页8-购买须知页.png'],
    ],
  },
];

const portfolioCategories = [
  {
    id: 'comic',
    title: 'AI漫剧',
    tagline: '角色设定 / 分镜 / 场景 / 宣发图',
    summary:
      '适合漫画化叙事和漫剧视觉。当前已接入三个漫剧视频，第一个作为首页主播放。',
    cover: comicMedia.videos[0][1],
    type: 'video',
    videos: comicMedia.videos,
    chips: ['角色设定', '分镜', '场景图', '宣发封面'],
  },
  {
    id: 'ecommerce',
    title: 'AI电商视觉设计',
    tagline: '商品主图 / 详情页 / 场景图 / 直播视觉',
    summary:
      '围绕鼠标与食品两组案例，完整覆盖电商主图、详情页、卖点说明、场景表达与收口页。',
    cover: ecommerceCases[0].cover,
    type: 'video',
    cases: ecommerceCases,
    chips: ['商品主图', '详情页', '场景图', '直播视觉'],
  },
  {
    id: 'ads',
    title: 'AI广告设计 / 小视频',
    tagline: '投放海报 / 动态广告 / 短视频封面',
    summary:
      '适合信息流投放、短视频传播和品牌活动素材。当前已接入两条 AI 广告小视频和一组 AI 户外广告。',
    cover: '/portfolio/ads/01-参考模式.mp4',
    type: 'video',
    videos: adsMedia.videos,
    outdoor: adsMedia.outdoor,
    chips: ['动态广告', '小视频', '信息流素材', '投放视觉'],
  },
  {
    id: 'brand',
    title: 'AI品牌视觉设计',
    tagline: '品牌项目 / VI系统 / 导视 / 包装 / IP',
    summary:
      '当前接入海市蜃楼酒店、花中有灵音乐治疗品牌 VI 与 CUCO 饼干包装。后续可以继续上传新的品牌项目。',
    cover: brandCases[0].cover,
    type: 'video',
    cases: brandCases,
    chips: ['品牌VI', '导视系统', '包装设计', 'IP形象'],
  },
];

function MotionBackdrop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    let frame = 0;
    let raf = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(canvas.clientWidth * ratio);
      canvas.height = Math.floor(canvas.clientHeight * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(26, 31, 42, 0.72)');
      gradient.addColorStop(0.45, 'rgba(9, 11, 16, 0.92)');
      gradient.addColorStop(1, 'rgba(2, 4, 8, 0.98)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      const gap = 56;
      for (let x = 0; x < width; x += gap) {
        ctx.beginPath();
        ctx.moveTo(x + (frame % gap), 0);
        ctx.lineTo(x + (frame % gap), height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      ctx.save();
      const scanY = (frame * 1.4) % height;
      const scan = ctx.createLinearGradient(0, scanY - 120, 0, scanY + 120);
      scan.addColorStop(0, 'rgba(120, 240, 208, 0)');
      scan.addColorStop(0.5, 'rgba(120, 240, 208, 0.13)');
      scan.addColorStop(1, 'rgba(120, 240, 208, 0)');
      ctx.fillStyle = scan;
      ctx.fillRect(0, scanY - 120, width, 240);
      ctx.restore();

      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      for (let i = 0; i < 90; i += 1) {
        const x = ((i * 211) + frame * 0.6) % width;
        const y = ((i * 97) + frame * 1.8) % height;
        ctx.fillRect(x, y, i % 2 ? 1.2 : 1.6, i % 3 ? 1.2 : 1.6);
      }
      ctx.restore();

      ctx.save();
      ctx.strokeStyle = 'rgba(143, 180, 255, 0.24)';
      ctx.lineWidth = 1.5;
      const panelX = width * 0.62;
      const panelY = height * 0.18;
      ctx.strokeRect(panelX, panelY, width * 0.22, height * 0.36);
      ctx.strokeRect(panelX + 24, panelY + 28, width * 0.15, height * 0.18);
      ctx.restore();

      frame += 1;
      raf = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="motion-backdrop" aria-hidden="true" />;
}

function StrengthCard({ icon: Icon, title, text }) {
  return (
    <article className="strength-card">
      <Icon size={18} />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function BorderGlowButton({ className = '', children, ...props }) {
  return <GlowSurface className={className} {...props}>{children}</GlowSurface>;
}

function GlowSurface({ as: Tag = 'button', className = '', children, ...props }) {
  const glowRef = useRef(null);

  const setGlow = (x, y, opacity = '1') => {
    const el = glowRef.current;
    if (!el) return;

    el.style.setProperty('--glow-x', `${x}%`);
    el.style.setProperty('--glow-y', `${y}%`);
    el.style.setProperty('--glow-opacity', opacity);
  };

  const updateGlow = (event) => {
    const el = glowRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setGlow(x, y);
  };

  const centerGlow = () => {
    setGlow(50, 50);
  };

  const clearGlow = () => {
    const el = glowRef.current;
    if (!el) return;

    el.style.setProperty('--glow-opacity', '0');
  };

  const sharedProps = Tag === 'button' && !props.type ? { type: 'button' } : {};

  return (
    <Tag
      ref={glowRef}
      className={`border-glow-button ${className}`.trim()}
      onPointerEnter={updateGlow}
      onPointerMove={updateGlow}
      onPointerLeave={clearGlow}
      onFocus={centerGlow}
      onBlur={clearGlow}
      {...sharedProps}
      {...props}
    >
      {children}
      <span className="border-glow-button__glow" aria-hidden="true" />
    </Tag>
  );
}

function ContactGlowCard({ as = 'a', className = '', children, ...props }) {
  return (
    <GlowSurface
      as={as}
      className={`contact-card contact-card--interactive ${className}`.trim()}
      {...props}
    >
      {children}
    </GlowSurface>
  );
}

function DockNavItem({ item, activeHash, pointerX }) {
  const itemRef = useRef(null);
  const Icon = item.icon;
  let influence = 0;

  if (pointerX !== null && itemRef.current) {
    const rect = itemRef.current.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const distance = Math.abs(pointerX - center);
    influence = Math.max(0, 1 - distance / 132);
  }

  const scale = 1 + influence * 0.34;
  const lift = -6 * influence;

  return (
    <a
      ref={itemRef}
      className={`dock-nav__item${activeHash === item.href ? ' is-active' : ''}`}
      href={item.href}
      style={{
        '--dock-scale': scale,
        '--dock-lift': `${lift}px`,
      }}
    >
      <Icon size={17} strokeWidth={2.2} />
      <span>{item.label}</span>
    </a>
  );
}

function DockNav({ items, activeHash }) {
  const [pointerX, setPointerX] = useState(null);

  return (
    <nav
      className="dock-nav"
      aria-label="主导航"
      onMouseMove={(event) => setPointerX(event.clientX)}
      onMouseLeave={() => setPointerX(null)}
    >
      {items.map((item) => (
        <DockNavItem key={item.href} item={item} activeHash={activeHash} pointerX={pointerX} />
      ))}
    </nav>
  );
}

export default function App() {
  const pageShellRef = useRef(null);
  const [activeHeroVideo, setActiveHeroVideo] = useState(0);
  const [activePortfolio, setActivePortfolio] = useState(portfolioCategories[0].id);
  const [activeEcommerceCase, setActiveEcommerceCase] = useState(ecommerceCases[0].id);
  const [activeBrandCase, setActiveBrandCase] = useState(brandCases[0].id);
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window === 'undefined') return '#home';
    return window.location.hash || '#home';
  });
  const ecommerceVideoRef = useRef(null);
  const brandVideoRef = useRef(null);
  const featureVideoRef = useRef(null);
  const copyEmailTimerRef = useRef(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const introItems = useMemo(
    () => [
      ['姓名', '张子卿'],
      ['出生', '1998.08'],
      [
        '学历',
        <span className="detail-lines">
          <span>本科：淮阴师范学院</span>
          <span>硕士：意大利·那不勒斯美术学院</span>
        </span>,
      ],
      [
        '专业',
        <span className="detail-lines">
          <span>本科：视觉传达设计</span>
          <span>硕士：传播设计-公共与企业传播</span>
        </span>,
      ],
      ['软件', '即梦 AI / Midjourney / ChatGPT / Codex / Gemini / PS / AI'],
    ],
    [],
  );

  const activePortfolioItem = useMemo(
    () => portfolioCategories.find((item) => item.id === activePortfolio) || portfolioCategories[0],
    [activePortfolio],
  );
  const activeEcommerceItem = useMemo(
    () => ecommerceCases.find((item) => item.id === activeEcommerceCase) || ecommerceCases[0],
    [activeEcommerceCase],
  );
  const activeBrandItem = useMemo(
    () => brandCases.find((item) => item.id === activeBrandCase) || brandCases[0],
    [activeBrandCase],
  );

  const scrollToPortfolioFeature = () => {
    const target =
      document.querySelector('#projects .portfolio-feature') ||
      document.querySelector('#projects');

    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectPortfolio = (id, jumpToTop = false) => {
    setActivePortfolio(id);
    if (id === 'ecommerce') {
      setActiveEcommerceCase(ecommerceCases[0].id);
    } else if (id === 'brand') {
      setActiveBrandCase(brandCases[0].id);
    }

    if (jumpToTop && window.innerWidth <= 900) {
      window.requestAnimationFrame(() => {
        scrollToPortfolioFeature();
      });
    }
  };

  useEffect(() => () => {
    window.clearTimeout(copyEmailTimerRef.current);
  }, []);

  useEffect(() => {
    const updateHash = () => {
      setActiveSection(window.location.hash || '#home');
    };

    updateHash();
    window.addEventListener('hashchange', updateHash);

    return () => {
      window.removeEventListener('hashchange', updateHash);
    };
  }, []);

  useEffect(() => {
    const tryPlay = (video) => {
      if (!video) return;
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    if (activePortfolioItem.id === 'ecommerce') {
      tryPlay(ecommerceVideoRef.current);
    }
    if (activePortfolioItem.id === 'brand') {
      tryPlay(brandVideoRef.current);
    }
    if (activePortfolioItem.id === 'ads' || activePortfolioItem.id === 'comic') {
      tryPlay(featureVideoRef.current);
    }
  }, [activePortfolioItem.id, activeEcommerceItem.cover, activeBrandItem.cover]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopiedEmail(true);
      window.clearTimeout(copyEmailTimerRef.current);
      copyEmailTimerRef.current = window.setTimeout(() => {
        setCopiedEmail(false);
      }, 1800);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = contactEmail;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedEmail(true);
      window.clearTimeout(copyEmailTimerRef.current);
      copyEmailTimerRef.current = window.setTimeout(() => {
        setCopiedEmail(false);
      }, 1800);
    }
  };

  useLayoutEffect(() => {
    const root = pageShellRef.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;

    const context = gsap.context(() => {
      const heroVideo = root.querySelector('.hero-video');
      const heroTitle = root.querySelector('.hero-title-wrap');
      const heroCopyItems = root.querySelectorAll('.hero-copy > *');
      const heroStatement = root.querySelector('.hero-statement');
      const heroRoleStrip = root.querySelector('.hero-role-strip');

      if (heroVideo) {
        gsap.set(heroVideo, { scale: 1.12, opacity: 0.56, transformOrigin: 'center center' });
      }
      if (heroTitle) {
        gsap.set(heroTitle, {
          opacity: 0,
          y: 120,
          scale: 1.08,
          clipPath: 'inset(0 0 100% 0)',
          willChange: 'transform, clip-path, opacity',
        });
      }
      if (heroCopyItems.length) {
        gsap.set(heroCopyItems, { opacity: 0, y: 54 });
      }
      if (heroStatement) {
        gsap.set(heroStatement, { opacity: 0, x: 96, scale: 0.94 });
      }
      if (heroRoleStrip) {
        gsap.set(heroRoleStrip, { opacity: 0, y: 30 });
      }

      const opening = gsap.timeline({
        defaults: { ease: 'power4.out' },
      });

      opening
        .to(heroVideo, {
          scale: 1,
          opacity: 1,
          duration: 2.2,
          ease: 'power3.out',
        }, 0)
        .to(heroTitle, {
          opacity: 1,
          y: 0,
          scale: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.65,
        }, 0.2)
        .to(heroCopyItems, {
          opacity: 1,
          y: 0,
          duration: 1.05,
          stagger: 0.12,
        }, 0.65)
        .to(heroStatement, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.15,
        }, 0.9)
        .to(heroRoleStrip, {
          opacity: 1,
          y: 0,
          duration: 0.95,
        }, 1.1);

      const sectionConfigs = [
        {
          section: root.querySelector('#about'),
          media: root.querySelector('#about .portrait-card'),
          groups: [
            root.querySelectorAll('#about .info-list dl'),
            root.querySelectorAll('#about .self-review'),
            root.querySelectorAll('#about .about-side > *'),
          ],
        },
        {
          section: root.querySelector('#projects'),
          media: root.querySelector('#projects .portfolio-feature__image'),
          groups: [
            root.querySelectorAll('#projects .portfolio-tabs > *'),
            root.querySelectorAll('#projects .portfolio-feature__content > *'),
            root.querySelectorAll('#projects .portfolio-case-switch > *'),
            root.querySelectorAll('#projects .portfolio-grid > *'),
            root.querySelectorAll('#projects .portfolio-gallery__grid > *'),
            root.querySelectorAll('#projects .portfolio-video-grid > *'),
            root.querySelectorAll('#projects .portfolio-media-stack .portfolio-gallery'),
          ],
        },
        {
          section: root.querySelector('#strengths'),
          media: null,
          groups: [root.querySelectorAll('#strengths .strength-grid > *')],
        },
        {
          section: root.querySelector('#contact'),
          media: null,
          groups: [root.querySelectorAll('#contact .contact-grid > *')],
        },
      ];

      sectionConfigs.forEach(({ section, media, groups }) => {
        if (!section) return;

        const headingEyebrow = section.querySelector('.section-heading .eyebrow');
        const heading = section.querySelector('.section-heading h2');
        const note = section.querySelector('.section-note');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true,
          },
          defaults: { ease: 'power4.out' },
        });

        if (headingEyebrow) {
          tl.fromTo(
            headingEyebrow,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.65 },
            0,
          );
        }

        if (heading) {
          tl.fromTo(
            heading,
            { opacity: 0, y: 120, scale: 1.08, clipPath: 'inset(0 0 100% 0)' },
            { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.3 },
            0.05,
          );
        }

        if (note) {
          tl.fromTo(note, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.85 }, 0.2);
        }

        if (media) {
          tl.fromTo(
            media,
            { opacity: 0, y: 44, scale: 1.05 },
            { opacity: 1, y: 0, scale: 1, duration: 1.05 },
            0.12,
          );

          gsap.to(media, {
            yPercent: -6,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          });
        }

        groups.forEach((group, index) => {
          if (!group || !group.length) return;
          tl.fromTo(
            group,
            { opacity: 0, y: 34, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.95,
              stagger: 0.08,
            },
            0.18 + index * 0.06,
          );
        });
      });

      ScrollTrigger.refresh();
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div className="page-shell" ref={pageShellRef}>
      <header className="site-header">
        <a className="brand-mark" href="#home" aria-label="回到首页">
          <span className="brand-sigil">Z</span>
          <span className="brand-name">张子卿个人站</span>
        </a>
        <DockNav items={navItems} activeHash={activeSection} />
        <div className="header-actions">
          <a className="ghost-button" href="#contact">
            <Mail size={16} />
            联系我
          </a>
          <a className="menu-button" href="#projects" aria-label="查看作品">
            <Menu size={18} />
          </a>
        </div>
      </header>

      <main>
        <section className="hero section" id="home">
          <video
            key={heroVideos[activeHeroVideo]}
            className="hero-video"
            autoPlay
            muted
            playsInline
            preload="auto"
            poster="/hero-background.svg"
            onCanPlay={(event) => {
              event.currentTarget.play().catch(() => {});
            }}
            onEnded={() => {
              setActiveHeroVideo((current) => (current + 1) % heroVideos.length);
            }}
            onError={() => {
              setActiveHeroVideo((current) => (current + 1) % heroVideos.length);
            }}
          >
            <source src={heroVideos[activeHeroVideo]} type="video/mp4" />
          </video>
          <MotionBackdrop />
          <div className="shell hero-stage">
            <div className="hero-composition">
              <div className="hero-title-wrap" role="heading" aria-level="1">
                <ParticleText
                  text="Welcome to Ziqing's Portfolio"
                  lines={['Welcome to', "Ziqing's Portfolio"]}
                  color="#ff6800"
                  highlightColor="#ffed00"
                  trigger="click"
                  gatherDuration={800}
                  particleSize={2.5}
                  className="hero-index"
                />
              </div>

              <div className="hero-copy">
                <p className="eyebrow">Visual Designer / AI Designer / Brand Designer</p>
                <p className="hero-copy__lead">
                  把复杂的信息、系统和叙事收束成清晰、克制、耐看的视觉表达。
                </p>
                <div className="hero-score">
                  <span>///</span>
                  <strong>07+</strong>
                  <small>Design tools mastered</small>
                </div>
                <div className="hero-actions">
                  <a className="primary-button" href="#projects">
                    START A PROJECT
                    <MoveRight size={18} />
                  </a>
                </div>
              </div>

              <div className="hero-statement">
                <span>Z</span>
                <p>
                  <strong>DESIGN</strong> IS NOT
                  <br />
                  DECORATION
                </p>
              </div>

              <div className="hero-role-strip">
                <span>BRAND SYSTEM</span>
                <span>AIGC VISUAL</span>
                <span>MOTION READY</span>
              </div>
            </div>
          </div>
        </section>

        <div className="below-hero-particles">
          <Particles
            particleColors={postHeroParticleColors}
            particleCount={200}
            particleSpread={10}
            particleBaseSize={100}
            speed={0.1}
            moveParticlesOnHover
            alphaParticles={false}
          />
        </div>

        <section className="section" id="about">
          <div className="shell about-layout">
            <div className="section-heading">
              <p className="eyebrow">个人经历</p>
              <h2>我的履历不长，但方向很明确。</h2>
            </div>

            <div className="about-grid">
              <figure className="portrait-card">
                <img src={portrait} alt="张子卿" />
              </figure>

              <div className="about-copy">
                <div className="info-list">
                  {introItems.map(([label, value]) => (
                    <dl key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </dl>
                  ))}
                </div>
                <div className="self-review">
                  <span>自我评价</span>
                  <p>
                    外向、韧性强，擅长和不同角色协作，能把设计、沟通和执行放进同一条线上。
                    我对客户心理、关系维护和跨部门协同都比较敏感，适合品牌视觉、AI 概念和传播类项目。
                  </p>
                </div>
              </div>

              <div className="about-side">
                <div className="contact-mini">
                  <span>身份定位</span>
                  <strong>AIGC视觉设计师</strong>
                </div>
                <div className="contact-mini ability-mini">
                  <span>能力</span>
                  <p>
                    拥有视觉传达与传播设计背景，覆盖品牌 VI、平面宣传、电商视觉、AI 视觉、
                    新媒体视觉与包装设计。擅长将品牌调性、用户审美与市场需求转译为稳定、
                    高级感、可落地的视觉方案。
                  </p>
                </div>
                <div className="metric-grid">
                  {stats.map((item) => (
                    <div key={item.label} className="metric-card">
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="shell">
            <div className="section-heading section-heading--row">
              <div>
                <p className="eyebrow">作品集</p>
                <h2>先按内容分类，再把作品一件件填进去。</h2>
              </div>
              <p className="section-note">
                先按 AI 电商视觉、AI 广告设计 / 小视频、AI 品牌视觉设计、AI 漫剧分开。
                你后面发作品，我会直接替换进对应分类，并继续细分子案例。
              </p>
            </div>

            <div className="portfolio-tabs" role="tablist" aria-label="作品分类">
              {portfolioCategories.map((item, index) => (
                <BorderGlowButton
                  key={item.id}
                  type="button"
                  className={`portfolio-tab ${activePortfolio === item.id ? 'is-active' : ''}`}
                  onClick={() => selectPortfolio(item.id)}
                  aria-pressed={activePortfolio === item.id}
                >
                  <span className="portfolio-tab__index">{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item.title}</strong>
                  <small>{item.tagline}</small>
                </BorderGlowButton>
              ))}
            </div>

            <div className="portfolio-feature">
              <div className="portfolio-feature__image">
                {activePortfolioItem.id === 'ecommerce' ? (
                  activeEcommerceItem.type === 'video' ? (
                    <video
                      key={activeEcommerceItem.cover}
                      ref={ecommerceVideoRef}
                      className="portfolio-feature__video"
                      src={activeEcommerceItem.cover}
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      defaultMuted
                      disablePictureInPicture
                      onCanPlay={(event) => {
                        event.currentTarget.play().catch(() => {});
                      }}
                      onLoadedData={(event) => {
                        event.currentTarget.play().catch(() => {});
                      }}
                    />
                  ) : (
                    <img src={activeEcommerceItem.cover} alt={activeEcommerceItem.title} loading="lazy" />
                  )
                ) : activePortfolioItem.id === 'brand' ? (
                  activeBrandItem.type === 'video' ? (
                    <video
                      ref={brandVideoRef}
                      className="portfolio-feature__video"
                      src={activeBrandItem.cover}
                      poster="/portfolio/brand/cuco-cookies/pages/cuco-01.png"
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onLoadedData={(event) => {
                        event.currentTarget.play().catch(() => {});
                      }}
                    />
                  ) : (
                    <img src={activeBrandItem.cover} alt={activeBrandItem.title} loading="lazy" />
                  )
                ) : activePortfolioItem.cover ? (
                  activePortfolioItem.type === 'video' ? (
                    <video
                      ref={featureVideoRef}
                      className="portfolio-feature__video"
                      src={activePortfolioItem.cover}
                      poster="/hero-background.svg"
                      controls={!(activePortfolioItem.id === 'comic' || activePortfolioItem.id === 'ads')}
                      autoPlay={activePortfolioItem.id === 'comic' || activePortfolioItem.id === 'ads'}
                      muted={activePortfolioItem.id === 'comic' || activePortfolioItem.id === 'ads'}
                      loop={activePortfolioItem.id === 'comic' || activePortfolioItem.id === 'ads'}
                      playsInline
                      preload="metadata"
                      onLoadedData={
                        activePortfolioItem.id === 'comic' || activePortfolioItem.id === 'ads'
                          ? (event) => {
                              event.currentTarget.play().catch(() => {});
                            }
                          : undefined
                      }
                    />
                  ) : (
                    <img src={activePortfolioItem.cover} alt={activePortfolioItem.title} loading="lazy" />
                  )
                ) : (
                  <div className="portfolio-feature__empty">
                    <span className="eyebrow">待补充作品</span>
                    <strong>AI 漫剧</strong>
                    <p>你发来角色图、分镜或封面，我会直接替换成正式案例。</p>
                  </div>
                )}
              </div>

              <div className="portfolio-feature__content">
                <p className="eyebrow">{activePortfolioItem.tagline}</p>
                <h3>
                  {activePortfolioItem.id === 'ecommerce'
                    ? activeEcommerceItem.title
                    : activePortfolioItem.id === 'brand'
                      ? activeBrandItem.title
                      : activePortfolioItem.title}
                </h3>
                <p>
                  {activePortfolioItem.id === 'ecommerce'
                    ? activeEcommerceItem.summary
                    : activePortfolioItem.id === 'brand'
                      ? activeBrandItem.summary
                      : activePortfolioItem.summary}
                </p>
                <div className="portfolio-chip-list">
                  {(
                    activePortfolioItem.id === 'ecommerce'
                      ? activeEcommerceItem.chips
                      : activePortfolioItem.id === 'brand'
                        ? activeBrandItem.chips
                        : activePortfolioItem.chips
                  ).map((chip) => (
                    <span key={chip}>{chip}</span>
                  ))}
                </div>
                {activePortfolioItem.id === 'ecommerce' && (
                  <div className="portfolio-case-switch">
                    {ecommerceCases.map((item) => (
                      <BorderGlowButton
                        key={item.id}
                        type="button"
                        className={`portfolio-case-switch__button ${activeEcommerceCase === item.id ? 'is-active' : ''}`}
                        onClick={() => setActiveEcommerceCase(item.id)}
                        aria-pressed={activeEcommerceCase === item.id}
                      >
                        <span>{item.badge}</span>
                        <strong>{item.title}</strong>
                      </BorderGlowButton>
                    ))}
                  </div>
                )}
                {activePortfolioItem.id === 'brand' && (
                  <div className="portfolio-case-switch">
                    {brandCases.map((item) => (
                      <BorderGlowButton
                        key={item.id}
                        type="button"
                        className={`portfolio-case-switch__button ${activeBrandCase === item.id ? 'is-active' : ''}`}
                        onClick={() => setActiveBrandCase(item.id)}
                        aria-pressed={activeBrandCase === item.id}
                      >
                        <span>{item.badge}</span>
                        <strong>{item.title}</strong>
                      </BorderGlowButton>
                    ))}
                  </div>
                )}
                <div className="portfolio-feature__meta">
                  <div>
                    <span>当前分类</span>
                    <strong>
                      {activePortfolioItem.id === 'ecommerce'
                        ? `${activePortfolioItem.title} / ${activeEcommerceItem.title}`
                        : activePortfolioItem.id === 'brand'
                          ? `${activePortfolioItem.title} / ${activeBrandItem.title}`
                          : activePortfolioItem.title}
                    </strong>
                  </div>
                  <div>
                    <span>接入状态</span>
                    <strong>
                      {activePortfolioItem.id === 'ecommerce'
                        ? '鼠标视频 + 食品案例已接入'
                        : activePortfolioItem.id === 'brand'
                          ? '三个品牌项目已接入'
                          : activePortfolioItem.id === 'comic'
                            ? '三个AI漫剧视频已接入'
                            : activePortfolioItem.id === 'ads'
                              ? '广告视频与户外广告已接入'
                              : '作品内容已接入'}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {activePortfolioItem.id === 'ecommerce' && (
              <div className="portfolio-gallery">
                <div className="portfolio-gallery__head">
                  <div>
                    <p className="eyebrow">AI电商案例流</p>
                    <h3>{activeEcommerceItem.title}完整页序列</h3>
                  </div>
                  <p>按页面逻辑顺序排布，适合当作完整案例浏览。</p>
                </div>
                <div className="portfolio-gallery__grid">
                  {activeEcommerceItem.frames.map(([label, src]) => (
                    <figure
                      key={src}
                      className={`portfolio-gallery__item ${src.toLowerCase().endsWith('.mp4') ? 'is-video' : ''}`}
                    >
                      {src.toLowerCase().endsWith('.mp4') ? (
                        <video src={src} controls playsInline preload="metadata" muted />
                      ) : (
                        <img src={src} alt={label} loading="lazy" />
                      )}
                      <figcaption>{label}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {activePortfolioItem.id === 'brand' && (
              <div className="portfolio-media-stack">
                <div className="portfolio-gallery">
                  <div className="portfolio-gallery__head">
                    <div>
                      <p className="eyebrow">AI品牌视觉案例流</p>
                      <h3>{activeBrandItem.title}作品序列</h3>
                    </div>
                    <p>独立按钮用于切换不同品牌项目，项目内部用文字区分 LOGO、插画、包装、延展和 IP 等内容。</p>
                  </div>
                <div className="portfolio-gallery__grid">
                  {activeBrandItem.frames.map(([label, src]) => (
                    <figure
                      key={src}
                      className={`portfolio-gallery__item is-contain ${src.toLowerCase().endsWith('.mp4') ? 'is-video' : ''}`}
                    >
                      {src.toLowerCase().endsWith('.mp4') ? (
                        <video src={src} controls playsInline preload="metadata" />
                      ) : (
                        <img src={src} alt={label} loading="lazy" />
                      )}
                      <figcaption>{label}</figcaption>
                    </figure>
                  ))}
                </div>
                </div>
              </div>
            )}

            {activePortfolioItem.id === 'ads' && (
              <div className="portfolio-media-stack">
                <div className="portfolio-gallery">
                  <div className="portfolio-gallery__head">
                    <div>
                      <p className="eyebrow">AI广告小视频</p>
                      <h3>动态广告案例</h3>
                    </div>
                    <p>视频可直接播放，和下面的户外广告分开展示。</p>
                  </div>
                  <div className="portfolio-video-grid">
                    {activePortfolioItem.videos?.map(([label, src]) => (
                      <figure key={src} className="portfolio-video-item">
                        <video src={src} controls playsInline preload="metadata" />
                        <figcaption>{label}</figcaption>
                      </figure>
                    ))}
                  </div>
                </div>

                <div className="portfolio-gallery">
                  <div className="portfolio-gallery__head">
                    <div>
                      <p className="eyebrow">AI户外广告</p>
                      <h3>户外广告牌案例</h3>
                    </div>
                    <p>这组是户外广告牌，不归入小视频，单独作为视觉落地展示。</p>
                  </div>
                  <div className="portfolio-gallery__grid">
                    {activePortfolioItem.outdoor?.map(([label, src]) => (
                      <figure key={src} className="portfolio-gallery__item">
                        <img src={src} alt={label} loading="lazy" />
                        <figcaption>{label}</figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activePortfolioItem.id === 'comic' && (
              <div className="portfolio-media-stack">
                <div className="portfolio-gallery">
                  <div className="portfolio-gallery__head">
                    <div>
                      <p className="eyebrow">AI漫剧首页播放</p>
                      <h3>分开</h3>
                    </div>
                    <p>第一个视频固定作为首页主播放，下面展示另外两条补充视频。</p>
                  </div>
                  <figure className="portfolio-video-item is-featured">
                    <video
                      src={activePortfolioItem.videos?.[0]?.[1]}
                      controls
                      playsInline
                      preload="metadata"
                      muted
                      autoPlay
                      loop
                    />
                    <figcaption>{activePortfolioItem.videos?.[0]?.[0]}</figcaption>
                  </figure>
                </div>

                <div className="portfolio-gallery">
                  <div className="portfolio-gallery__head">
                    <div>
                      <p className="eyebrow">AI漫剧补充视频</p>
                      <h3>古风权谋</h3>
                    </div>
                  </div>
                  <div className="portfolio-video-grid">
                    {activePortfolioItem.videos?.slice(1).map(([label, src]) => (
                      <figure key={src} className="portfolio-video-item">
                        <video src={src} controls playsInline preload="metadata" />
                        <figcaption>{label}</figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="portfolio-grid">
              {portfolioCategories.map((item) => (
                <BorderGlowButton
                  key={item.id}
                  type="button"
                  className={`portfolio-card ${activePortfolio === item.id ? 'is-active' : ''}`}
                  onClick={() => selectPortfolio(item.id, true)}
                  aria-pressed={activePortfolio === item.id}
                >
                  <div className="portfolio-card__thumb">
                    {item.cover ? (
                      item.type === 'video' ? (
                        <video
                          className="portfolio-card__video"
                          src={item.cover}
                          poster={
                            item.id === 'ecommerce'
                              ? ecommerceCases[0].frames[0][1]
                              : item.id === 'brand'
                                ? '/portfolio/brand/cuco-cookies/pages/cuco-01.png'
                                : '/hero-background.svg'
                          }
                          muted
                          playsInline
                          loop
                          autoPlay
                          preload="auto"
                          onLoadedData={(event) => {
                            event.currentTarget.play().catch(() => {});
                          }}
                        />
                      ) : (
                        <img src={item.cover} alt={item.title} loading="lazy" />
                      )
                    ) : (
                      <div className="portfolio-card__thumb--empty">
                        <span className="eyebrow">COMING SOON</span>
                        <strong>AI 漫剧</strong>
                        <p>等待你的角色、场景和封面素材。</p>
                      </div>
                    )}
                  </div>
                  <div className="portfolio-card__body">
                    <p className="eyebrow">{item.tagline}</p>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                  </div>
                </BorderGlowButton>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="strengths">
          <div className="shell">
            <div className="section-heading section-heading--plain">
              <p className="eyebrow">个人优势</p>
              <h2>能力结构偏复合，也偏实际。</h2>
            </div>
            <div className="strength-grid">
              {strengths.map((item) => (
                <StrengthCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="shell contact-layout">
            <div className="section-heading">
              <p className="eyebrow">联系我</p>
              <h2>如果你要找一个能做视觉、懂 AI、也懂品牌的人，我们可以继续聊。</h2>
            </div>

            <div className="contact-grid">
              <ContactGlowCard
                as="button"
                type="button"
                className="contact-card--copy"
                onClick={copyEmail}
                aria-label={copiedEmail ? '邮箱已复制' : '点击复制邮箱'}
              >
                <Mail size={18} />
                <span>邮箱</span>
                <strong>{contactEmail}</strong>
                <span className="contact-card__action">
                  {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                  {copiedEmail ? '已复制' : '一键复制邮箱'}
                </span>
              </ContactGlowCard>
              <ContactGlowCard as="a" href="#home">
                <Layers3 size={18} />
                <span>首页回到顶部</span>
                <strong>返回首页重新浏览</strong>
              </ContactGlowCard>
              <ContactGlowCard as="a" href="#projects">
                <Orbit size={18} />
                <span>项目区</span>
                <strong>查看最新作品内容</strong>
              </ContactGlowCard>
              <ContactGlowCard as="a" href="#about">
                <MessageSquareMore size={18} />
                <span>个人介绍</span>
                <strong>查看个人经历与能力</strong>
              </ContactGlowCard>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
