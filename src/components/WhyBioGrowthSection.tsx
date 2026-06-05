import familySafe from '@/assets/why-family-safe.png';
import soilFirst from '@/assets/why-soil-first.png';
import subscription from '@/assets/why-subscription.png';
import guarantee from '@/assets/why-guarantee.png';
import environment from '@/assets/why-environment.png';
import science from '@/assets/why-science.png';

const items = [
  { img: familySafe, alt: 'Family and pets safe on lawn', title: 'Family-Safe, Pet-Safe Formulas', desc: 'Safe, natural lawn care for kids, pets, and the planet—no harsh chemicals.', bg: 'from-emerald-50 to-emerald-100/40', tile: 'from-emerald-100 to-emerald-200' },
  { img: soilFirst, alt: 'Healthy soil layers with roots', title: 'Soil-First, Always', desc: 'We nurture your lawn\u2019s ecosystem, boosting microbes, organic matter, and long-term soil health naturally.', bg: 'from-amber-50 to-amber-100/40', tile: 'from-amber-100 to-amber-200' },
  { img: subscription, alt: 'Subscription box with calendar', title: 'Flexible, Hassle-Free Subscriptions', desc: 'Our customizable plans adapt to your lawn year-round, with easy pause, skip, or adjust options—no hidden fees.', bg: 'from-sky-50 to-sky-100/40', tile: 'from-sky-100 to-sky-200' },
  { img: guarantee, alt: 'Satisfaction guarantee badge', title: '100% Satisfaction Guarantee', desc: 'We guarantee your lawn\u2019s success—if you\u2019re not satisfied, we\u2019ll make it right, no questions asked.', bg: 'from-rose-50 to-rose-100/40', tile: 'from-rose-100 to-rose-200' },
  { img: environment, alt: 'Earth with green leaves', title: 'Better for the Environment', desc: 'We offer eco-friendly lawn care with sustainable packaging, reduced runoff, and planet-safe formulas.', bg: 'from-teal-50 to-teal-100/40', tile: 'from-teal-100 to-teal-200' },
  { img: science, alt: 'Laboratory equipment and microscope', title: 'Science-Backed Results', desc: 'Our products, developed with top soil scientists, are proven to consistently improve your lawn\u2019s health and appearance.', bg: 'from-violet-50 to-violet-100/40', tile: 'from-violet-100 to-violet-200' },
];

const WhyBioGrowthSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-white via-emerald-50/30 to-amber-50/30 rounded-3xl p-8 md:p-12 mb-16 border border-emerald-100/60 shadow-sm overflow-hidden">
      <div className="absolute -top-32 -right-32 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative text-center mb-12">
        <span className="inline-block bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent font-semibold text-sm uppercase tracking-wider mb-3">Why Choose Us</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Why <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">BioGrowth Organics?</span>
        </h2>
        <p className="text-lg text-gray-700">
          Organic Lawn Care You Can Trust—From the Ground Up
        </p>
      </div>

      <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.title}
            className={`group relative bg-gradient-to-br ${item.bg} rounded-2xl p-6 text-center border border-white/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
          >
            <div className={`w-28 h-28 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${item.tile} flex items-center justify-center p-3 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
              <img src={item.img} alt={item.alt} className="w-full h-full object-contain" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyBioGrowthSection;
