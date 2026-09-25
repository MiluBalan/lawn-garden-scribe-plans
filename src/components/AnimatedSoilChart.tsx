import { useEffect, useState, useRef } from 'react';
import usMapBg from '@/assets/us-map-bg.jpg';

const AnimatedSoilChart = () => {
  const [animatedValues, setAnimatedValues] = useState({ ph: 0, organic: 0, nitrogen: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            setTimeout(() => {
              setAnimatedValues({ ph: 85, organic: 62, nitrogen: 78 });
            }, 200);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const metrics = [
    { label: 'Soil pH Balance', value: '6.8 Optimal', width: animatedValues.ph },
    { label: 'Organic Matter', value: '3.2% Healthy', width: animatedValues.organic },
    { label: 'Available Nitrogen', value: 'Medium', width: animatedValues.nitrogen },
  ];

  return (
    <div
      ref={chartRef}
      className="relative h-full flex flex-col rounded-[1.75rem] bg-emerald-950 p-8 lg:p-10 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h4 className="text-lg font-medium text-white">Regional Soil Health Index</h4>
          <span className="font-mono text-[11px] uppercase tracking-widest text-emerald-400/80">
            US Soil Data
          </span>
        </div>

        {/* Map tile */}
        <div className="relative mb-6 flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-2xl border border-emerald-800/80 bg-emerald-900/50">
          <img
            src={usMapBg}
            alt="Map of the United States"
            className="h-full w-full object-cover opacity-50 mix-blend-screen"
            style={{ filter: 'invert(1) brightness(1.4) contrast(1.1)' }}
            loading="lazy"
          />
          <span className="absolute inline-flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-emerald-500 shadow-[0_0_16px_rgba(52,211,153,0.7)]"></span>
          </span>
        </div>

        {/* Frosted-glass metric cards */}
        <div className="mt-auto space-y-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)] backdrop-blur-md"
            >
              <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                <span className="text-[11px] font-medium uppercase tracking-widest text-emerald-100/70">
                  {metric.label}
                </span>
                <span className="font-semibold text-white">{metric.value}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-emerald-900/80">
                <div
                  className="h-full rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)] transition-all duration-1000 ease-out"
                  style={{ width: `${metric.width}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedSoilChart;
