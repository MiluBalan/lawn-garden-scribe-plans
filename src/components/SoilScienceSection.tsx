import AnimatedSoilChart from '@/components/AnimatedSoilChart';

const points = [
  {
    title: 'Hyper-local data',
    desc: 'Real soil composition insights from your ZIP code.',
  },
  {
    title: 'Full soil picture',
    desc: 'pH, texture, organic matter, and key nutrients.',
  },
  {
    title: 'Climate-aware plans',
    desc: 'Matched to your region\u2019s rainfall and growing season.',
  },
  {
    title: 'Root-level feeding',
    desc: 'Nutrients targeted where grass actually needs them.',
  },
];

const SoilScienceSection = () => {
  return (
    <div className="mb-20">
      <div className="overflow-hidden rounded-[2rem] border border-emerald-50 bg-white shadow-[0_32px_64px_-16px_rgba(20,45,20,0.08)]">
        <div className="flex flex-col lg:flex-row">
          {/* Left content column */}
          <div className="flex flex-1 flex-col justify-center p-8 md:p-12 lg:p-16">
            <div className="mb-6 inline-flex w-fit items-center space-x-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                Science-Backed
              </span>
            </div>

            <h2 className="mb-4 max-w-xl text-3xl font-bold leading-[1.15] text-foreground md:text-4xl lg:text-[2.75rem]">
              Backed by <span className="text-emerald-600">Soil Science</span>, Not Guesswork
            </h2>
            <p className="mb-10 max-w-md text-lg leading-relaxed text-muted-foreground">
              Your lawn is only as good as the soil beneath it. We analyze real data from your
              ZIP code to create a tailored plan.
            </p>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
              {points.map((point) => (
                <div key={point.title} className="flex items-start space-x-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{point.title}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
              Lawn care that works <span className="font-semibold text-emerald-700">with</span>{' '}
              nature, not against it.
            </p>
          </div>

          {/* Right data panel */}
          <div className="relative w-full p-6 md:p-10 lg:w-[46%] lg:p-12">
            <AnimatedSoilChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilScienceSection;
