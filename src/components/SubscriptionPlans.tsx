import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, Leaf, Sprout, Trees, Star, Building2 } from 'lucide-react';

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
    tag: 'Great Value',
    tagColor: 'bg-orange-500',
    accentColor: 'border-orange-400',
    btnClass: 'border-2 border-orange-400 text-orange-600 bg-white hover:bg-orange-50',
    priceColor: 'text-orange-500',
  },
  {
    name: 'Advanced',
    icon: Leaf,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
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
    tag: 'Most Popular',
    tagColor: 'bg-green-600',
    accentColor: 'border-green-500',
    btnClass: 'bg-green-600 text-white hover:bg-green-700',
    priceColor: 'text-green-600',
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
    tag: 'Best Results',
    tagColor: 'bg-cyan-500',
    accentColor: 'border-cyan-400',
    btnClass: 'border-2 border-cyan-400 text-cyan-600 bg-white hover:bg-cyan-50',
    priceColor: 'text-cyan-500',
  },
];



const SubscriptionPlans = ({ lawnData, onBack, onRestart }: SubscriptionPlansProps) => {
  const showBulkCard = lawnData?.size === 'xlarge';

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/60 via-white to-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
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
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-4">
            <Leaf className="h-7 w-7 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">Choose Your Plan</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every plan is customized to your soil profile and local climate data.
          </p>
        </div>

        {/* Plans Grid — equal height via flex */}
        <div className={`grid gap-8 items-stretch mb-16 ${showBulkCard ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl rounded-2xl ${
                plan.highlighted
                  ? `border-2 ${plan.accentColor} shadow-lg md:-mt-4 md:mb-[-1rem] z-10`
                  : 'border border-border hover:border-muted-foreground/30'
              }`}
            >
              <div className={`${plan.tagColor} text-white text-xs font-bold uppercase tracking-wider text-center py-2 flex items-center justify-center gap-1`}>
                <Star className="h-3 w-3 fill-current" /> {plan.tag}
              </div>
              <CardContent className="p-8 flex flex-col flex-1">
                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-full ${plan.iconBg} flex items-center justify-center`}>
                    <plan.icon className={`h-5 w-5 ${plan.iconColor}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{plan.name}</h2>
                </div>

                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {plan.description}
                </p>

                {/* Pricing */}
                <div className="mb-6 pb-6 border-b border-border">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-extrabold ${plan.priceColor}`}>
                      ${plan.annualPrice * 12}
                    </span>
                    <span className="text-sm text-muted-foreground">/year</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Save 15%{' '}
                    <span className="line-through text-muted-foreground/50">${plan.price * 12}</span>
                  </p>
                </div>

                {/* Features — grows to fill space */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA — always at bottom */}
                <Button
                  className={`w-full py-5 rounded-xl font-semibold text-base transition-all ${plan.btnClass}`}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}

          {/* Bulk / Enterprise Card — only for Extra Large lawns */}
          {showBulkCard && (
            <Card className="relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl rounded-2xl border border-border hover:border-muted-foreground/30">
              <div className="bg-purple-600 text-white text-xs font-bold uppercase tracking-wider text-center py-2 flex items-center justify-center gap-1">
                <Star className="h-3 w-3 fill-current" /> Bulk Purchase
              </div>
              <CardContent className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-purple-50 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Enterprise</h2>
                </div>

                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Custom bulk pricing for extra-large properties, estates, and commercial landscapes.
                </p>

                <div className="mb-6 pb-6 border-b border-border">
                  <span className="text-4xl font-extrabold text-purple-600">Custom</span>
                  <p className="text-sm text-muted-foreground mt-1">Tailored to your needs</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    'Volume-based custom pricing',
                    'Dedicated account manager',
                    'On-site soil analysis',
                    'Priority bulk shipping',
                    'Flexible delivery schedule',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-purple-600" />
                      </div>
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full py-5 rounded-xl font-semibold text-base transition-all border-2 border-purple-400 text-purple-600 bg-white hover:bg-purple-50"
                  onClick={() => window.open('https://biogrowthorganics.com/pages/contact-us', '_blank')}
                >
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Features Section */}
        <Card className="border border-border rounded-2xl bg-green-50/40">
          <CardContent className="p-10">
            <h2 className="text-2xl font-bold text-center text-foreground mb-2">All Plans Include</h2>
            <p className="text-center text-muted-foreground mb-8 text-sm">Everything you need for a healthier lawn</p>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {[
                'Custom nutrient blends based on your soil analysis',
                'Seasonal schedules tailored to your grass type and climate',
                'Eco-friendly, organic-first formulations',
                'Free shipping on all deliveries',
                'Adjust, pause, or cancel anytime',
                'Access to lawn care tips and expert advice',
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-green-600" />
                  </div>
                  <p className="text-foreground/80 text-sm">{feature}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom actions */}
        <div className="text-center mt-12">
          <Button variant="ghost" onClick={onRestart} className="text-muted-foreground hover:text-foreground">
            Start Over
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
