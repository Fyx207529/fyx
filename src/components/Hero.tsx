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
    <Animate delay={900} direction="scale" className="w-full max-w-[405px] mx-auto lg:mx-0">
      <div
        className="w-full rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.35)] backdrop-blur-[20px] p-5 sm:p-8 pb-5 sm:pb-6"
      >
        <p className="text-white text-[16px] sm:text-[20px] font-[450] leading-[20px] mb-3 sm:mb-4">
          当前方向
        </p>
        <p className="mb-4 sm:mb-5">
          <span className="text-white text-[26px] sm:text-[34px] font-[450] leading-[1.25]">
            智能温控睡眠硬件
          </span>
        </p>
        <div
          className="flex flex-wrap items-center gap-[8px] mb-6 sm:mb-8"
        >
          {['器件选型', 'BOM 梳理', '供应商对接'].map((tag) => (
            <span
              key={tag}
              className="px-[10px] py-[7px] bg-white/20 rounded-[6px] text-white text-[12px] sm:text-[13px] font-[450] leading-[14px]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="relative">
          <div
            className="flex items-end gap-[1.5px] h-[80px] sm:h-[100px]"
          >
            {[...Array(32).keys()].map((i) => (
              <div
                key={i}
                className="flex-1 rounded-[0.5px] animate-bar-grow origin-bottom"
                style={{
                  height: `${(BAR_HEIGHTS[i] / 95) * 100}%`,
                  backgroundColor: 'rgba(255,255,255,0.45)',
                  animationDelay: `${1100 + i * 30}ms`,
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 w-px bg-white/10"
                style={{ left: `${((i + 1) / 5) * 100}%` }}
              />
            ))}
          </div>
        </div>
        <p className="mt-4 text-white/70 text-[12px] sm:text-[13px] font-[450] leading-[1.6]">
          对标 EightSleep Pod5，做方案调研、器件选型与样品验证
        </p>
      </div>
    </Animate>
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
            className="h-[52px] px-6 flex items-center gap-[26px] bg-[rgba(10,7,7,0.35)] rounded-[11px] backdrop-blur-[17px]"
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
            className="h-[46px] px-6 inline-flex items-center bg-[#E9E9E9] rounded-[11px] text-[#0A0707] text-[14px] font-[450] leading-[14px] hover:bg-white transition-colors"
          >
            联系我
          </a>
        </Animate>

        {/* Mobile hamburger */}
        <Animate delay={100} direction="down" className="lg:hidden">
          <button
            className="w-[44px] h-[44px] flex items-center justify-center rounded-[11px] bg-[rgba(10,7,7,0.35)] backdrop-blur-[17px] transition-colors hover:bg-white/10"
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
                className={`absolute inset-0 bg-[#080A19]/90 backdrop-blur-[24px] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
              />
              <div
                className={`absolute top-[76px] sm:top-[86px] left-4 right-4 sm:left-6 sm:right-6 bg-[rgba(17,16,15,0.6)] backdrop-blur-[30px] rounded-[20px] border border-white/[0.06] p-6 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-top ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-[0.97]'}`}
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
      className="relative w-full h-screen overflow-hidden bg-[#020617]"
    >
      <CinematicBackground />
      <div className="relative z-10 h-full flex flex-col">
        <Nav />

        <div className="flex-1 flex items-center py-8">
          <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-12">
            <div className="max-w-[640px]">
              <Animate delay={300} direction="up">
                <h1
                  className="text-white text-[34px] sm:text-[44px] md:text-[52px] lg:text-[58px] font-normal leading-[1.15] mb-5 sm:mb-8"
                >
                  在硬件与代码之间，把想法做成实物
                </h1>
              </Animate>

              <Animate delay={500} direction="up">
                <p
                  className="text-white/80 text-[15px] sm:text-[17px] md:text-[18px] font-[450] leading-[1.7] max-w-[460px] mb-7 sm:mb-10"
                >
                  人工智能专业大一在读，聚焦智能温控睡眠硬件的方案调研、器件选型与样品验证；也自学前端，用网页记录和呈现自己的作品。
                </p>
              </Animate>

              <Animate delay={700} direction="up">
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <a
                    href="projects.html"
                    className="h-[46px] sm:h-[51px] px-5 sm:px-[27px] inline-flex items-center bg-[#E9E9E9] text-[#0A0707] rounded-[12px] text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] transition-opacity duration-200 hover:opacity-90"
                  >
                    查看项目
                  </a>
                  <a
                    href="contact.html"
                    className="h-[46px] sm:h-[51px] px-5 sm:px-[27px] inline-flex items-center rounded-[12px] border border-white text-white text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] transition-opacity duration-200 hover:opacity-80"
                  >
                    联系我
                  </a>
                </div>
              </Animate>
            </div>

            <FocusCard />
          </div>
        </div>
      </div>
      </section>
  );
};
export default Hero;