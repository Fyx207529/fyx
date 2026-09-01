import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import CinematicBackground from './CinematicBackground';

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
          <a href="index.html" className="flex items-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              className="sm:w-[32px] sm:h-[32px]"
            >
              <rect width="32" height="32" rx="7" fill="#e6c890" />
              <text x="16" y="23" fontSize="19" textAnchor="middle" fill="#111" fontFamily="system-ui, sans-serif">F</text>
            </svg>
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
      {/* 兜底：原创 CSS 极光（第三方视频失效时显示，合法、不会空白） */}
      <CinematicBackground />
      {/* 主背景：提示词指定的第三方星云视频（用户选择热链，风险自担） */}
      <div className="absolute inset-0 z-[1]">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_092641_de52eb87-daf2-41db-92cb-7a56eae012a5.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* 轻量压暗，保证中文文案可读 */}
        <div className="absolute inset-0 bg-black/25" />
      </div>
      <div className="relative z-10 min-h-screen flex flex-col">
        <Nav />

        {/* 主内容：靠左、缩小 */}
        <div className="flex-1 flex flex-col items-start justify-center text-left px-5 sm:px-8 md:px-[82px] pt-6 pb-24 sm:pb-28">
          <Animate delay={250} direction="up">
            <p className="text-white/60 text-[11px] sm:text-xs tracking-[0.25em] mb-4 sm:mb-6">
              个人主页 · 2026
            </p>
          </Animate>

          <Animate delay={400} direction="up">
            <h1 className="text-white text-[26px] sm:text-[34px] md:text-[42px] lg:text-[50px] font-normal leading-[1.15] tracking-[-0.01em] max-w-[620px]">
              在硬件与代码之间，
              <br />
              <span className="text-[#5EEAD4]">把想法做成实物</span>
            </h1>
          </Animate>

          <Animate delay={550} direction="up">
            <p className="mt-5 sm:mt-6 text-white/75 text-[14px] sm:text-[15px] md:text-[16px] font-[450] leading-[1.7] max-w-[460px]">
              人工智能专业大一在读，聚焦智能温控睡眠硬件的方案调研、器件选型与样品验证；也自学前端，用网页记录和呈现自己的作品。
            </p>
          </Animate>

          <Animate delay={700} direction="up">
            <div className="mt-7 sm:mt-9 flex flex-wrap justify-start gap-3 sm:gap-4">
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
