const HowItWorksSection = () => {
  return (
    <div className="pattern-dots-yellow-green rounded-2xl p-8 mb-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        How It Works
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
            1
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Answer Questions</h3>
          <p className="text-gray-600">
            Tell us about your lawn size, grass type, and current challenges in a quick 5-minute questionnaire. Our system analyzes your specific conditions to understand your lawn's unique needs and create a personalized approach.
          </p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
            2
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Get Your Plan</h3>
          <p className="text-gray-600">
            Receive a science-backed, customized lawn care plan with specific product recommendations and seasonal schedules. Each plan is tailored to your local climate, soil conditions, and grass type for optimal results.
          </p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
            3
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Achieve Results</h3>
          <p className="text-gray-600">
            Follow your personalized plan and watch your lawn transform into its healthiest, most vibrant version. Our organic approach builds long-term soil health while delivering the beautiful lawn you've always wanted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;