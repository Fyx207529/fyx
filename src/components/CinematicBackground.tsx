import { useEffect, useMemo, useRef } from 'react';

/**
 * 电影级动态背景
 * 纯装饰层：远景天空 → 远云 → 中景云 → 能量地平线 → 体积光射线 → 大气雾 → 微粒 → 暗角
 * 每层独立运动形成视差；支持极轻微的鼠标视差，触屏与“减少动效”偏好下自动关闭。
 */

const PARTICLE_COUNT = 26;

type Particle = {
  id: number;
  left: number;
  top: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  dx: number;
  dy: number;
  color: string;
};

const depth = (d: number) => ({ '--d': d } as React.CSSProperties);

const particleStyle = (p: Particle) =>
  ({
    left: `${p.left}%`,
    top: `${p.top}%`,
    width: `${p.size}px`,
    height: `${p.size}px`,
    '--pc': p.color,
    '--po': p.opacity,
    '--pdur': `${p.duration}s`,
    '--pdelay': `${p.delay}s`,
    '--dx': `${p.dx}px`,
    '--dy': `${p.dy}px`,
  } as React.CSSProperties);

const CinematicBackground = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  // 随机参数只生成一次，避免重渲染时微粒跳动
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: 42 + Math.random() * 56,
        size: 1 + Math.random() * 2,
        opacity: 0.16 + Math.random() * 0.38,
        duration: 18 + Math.random() * 22,
        delay: Math.random() * 22,
        dx: (Math.random() - 0.5) * 36,
        dy: -26 - Math.random() * 46,
        // 少量偏暖（地平线能量），其余偏冷（大气蓝）
        color: Math.random() > 0.68 ? '255,138,61' : '150,205,255',
      })),
    []
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // 触屏设备与“减少动效”偏好下不启用鼠标视差，只保留自主缓慢动画
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reduceMotion) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        // 最大位移约 18px / 14px，保持极克制
        root.style.setProperty('--mx', `${(-nx * 18).toFixed(2)}px`);
        root.style.setProperty('--my', `${(-ny * 14).toFixed(2)}px`);
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="cb" ref={rootRef} aria-hidden="true">
      {/* 1. 远景天空 */}
      <div className="cb__layer" style={depth(0.12)}>
        <div className="cb__sky" />
      </div>

      {/* 2. 高空巨型云团 */}
      <div className="cb__layer" style={depth(0.26)}>
        <div className="cb__clouds-far" />
      </div>

      {/* 3. 中层大气云 */}
      <div className="cb__layer" style={depth(0.42)}>
        <div className="cb__clouds-mid" />
      </div>

      {/* 4. 能量地平线（光晕） */}
      <div className="cb__layer" style={depth(0.55)}>
        <div className="cb__horizon" />
      </div>

      {/* 5. 体积光射线 */}
      <div className="cb__layer" style={depth(0.48)}>
        <div className="cb__rays" />
      </div>

      {/* 6. 大气雾（慢） */}
      <div className="cb__layer" style={depth(0.72)}>
        <div className="cb__fog-a" />
      </div>

      {/* 7. 地平线高光核心 */}
      <div className="cb__layer" style={depth(0.95)}>
        <div className="cb__horizon-core" />
      </div>

      {/* 8. 前景雾（更快） */}
      <div className="cb__layer" style={depth(1.1)}>
        <div className="cb__fog-b" />
      </div>

      {/* 9. 微粒场 */}
      <div className="cb__layer" style={depth(0.85)}>
        <div className="cb__particles">
          {particles.map((p) => (
            <span key={p.id} className="cb__particle" style={particleStyle(p)} />
          ))}
        </div>
      </div>

      {/* 10. 暗角 + 保证文字可读的压暗层 */}
      <div className="cb__vignette" />
      <div className="cb__scrim" />
    </div>
  );
};

export default CinematicBackground;
