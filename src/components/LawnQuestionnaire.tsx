import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PlanTypeStep from "./PlanTypeStep";
import LawnSizeStep from "./LawnSizeStep";
import GrassTypeStep from "./GrassTypeStep";
import ProblemAreasStep from "./ProblemAreasStep";
import LocationStep from "./LocationStep";
import SprinklerSystemStep from "./SprinklerSystemStep";
import PlantTypeStep from "./PlantTypeStep";
import GardenSizeStep from "./GardenSizeStep";
import AnalysisAnimation from "./AnalysisAnimation";
import LawnPlanResults from "./LawnPlanResults";
import GardenPlanResults from "./GardenPlanResults";
import GreenBackgroundSection from "./GreenBackgroundSection";

interface LawnQuestionnaireProps {
  onBack: () => void;
}

const LawnQuestionnaire = ({ onBack }: LawnQuestionnaireProps) => {
  const [currentStep, setCurrentStep] = useState(0); // Start at 0 for plan type selection
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [planData, setPlanData] = useState({
    planType: "", // 'lawn' or 'garden'
    // Lawn specific fields
    size: "",
    grassType: "",
    location: "",
    problems: [] as string[],
    sunlight: "",
    soilType: "",
    sprinklerSystem: "",
    sprinklerFrequency: "",
    // Garden specific fields
    plantType: "",
    gardenSize: "",
  });

  const getTotalSteps = () => {
    if (planData.planType === "lawn") {
      return 6; // Plan type + 5 lawn steps
    } else if (planData.planType === "garden") {
      return 4; // Plan type + 3 garden steps
    }
    return 1; // Just plan type selection
  };

  const progress =
    getTotalSteps() > 1 ? ((currentStep + 1) / getTotalSteps()) * 100 : 0;

  const updatePlanData = (data: Partial<typeof planData>) => {
    setPlanData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    const totalSteps = getTotalSteps();
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      setShowAnalysis(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleAnalysisComplete = () => {
    setShowAnalysis(false);
    setShowResults(true);
  };

  const handleRestart = () => {
    setShowResults(false);
    setShowAnalysis(false);
    setCurrentStep(0);
    setPlanData({
      planType: "",
      size: "",
      grassType: "",
      location: "",
      problems: [],
      sunlight: "",
      soilType: "",
      sprinklerSystem: "",
      sprinklerFrequency: "",
      plantType: "",
      gardenSize: "",
    });
  };

  if (showResults) {
    if (planData.planType === "lawn") {
      console.log("Lawn Plan Data:", planData);
      return <LawnPlanResults lawnData={planData} onRestart={handleRestart} />;
    } else {
      return (
        <GardenPlanResults
          gardenData={planData}
          onRestart={handleRestart}
          onBack={onBack}
        />
      );
    }
  }

  if (showAnalysis) {
    return <AnalysisAnimation onComplete={handleAnalysisComplete} />;
  }

  const renderStep = () => {
    if (currentStep === 0) {
      return (
        <PlanTypeStep
          selectedType={planData.planType}
          onTypeChange={(type) => updatePlanData({ planType: type })}
        />
      );
    }

    if (planData.planType === "lawn") {
      switch (currentStep) {
        case 1:
          return <LawnSizeStep data={planData} onUpdate={updatePlanData} />;
        case 2:
          return <GrassTypeStep data={planData} onUpdate={updatePlanData} />;
        case 3:
          return <LocationStep data={planData} onUpdate={updatePlanData} />;
        case 4:
          return <ProblemAreasStep data={planData} onUpdate={updatePlanData} />;
        case 5:
          return (
            <SprinklerSystemStep data={planData} onUpdate={updatePlanData} />
          );
        default:
          return null;
      }
    } else if (planData.planType === "garden") {
      switch (currentStep) {
        case 1:
          return (
            <PlantTypeStep
              selectedType={planData.plantType}
              onTypeChange={(type) => updatePlanData({ plantType: type })}
            />
          );
        case 2:
          return (
            <GardenSizeStep
              selectedSize={planData.gardenSize}
              onSizeChange={(size) => updatePlanData({ gardenSize: size })}
            />
          );
        case 3:
          return <LocationStep data={planData} onUpdate={updatePlanData} />;
        default:
          return null;
      }
    }

    return null;
  };

  const getStepTitle = () => {
    if (currentStep === 0) {
      return "Choose Your Plan Type";
    }

    if (planData.planType === "lawn") {
      switch (currentStep) {
        case 1:
          return "Lawn Size";
        case 2:
          return "Grass Type";
        case 3:
          return "Location & Conditions";
        case 4:
          return "Problem Areas";
        case 5:
          return "Watering System";
        default:
          return "";
      }
    } else if (planData.planType === "garden") {
      switch (currentStep) {
        case 1:
          return "Plant Type";
        case 2:
          return "Garden Size";
        case 3:
          return "Location & Conditions";
        default:
          return "";
      }
    }

    return "";
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return planData.planType !== "";
    }

    if (planData.planType === "lawn") {
      switch (currentStep) {
        case 1: {
          const hasLocation = !!planData.location;

          const hasSize =
            !!planData.size && planData.size !== "" && planData.size !== null;

          return hasLocation && hasSize;
        }
        case 2:
          return planData.grassType !== "";
        case 3:
          return planData.sunlight !== "";
        case 4:
          return true; // Problems are optional
        case 5:
          return (
            planData.sprinklerSystem !== "" &&
            (planData.sprinklerSystem === "no" ||
              planData.sprinklerFrequency !== "")
          );
        default:
          return false;
      }
    } else if (planData.planType === "garden") {
      switch (currentStep) {
        case 1:
          return planData.plantType !== "";
        case 2:
          return planData.gardenSize !== "";
        case 3:
          return planData.location !== "";
        default:
          return false;
      }
    }

    return false;
  };

  const getPlanTitle = () => {
    if (planData.planType === "lawn") {
      return "Custom Lawn Plan";
    } else if (planData.planType === "garden") {
      return "Custom Garden Plan";
    }
    return "Custom Plan";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full">
        {/* Progress Bar */}
        {currentStep > 0 && (
          <div className="px-8 py-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-center text-gray-600 mb-4">
                Step {currentStep} of {getTotalSteps() - 1}
              </p>
              <Progress value={progress} className="h-2 bg-gray-200" />
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="w-full">{renderStep()}</div>

        {/* Navigation */}
        <div className="px-8 py-12">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Button
              variant="secondary"
              onClick={currentStep === 0 ? onBack : prevStep}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Back
            </Button>
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === getTotalSteps() - 1
                ? "Generate Plan"
                : "Continue"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Green Background Section for Plan Type and Garden Steps - Full Width at Bottom */}
        {(currentStep === 0 ||
          (planData.planType === "garden" && currentStep > 0)) && (
          <div className="w-full">
            <GreenBackgroundSection />
          </div>
        )}
      </div>
    </div>
  );
};

export default LawnQuestionnaire;
