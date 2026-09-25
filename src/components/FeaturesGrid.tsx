import { Sprout, MapPin, ShieldCheck, Droplets } from 'lucide-react';

const features = [
  {
    icon: Sprout,
    title: 'Grass Type Analysis',
    description: "Understand your lawn's specific needs for better, organic growth.",
    iconBg: 'bg-gradient-to-br from-emerald-100/80 to-emerald-50/40 ring-emerald-100/80',
    iconColor: 'text-emerald-600',
    hoverBg: 'group-hover:bg-emerald-600',
    hoverColor: 'group-hover:text-white',
    hoverBorder: 'hover:border-emerald-200/70',
    glow: 'group-hover:shadow-emerald-200/40',
  },
  {
    icon: MapPin,
    title: 'Location Based',
    description: 'Get customized nutrient blends tailored to your local soil composition.',
    iconBg: 'bg-gradient-to-br from-sky-100/80 to-sky-50/40 ring-sky-100/80',
    iconColor: 'text-[#0c8aeb]',
    hoverBg: 'group-hover:bg-[#0c8aeb]',
    hoverColor: 'group-hover:text-white',
    hoverBorder: 'hover:border-sky-200/70',
    glow: 'group-hover:shadow-sky-200/40',
  },
  {
    icon: ShieldCheck,
    title: 'Problem Areas',
    description: 'Identify and treat brown spots or weeds with precision organic care.',
    iconBg: 'bg-gradient-to-br from-emerald-100/80 to-emerald-50/40 ring-emerald-100/80',
    iconColor: 'text-emerald-600',
    hoverBg: 'group-hover:bg-emerald-600',
    hoverColor: 'group-hover:text-white',
    hoverBorder: 'hover:border-emerald-200/70',
    glow: 'group-hover:shadow-emerald-200/40',
  },
  {
    icon: Droplets,
    title: 'Watering Schedule',
    description: 'Smart timing recommendations for optimal hydration and conservation.',
    iconBg: 'bg-gradient-to-br from-emerald-100/80 to-sky-50/40 ring-emerald-100/60',
    iconColor: 'text-emerald-600',
    hoverBg: 'group-hover:bg-emerald-600',
    hoverColor: 'group-hover:text-white',
    hoverBorder: 'hover:border-emerald-200/70',
    glow: 'group-hover:shadow-emerald-200/40',
  },
];

const FeaturesGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-24">
      {features.map((feature) => (
        <div
          key={feature.title}
          className={`group relative flex flex-col items-center text-center rounded-3xl border border-muted bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${feature.hoverBorder} ${feature.glow}`}
        >
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl ring-1 ring-inset backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 ${feature.iconBg} ${feature.iconColor} ${feature.hoverBg} ${feature.hoverColor}`}
          >
            <feature.icon size={32} strokeWidth={2} />
          </div>
          <h3 className="mt-6 text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesGrid;
