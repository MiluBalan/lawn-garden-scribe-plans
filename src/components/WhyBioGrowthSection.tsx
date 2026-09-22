import {
  BadgeCheck,
  CalendarClock,
  FlaskConical,
  HeartHandshake,
  Leaf,
  PawPrint,
} from 'lucide-react';
import lifestyleImage from '@/assets/why-biogrowth-lifestyle.jpg';

const items = [
  { icon: PawPrint, title: 'Family & pet safe', desc: 'Thoughtful formulas without harsh chemicals.' },
  { icon: Leaf, title: 'Soil-first care', desc: 'Supports healthier roots and living soil.' },
  { icon: FlaskConical, title: 'Science-backed', desc: 'Built with proven plant and soil science.' },
  { icon: CalendarClock, title: 'Flexible plans', desc: 'Pause, skip, or adjust whenever you need.' },
  { icon: HeartHandshake, title: 'Made right guarantee', desc: 'If you are not happy, we will make it right.' },
  { icon: BadgeCheck, title: 'Better by nature', desc: 'Eco-conscious care with less unnecessary runoff.' },
];

const WhyBioGrowthSection = () => {
  return (
    <section className="mb-16 border-y border-border py-14 md:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-green md:aspect-[5/4] lg:aspect-[4/5]">
          <img
            src={lifestyleImage}
            alt="Family enjoying their healthy lawn with their dog"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            loading="lazy"
            width={1280}
            height={1536}
          />
          <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-2 md:inset-x-6 md:bottom-6">
            <div className="rounded-lg bg-background/90 p-3 shadow-lg backdrop-blur-sm md:p-4">
              <PawPrint className="mb-2 h-5 w-5 text-brand" aria-hidden="true" />
              <p className="text-sm font-semibold text-foreground">Loved by families</p>
            </div>
            <div className="rounded-lg bg-background/90 p-3 shadow-lg backdrop-blur-sm md:p-4">
              <Leaf className="mb-2 h-5 w-5 text-brand" aria-hidden="true" />
              <p className="text-sm font-semibold text-foreground">Rooted in nature</p>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase text-brand">Why choose us</p>
          <h2 className="max-w-xl text-3xl font-bold leading-tight text-foreground md:text-4xl">
            Why BioGrowth Organics?
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Smarter lawn care that works with nature—and fits real life.
          </p>

          <div className="mt-8 grid gap-x-8 sm:grid-cols-2">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="group flex gap-3 border-t border-border py-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBioGrowthSection;