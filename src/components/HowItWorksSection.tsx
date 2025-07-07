const HowItWorksSection = () => {
  return (
    <div className="bg-gray-50 rounded-2xl p-8 shadow-lg mb-16">
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
            Tell us about your lawn size, grass type, and current challenges
          </p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
            2
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Get Your Plan</h3>
          <p className="text-gray-600">
            Receive a customized lawn care plan with specific recommendations
          </p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
            3
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Achieve Results</h3>
          <p className="text-gray-600">
            Follow your plan and watch your lawn transform into its best version
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;