import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import CinematicBackground from './CinematicBackground';

const BAR_HEIGHTS = [
  23, 40, 53, 40, 33, 14, 7, 17, 75, 65,
  88, 75, 65, 47, 33, 88, 4, 7, 9, 14,
  95, 65, 79, 37, 7, 40, 17, 20, 62, 47,
  92, 72,
];

const NAV_LINKS = [
  { label: '首页', href: 'index.html' },
  { label: '项目', href: 'projects.html' },
  { label: '技能', href: 'skills.html' },
  { label: '关于我', href: 'about.html' },
  { label: '实习总结', href: 'internship.html' },
  { label: '联系', href: 'contact.html' },
];

const directionClassMap = {
  up: 'animate-fade-up',
  down: 'animate-fade-down',
  left: 'animate-fade-left',
  right: 'animate-fade-right',
  scale: 'animate-fade-scale',
};

const Animate = ({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}) => {
  const directionClass = directionClassMap[direction];
  return (
    <div
      className={`opacity-0 ${directionClass} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const FocusCard = () => {
  return (
    <div className="w-full max-w-[340px]">
      <div className="w-full rounded-[20px] bg-[rgba(3,28,30,0.5)] backdrop-blur-[18px] p-5 pb-6">
        <p className="text-white text-[14px] font-[450] leading-[20px] mb-2.5">
          当前方向
        </p>
        <p className="mb-3.5">
          <span className="text-white text-[22px] font-[450] leading-[1.25]">
            智能温控睡眠硬件
          </span>
        </p>
        <div className="flex flex-wrap items-center gap-[8px] mb-5">
          {['器件选型', 'BOM 梳理', '供应商对接'].map((tag) => (
            <span
              key={tag}
              className="px-[10px] py-[6px] bg-white/15 rounded-[6px] text-white text-[12px] font-[450] leading-[14px]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="relative">
          <div className="flex items-end gap-[1.5px] h-[56px]">
            {[...Array(32).keys()].map((i) => (
              <div
                key={i}
                className="flex-1 rounded-[0.5px] animate-bar-grow origin-bottom"
                style={{
                  height: `${(BAR_HEIGHTS[i] / 95) * 100}%`,
                  backgroundColor: 'rgba(110,231,183,0.45)',
                  animationDelay: `${1100 + i * 30}ms`,
                }}
              />
            ))}
          </div>
        </div>
        <p className="mt-3.5 text-white/70 text-[12px] font-[450] leading-[1.6]">
          对标 EightSleep Pod5，做方案调研、器件选型与样品验证
        </p>
      </div>
    </div>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] pt-[20px] sm:pt-[30px] flex items-center justify-between relative z-50"
      >
        <Animate delay={0} direction="down">
          <a href="index.html" className="flex items-center gap-2.5">
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              className="sm:w-[32px] sm:h-[32px]"
            >
              <rect width="32" height="32" rx="7" fill="#e6c890" />
              <text x="16" y="23" fontSize="19" textAnchor="middle" fill="#111" fontFamily="system-ui, sans-serif">F</text>
            </svg>
            <span className="text-white text-[20px] sm:text-[24px] font-[450] leading-none tracking-[0.02em]">付宇轩</span>
          </a>
        </Animate>

        {/* 桌面端导航 */}
        <Animate delay={100} direction="down" className="hidden lg:block">
          <div
            className="h-[52px] px-6 flex items-center gap-[26px] bg-[rgba(3,28,30,0.45)] rounded-full backdrop-blur-[17px] border border-white/[0.08]"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 text-[14px] font-[450] leading-[14px] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Animate>

        {/* 桌面端 CTA */}
        <Animate delay={200} direction="down" className="hidden lg:block">
          <a
            href="contact.html"
            className="h-[46px] px-6 inline-flex items-center bg-white rounded-full text-[#06131a] text-[14px] font-[450] leading-[14px] hover:bg-[#ccfbf1] transition-colors"
          >
            联系我
          </a>
        </Animate>

        {/* Mobile hamburger */}
        <Animate delay={100} direction="down" className="lg:hidden">
          <button
            className="w-[44px] h-[44px] flex items-center justify-center rounded-full bg-[rgba(3,28,30,0.45)] backdrop-blur-[17px] border border-white/[0.08] transition-colors hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5">
              <Menu
                className="w-5 h-5 text-white absolute inset-0 transition-all duration-300 ease-out"
                style={isOpen ? { opacity: 0, transform: 'rotate(90deg) scale(0.75)' } : { opacity: 1, transform: 'rotate(0deg) scale(1)' }}
              />
              <X
                className="w-5 h-5 text-white absolute inset-0 transition-all duration-300 ease-out"
                style={isOpen ? { opacity: 1, transform: 'rotate(0deg) scale(1)' } : { opacity: 0, transform: 'rotate(-90deg) scale(0.75)' }}
              />
              </div>
            </button>
          </Animate>

          {/* Mobile menu overlay */}
          <>
            <div
              className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'visible' : 'invisible'}`}
            >
              <div
                className={`absolute inset-0 bg-[#020c10]/90 backdrop-blur-[24px] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
              />
              <div
                className={`absolute top-[76px] sm:top-[86px] left-4 right-4 sm:left-6 sm:right-6 bg-[rgba(3,28,30,0.6)] backdrop-blur-[30px] rounded-[20px] border border-white/[0.06] p-6 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-top ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-[0.97]'}`}
              >
                <div className="flex flex-col gap-1">
                  {NAV_LINKS.map((link, i) => (
                    <a
                      href={link.href}
                      key={link.href}
                      className="px-4 py-4 rounded-[12px] text-white/90 text-[18px] font-[450]"
                      style={{ transitionDelay: isOpen ? `${100 + i * 50}ms` : '0ms' }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </>
      </nav>
    </>
  );
};

function Hero() {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden bg-[#020617]"
    >
      <CinematicBackground />
      <div className="relative z-10 min-h-screen flex flex-col">
        <Nav />

        {/* 居中主内容：眉题 → 大标题（双色）→ 副标题 → CTA */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-5 sm:px-8 pt-6 pb-24 sm:pb-28">
          <Animate delay={250} direction="up">
            <p className="text-white/60 text-xs sm:text-sm tracking-[0.25em] mb-6 sm:mb-8">
              个人主页 · 2026
            </p>
          </Animate>

          <Animate delay={400} direction="up">
            <h1 className="text-white text-[34px] sm:text-[46px] md:text-[58px] lg:text-[70px] font-normal leading-[1.12] tracking-[-0.01em] max-w-[880px]">
              在硬件与代码之间，
              <br />
              <span className="text-[#5EEAD4]">把想法做成实物</span>
            </h1>
          </Animate>

          <Animate delay={550} direction="up">
            <p className="mt-6 sm:mt-8 text-white/75 text-[15px] sm:text-[17px] md:text-[18px] font-[450] leading-[1.7] max-w-[520px]">
              人工智能专业大一在读，聚焦智能温控睡眠硬件的方案调研、器件选型与样品验证；也自学前端，用网页记录和呈现自己的作品。
            </p>
          </Animate>

          <Animate delay={700} direction="up">
            <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
              <a
                href="projects.html"
                className="h-[46px] sm:h-[51px] px-6 sm:px-8 inline-flex items-center bg-white text-[#06131a] rounded-full text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] transition-colors duration-200 hover:bg-[#ccfbf1]"
              >
                查看项目
              </a>
              <a
                href="contact.html"
                className="h-[46px] sm:h-[51px] px-6 sm:px-8 inline-flex items-center rounded-full border border-white/70 text-white text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] transition-colors duration-200 hover:bg-white/10"
              >
                联系我
              </a>
            </div>
          </Animate>
        </div>

        {/* 左下：当前方向卡片（桌面） */}
        <div className="absolute left-5 sm:left-8 md:left-[82px] bottom-6 sm:bottom-8 z-10 hidden md:block">
          <Animate delay={900} direction="up">
            <FocusCard />
          </Animate>
        </div>

        {/* 右下：滚动提示 */}
        <div className="absolute right-6 md:right-[82px] bottom-7 sm:bottom-8 z-10 hidden sm:flex flex-col items-center gap-2.5 text-white/50">
          <span className="text-[11px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="relative w-px h-10 bg-white/15 overflow-hidden">
            <span className="cb-scroll-dot absolute left-0 top-0 w-px h-2.5 bg-[#5EEAD4]" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
