import stepQuestionnaire from '@/assets/step-questionnaire.png';
import stepPlan from '@/assets/step-plan.png';
import stepResults from '@/assets/step-results.png';

const HowItWorksSection = () => {
  return (
    <div className="pattern-dots-yellow-green rounded-2xl p-8 md:p-12 mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
        How It Works
      </h2>
      <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
        Get your personalized lawn care plan in three simple steps. Our science-backed approach ensures your lawn gets exactly what it needs.
      </p>
      
      <div className="relative max-w-5xl mx-auto">
        {/* Connecting dotted lines */}
        <div className="hidden md:block absolute top-24 left-0 right-0 h-32 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
            {/* First curve */}
            <path
              d="M 200 50 Q 300 20, 400 50"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="6,8"
              opacity="0.4"
            />
            {/* Second curve */}
            <path
              d="M 600 50 Q 700 20, 800 50"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="6,8"
              opacity="0.4"
            />
          </svg>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative z-10">
          <div className="text-center">
            <div className="w-48 h-48 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-50 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl shadow-lg p-6 h-full flex items-center justify-center">
                <img 
                  src={stepQuestionnaire} 
                  alt="Answer questions illustration" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Answer Questions</h3>
            <p className="text-gray-600">
              Take our 5-minute quiz to personalize your lawn care based on your lawn size, grass type, and challenges.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-48 h-48 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl transform -rotate-3"></div>
              <div className="relative bg-white rounded-3xl shadow-lg p-6 h-full flex items-center justify-center">
                <img 
                  src={stepPlan} 
                  alt="Get your plan illustration" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Get Your Plan</h3>
            <p className="text-gray-600">
             Get a science-backed lawn care plan with tailored products and schedules based on your local climate, soil, and grass type.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-48 h-48 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-3xl transform rotate-2"></div>
              <div className="relative bg-white rounded-3xl shadow-lg p-6 h-full flex items-center justify-center">
                <img 
                  src={stepResults} 
                  alt="Achieve results illustration" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Achieve Results</h3>
            <p className="text-gray-600">
              Follow your personalized plan to grow a vibrant, healthy lawn with our organic, soil-first approach.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;