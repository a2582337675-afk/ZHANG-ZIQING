import { useLayoutEffect, useRef } from 'react';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const lerp = (from, to, amount) => from + (to - from) * amount;

const hexToRgb = (hex) => {
  const clean = hex.replace('#', '');
  const value = clean.length === 3 ? clean.split('').map((part) => part + part).join('') : clean;
  const num = Number.parseInt(value, 16);

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
};

const mixRgb = (from, to, amount) => ({
  r: Math.round(lerp(from.r, to.r, amount)),
  g: Math.round(lerp(from.g, to.g, amount)),
  b: Math.round(lerp(from.b, to.b, amount)),
});

const easeOutCubic = (t) => 1 - (1 - t) ** 3;

function ParticleText({
  text,
  lines,
  className = '',
  color = '#ff6800',
  highlightColor = '#ffed00',
  trigger = 'click',
  gatherDuration = 800,
  particleSize = 2.5,
}) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const labelRef = useRef(null);
  const particlesRef = useRef([]);
  const frameRef = useRef(0);
  const gatherStartRef = useRef(0);
  const readyRef = useRef(false);
  const dimsRef = useRef({ width: 0, height: 0, dpr: 1 });
  const clickPointRef = useRef({ x: 0, y: 0 });
  const pointerRef = useRef({ active: false, x: 0, y: 0 });
  const colorsRef = useRef({
    base: hexToRgb(color),
    highlight: hexToRgb(highlightColor),
  });
  const resolvedLines = Array.isArray(lines) && lines.length ? lines : null;

  useLayoutEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const label = labelRef.current;
    if (!root || !canvas || !label) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      label.style.color = color;
      return undefined;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let destroyed = false;
    let resizeObserver;
    let fallbackTimer = 0;

    const updateColorCache = () => {
      colorsRef.current = {
        base: hexToRgb(color),
        highlight: hexToRgb(highlightColor),
      };
    };

    const measure = () => {
      const rect = label.getBoundingClientRect();
      const width = Math.max(1, Math.ceil(rect.width));
      const height = Math.max(1, Math.ceil(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      dimsRef.current = { width, height, dpr };
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      const computed = getComputedStyle(label);
      const fontSize = Number.parseFloat(computed.fontSize) || 120;
      const lineHeight = Number.parseFloat(computed.lineHeight) || fontSize * 1.14;

      offCtx.clearRect(0, 0, width, height);
      offCtx.fillStyle = '#fff';
      offCtx.textBaseline = 'top';
      offCtx.textAlign = 'left';
      offCtx.font = computed.font;

      const renderLines = resolvedLines || [text];

      renderLines.forEach((line, index) => {
        if (!resolvedLines) {
          const words = line.split(' ');
          const wrappedLines = [];
          let currentLine = '';

          words.forEach((word) => {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            if (offCtx.measureText(testLine).width > width && currentLine) {
              wrappedLines.push(currentLine);
              currentLine = word;
            } else {
              currentLine = testLine;
            }
          });

          if (currentLine) {
            wrappedLines.push(currentLine);
          }

          wrappedLines.forEach((wrappedLine, wrappedIndex) => {
            offCtx.fillText(wrappedLine, 0, (index + wrappedIndex) * lineHeight);
          });
        } else {
          offCtx.fillText(line, 0, index * lineHeight);
        }
      });

      const { data } = offCtx.getImageData(0, 0, width, height);
      const step = Math.max(2, Math.round(particleSize * 1.05));
      const points = [];

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4 + 3;
          if (data[index] > 18) {
            points.push({
              x: x + Math.random() * step * 0.6 - step * 0.3,
              y: y + Math.random() * step * 0.6 - step * 0.3,
            });
          }
        }
      }

      const maxParticles = Math.round(clamp((width * height) / 20, 5000, 12000));
      const sampled = points.length > maxParticles
        ? points.filter((_, index) => index % Math.ceil(points.length / maxParticles) === 0)
        : points;

      particlesRef.current = sampled.map((point, index) => ({
        targetX: point.x,
        targetY: point.y,
        startX: width / 2 + (Math.random() - 0.5) * width * 0.75,
        startY: height / 2 + (Math.random() - 0.5) * height * 0.75,
        gradient: clamp((point.x / width) * 0.68 + (point.y / height) * 0.32, 0, 1),
        phase: index * 0.13,
      }));

      clickPointRef.current = { x: width / 2, y: height / 2 };
      gatherStartRef.current = performance.now();
      readyRef.current = true;
    };

    const restartGather = (event) => {
      const { width, height } = dimsRef.current;
      if (!width || !height || !particlesRef.current.length) return;

      const rect = root.getBoundingClientRect();
      const origin = event
        ? {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          }
        : {
            x: width / 2,
            y: height / 2,
          };

      clickPointRef.current = origin;

      particlesRef.current = particlesRef.current.map((particle, index) => ({
        ...particle,
        startX: origin.x + Math.cos(index * 12.9898) * (52 + Math.random() * width * 0.32),
        startY: origin.y + Math.sin(index * 78.233) * (52 + Math.random() * height * 0.42),
        phase: index * 0.13,
      }));

      gatherStartRef.current = performance.now();
      readyRef.current = true;
    };

    const draw = (now) => {
      if (destroyed) return;

      const { width, height } = dimsRef.current;
      const particles = particlesRef.current;
      ctx.clearRect(0, 0, width, height);

      const elapsed = now - gatherStartRef.current;
      const progress = clamp(elapsed / gatherDuration, 0, 1);
      const eased = easeOutCubic(progress);
      const base = colorsRef.current.base;
      const highlight = colorsRef.current.highlight;
      const clickPoint = clickPointRef.current;
      const pointer = pointerRef.current;

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        const idleX = particle.targetX + Math.sin(now * 0.0014 + particle.phase) * 0.55;
        const idleY = particle.targetY + Math.cos(now * 0.0012 + particle.phase) * 0.55;
        const x = readyRef.current && progress < 1
          ? lerp(particle.startX, particle.targetX, eased)
          : idleX;
        const y = readyRef.current && progress < 1
          ? lerp(particle.startY, particle.targetY, eased)
          : idleY;
        let drawX = x;
        let drawY = y;
        let hoverForce = 0;

        if (pointer.active) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const distance = Math.hypot(dx, dy);
          const radius = 124;

          if (distance < radius) {
            hoverForce = (1 - distance / radius) ** 2;
            const angle = distance === 0 ? particle.phase : Math.atan2(dy, dx);
            const swirlAngle = particle.phase + now * 0.0014;
            const scatter = hoverForce * 26;
            drawX += Math.cos(angle) * hoverForce * 28 + Math.cos(swirlAngle) * scatter * 0.55;
            drawY += Math.sin(angle) * hoverForce * 20 + Math.sin(swirlAngle) * scatter * 0.42;
          }
        }

        const distanceFromClick = Math.hypot(particle.targetX - clickPoint.x, particle.targetY - clickPoint.y);
        const clickHighlight = readyRef.current && progress < 1
          ? clamp(1 - distanceFromClick / 260, 0, 1) * (1 - progress) * 0.45
          : 0;
        const colorMix = clamp(particle.gradient + clickHighlight + hoverForce * 0.35, 0, 1);
        const rgb = mixRgb(base, highlight, colorMix);
        const alpha = readyRef.current && progress < 1
          ? lerp(0.35, 0.96, eased)
          : lerp(0.95, 1, hoverForce);
        const radius = lerp(particleSize * 0.62, particleSize * 0.9, colorMix) + hoverForce * 0.72;

        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (progress >= 1) {
        readyRef.current = false;
      }

      frameRef.current = window.requestAnimationFrame(draw);
    };

    const init = () => {
      updateColorCache();
      measure();
      frameRef.current = window.requestAnimationFrame(draw);
    };

    init();
    resizeObserver = new ResizeObserver(() => {
      window.cancelAnimationFrame(frameRef.current);
      init();
    });
    resizeObserver.observe(root);

    fallbackTimer = window.setTimeout(() => {
      if (!readyRef.current) {
        restartGather();
      }
    }, 80);

    const handleClick = (event) => {
      if (trigger !== 'click') return;
      restartGather(event);
    };

    const updatePointer = (event) => {
      const rect = root.getBoundingClientRect();
      pointerRef.current = {
        active: true,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const clearPointer = () => {
      pointerRef.current = {
        ...pointerRef.current,
        active: false,
      };
    };

    root.addEventListener('click', handleClick);
    root.addEventListener('pointerenter', updatePointer);
    root.addEventListener('pointermove', updatePointer);
    root.addEventListener('pointerleave', clearPointer);
    window.addEventListener('resize', measure);

    return () => {
      destroyed = true;
      window.cancelAnimationFrame(frameRef.current);
      window.clearTimeout(fallbackTimer);
      root.removeEventListener('click', handleClick);
      root.removeEventListener('pointerenter', updatePointer);
      root.removeEventListener('pointermove', updatePointer);
      root.removeEventListener('pointerleave', clearPointer);
      window.removeEventListener('resize', measure);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [color, gatherDuration, highlightColor, particleSize, text, trigger]);

  return (
    <div ref={rootRef} className={`particle-text ${className}`.trim()}>
      <span ref={labelRef} className="particle-text__label" aria-hidden="true">
        {resolvedLines ? resolvedLines.map((line) => <span key={line}>{line}</span>) : text}
      </span>
      <canvas ref={canvasRef} className="particle-text__canvas" aria-hidden="true" />
      <span className="sr-only">{text}</span>
    </div>
  );
}

export default ParticleText;
