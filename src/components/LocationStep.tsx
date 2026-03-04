
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface LocationStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const LocationStep = ({ data, onUpdate }: LocationStepProps) => {

      {/* Sunlight Conditions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">How much sunlight does your lawn receive? <span className="text-red-500">*</span></h3>
        <div className="grid md:grid-cols-2 gap-4">
          {sunlightOptions.map((option) => (
            <Card 
              key={option.value}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 ${
                data.sunlight === option.value 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => onUpdate({ sunlight: option.value })}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{option.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{option.label}</h4>
                    <p className="text-gray-600 text-sm">{option.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Soil Type */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">What type of soil do you have?</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {soilTypes.map((soil) => (
            <Card 
              key={soil.value}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 ${
                data.soilType === soil.value 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => onUpdate({ soilType: soil.value })}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{soil.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{soil.label}</h4>
                    <p className="text-gray-600 text-sm">{soil.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-900 mb-2">Soil Test Tip</h4>
        <p className="text-yellow-800 text-sm">
          For the most accurate soil recommendations, consider getting a soil test from your local extension office. 
          This will tell you the exact pH and nutrient levels in your soil.
        </p>
      </div>
    </div>
  );
};

export default LocationStep;
