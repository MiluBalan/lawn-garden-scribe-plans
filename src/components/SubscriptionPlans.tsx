import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, Leaf, Sprout, Trees } from 'lucide-react';

interface SubscriptionPlansProps {
  lawnData: any;
  onBack: () => void;
  onRestart: () => void;
}

const plans = [
  {
    name: 'Basic',
    icon: Sprout,
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-50',
    description: 'Perfect for small lawns that need essential care and maintenance.',
    features: [
      'Monthly soil nutrient blend',
      'Seasonal application guide',
      'Email support',
    ],
    price: 29,
    annualPrice: 24,
    period: '/month',
    highlighted: false,
    buttonClass: 'border-2 border-orange-400 text-orange-500 bg-white hover:bg-orange-50',
  },
  {
    name: 'Advanced',
    icon: Leaf,
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
    description: 'Ideal for medium lawns with targeted soil treatment and growth optimization.',
    features: [
      'Custom nutrient formula',
      'Bi-weekly application schedule',
      'Soil test kit included',
      'Priority email & chat support',
    ],
    price: 49,
    annualPrice: 41,
    period: '/month',
    highlighted: true,
    buttonClass: 'bg-primary text-primary-foreground hover:bg-primary/90',
  },
  {
    name: 'Premium',
    icon: Trees,
    iconColor: 'text-cyan-500',
    iconBg: 'bg-cyan-50',
    description: 'Complete lawn transformation with premium products and expert guidance.',
    features: [
      'Full-spectrum soil treatment',
      'Weekly optimized schedule',
      'Quarterly professional soil analysis',
      'Dedicated lawn care specialist',
      'Satisfaction guarantee',
    ],
    price: 79,
    annualPrice: 67,
    period: '/month',
    highlighted: false,
    buttonClass: 'border-2 border-cyan-400 text-cyan-500 bg-white hover:bg-cyan-50',
  },
];

const SubscriptionPlans = ({ lawnData, onBack, onRestart }: SubscriptionPlansProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Analysis
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">Subscription Plan</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that fits your lawn. All plans are customized based on your soil profile and local climate data.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-start mb-16">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.highlighted
                  ? 'border-2 border-primary shadow-lg scale-105 z-10'
                  : 'border border-border hover:border-muted-foreground/30'
              }`}
            >
              <CardContent className="p-8">
                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full ${plan.iconBg} flex items-center justify-center`}>
                    <plan.icon className={`h-5 w-5 ${plan.iconColor}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{plan.name}</h2>
                </div>

                <p className="text-sm text-muted-foreground mb-6 min-h-[48px]">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-bold ${plan.highlighted ? 'text-primary' : plan.iconColor}`}>
                      ${plan.annualPrice * 12}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Annually: Save 15%{' '}
                    <span className="line-through text-muted-foreground/60">${plan.price * 12}</span>
                  </p>
                </div>

                {/* CTA */}
                <Button
                  className={`w-full py-5 rounded-lg font-semibold text-base ${plan.buttonClass}`}
                >
                  Purchase
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <Card className="border border-border">
          <CardContent className="p-10">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">Features</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {[
                'Custom nutrient blends based on your soil analysis',
                'Seasonal schedules tailored to your grass type and climate',
                'Eco-friendly, organic-first formulations',
                'Free shipping on all deliveries',
                'Adjust, pause, or cancel anytime',
                'Access to lawn care tips and expert advice',
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-primary font-bold text-lg">{i + 1}</span>
                  <p className="text-foreground/80 text-sm">{feature}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom actions */}
        <div className="text-center mt-12">
          <Button variant="ghost" onClick={onRestart} className="text-muted-foreground">
            Start Over
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
