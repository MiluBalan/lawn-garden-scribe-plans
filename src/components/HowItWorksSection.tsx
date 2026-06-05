import stepQuestionnaire from '@/assets/step-questionnaire.png';
import stepPlan from '@/assets/step-plan.png';
import stepResults from '@/assets/step-results.png';

const steps = [
  {
    image: stepQuestionnaire,
    alt: 'Answer questions illustration',
    title: 'Answer Questions',
    description: 'Take our 5-minute quiz to personalize your lawn care based on your lawn size, grass type, and challenges.',
    number: '01',
    bg: 'bg-gradient-to-br from-emerald-50 via-white to-emerald-100/60',
    badge: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    ring: 'group-hover:ring-emerald-300/60',
  },
  {
    image: stepPlan,
    alt: 'Get your plan illustration',
    title: 'Get Your Plan',
    description: 'Get a science-backed lawn care plan with tailored products and schedules based on your local climate, soil, and grass type.',
    number: '02',
    bg: 'bg-gradient-to-br from-sky-50 via-white to-sky-100/60',
    badge: 'bg-gradient-to-br from-sky-500 to-sky-600',
    ring: 'group-hover:ring-sky-300/60',
  },
  {
    image: stepResults,
    alt: 'Achieve results illustration',
    title: 'Achieve Results',
    description: 'Follow your personalized plan to grow a vibrant, healthy lawn with our organic, soil-first approach.',
    number: '03',
    bg: 'bg-gradient-to-br from-amber-50 via-white to-amber-100/60',
    badge: 'bg-gradient-to-br from-amber-500 to-amber-600',
    ring: 'group-hover:ring-amber-300/60',
  },
];

const HowItWorksSection = () => {
  return (
    <div className="mb-20">
      <div className="text-center mb-14">
        <span className="inline-block bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent font-semibold text-sm uppercase tracking-wider mb-3">Simple Process</span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          How It <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">Works</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Get your personalized lawn care plan in three simple steps.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-32 left-[16%] right-[16%] h-px border-t-2 border-dashed border-emerald-300/50 z-0" />

        <div className="grid md:grid-cols-3 gap-10 relative z-10">
          {steps.map((step) => (
            <div key={step.number} className="text-center group">
              <div className="relative mb-6">
                {/* Step number */}
                <span className={`absolute -top-3 -right-3 z-20 ${step.badge} text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ring-4 ring-white`}>
                  {step.number}
                </span>
                <div className={`w-48 h-48 mx-auto rounded-3xl ${step.bg} p-5 flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 ring-2 ring-transparent ${step.ring}`}>
                  <img
                    src={step.image}
                    alt={step.alt}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
