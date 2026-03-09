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
    accent: 'bg-surface-green border-brand-accent/20',
  },
  {
    image: stepPlan,
    alt: 'Get your plan illustration',
    title: 'Get Your Plan',
    description: 'Get a science-backed lawn care plan with tailored products and schedules based on your local climate, soil, and grass type.',
    number: '02',
    accent: 'bg-blue-50 border-blue-200',
  },
  {
    image: stepResults,
    alt: 'Achieve results illustration',
    title: 'Achieve Results',
    description: 'Follow your personalized plan to grow a vibrant, healthy lawn with our organic, soil-first approach.',
    number: '03',
    accent: 'bg-amber-50 border-amber-200',
  },
];

const HowItWorksSection = () => {
  return (
    <div className="mb-20">
      <div className="text-center mb-14">
        <span className="inline-block text-brand-accent font-semibold text-sm uppercase tracking-wider mb-3">Simple Process</span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          How It Works
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Get your personalized lawn care plan in three simple steps.
        </p>
      </div>
      
      <div className="relative max-w-5xl mx-auto">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-32 left-[16%] right-[16%] h-px border-t-2 border-dashed border-brand-accent/30 z-0" />

        <div className="grid md:grid-cols-3 gap-10 relative z-10">
          {steps.map((step) => (
            <div key={step.number} className="text-center group">
              <div className="relative mb-6">
                {/* Step number */}
                <span className="absolute -top-3 -right-3 z-20 bg-brand text-brand-foreground w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {step.number}
                </span>
                <div className={`w-48 h-48 mx-auto rounded-3xl border-2 ${step.accent} p-5 flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300`}>
                  <img 
                    src={step.image} 
                    alt={step.alt} 
                    className="w-full h-full object-contain"
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
