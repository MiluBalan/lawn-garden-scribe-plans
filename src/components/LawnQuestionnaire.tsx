import { useEffect, useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";
import PlanTypeStep from "./PlanTypeStep";
import LawnSizeStep from "./LawnSizeStep";
import GrassTypeStep from "./GrassTypeStep";
import ProblemAreasStep from "./ProblemAreasStep";
import LocationStep from "./LocationStep";
import SprinklerSystemStep from "./SprinklerSystemStep";
import PlantTypeStep from "./PlantTypeStep";
import GardenSizeStep from "./GardenSizeStep";
import PlantVarietyStep from "./PlantVarietyStep";
import GardenStageStep from "./GardenStageStep";
import AnalysisAnimation from "./AnalysisAnimation";
import LawnPlanResults from "./LawnPlanResults";
import GardenPlanResults from "./GardenPlanResults";
import GreenBackgroundSection from "./GreenBackgroundSection";

interface LawnQuestionnaireProps {
  onBack: () => void;
}

const STORAGE_KEY = "biogrowth-plan-data";

const STEP_SLUGS: Record<string, string[]> = {
  lawn: ["size", "grass-type", "location", "problems", "sprinklers"],
  garden: ["size", "plant-type", "variety", "stage", "location"],
};

const EMPTY_PLAN = {
  planType: "",
  size: "",
  grassType: "",
  location: "",
  problems: [] as string[],
  sunlight: "",
  soilType: "",
  sprinklerSystem: "",
  sprinklerFrequency: "",
  plantType: "",
  gardenSize: "",
  growingSetup: "",
  gardenStage: "",
  growthStage: "",
  plantingSeason: "",
  plantSubtype: "",
  plantSpacing: "",
  plantGoal: "",
  plantIssues: "",
};

export const clearSavedPlan = () => {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
};

const loadPlan = (): typeof EMPTY_PLAN => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return { ...EMPTY_PLAN, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return { ...EMPTY_PLAN };
};

const LawnQuestionnaire = ({ onBack }: LawnQuestionnaireProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [planData, setPlanData] = useState(loadPlan);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(planData));
    } catch {
      /* ignore */
    }
  }, [planData]);

  // Parse URL: /plan, /plan/:type/:slug
  const parts = location.pathname.replace(/^\/plan\/?/, "").split("/").filter(Boolean);
  const urlType = parts[0] || "";
  const urlSlug = parts[1] || "";
  const slugs = STEP_SLUGS[urlType];
  const view: "step" | "analysis" | "results" =
    urlSlug === "results" ? "results" : urlSlug === "analyzing" ? "analysis" : "step";
  const stepIndex = slugs ? slugs.indexOf(urlSlug) : -1;
  const currentStep = !urlType ? 0 : stepIndex >= 0 ? stepIndex + 1 : view === "step" ? -1 : 6;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const getTotalSteps = () => (planData.planType ? 6 : 1);

  const progress =
    getTotalSteps() > 1 ? ((currentStep + 1) / getTotalSteps()) * 100 : 0;

  const updatePlanData = (data: Partial<typeof planData>) => {
    setPlanData((prev) => ({ ...prev, ...data }));
  };

  const stepPath = (step: number) =>
    step === 0 ? "/plan" : `/plan/${planData.planType}/${STEP_SLUGS[planData.planType][step - 1]}`;

  const nextStep = () => {
    if (currentStep < getTotalSteps() - 1) {
      navigate(stepPath(currentStep + 1));
    } else if (planData.planType === "garden") {
      navigate("/plan/garden/analyzing");
    } else {
      navigate("/plan/lawn/analyzing");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) navigate(stepPath(currentStep - 1));
  };

  const handleAnalysisComplete = () => {
    navigate(`/plan/${planData.planType}/results`, { replace: true });
  };

  const handleBackToSteps = () => {
    navigate(stepPath(5));
  };

  const handleRestart = () => {
    setPlanData({ ...EMPTY_PLAN });
    clearSavedPlan();
    navigate("/plan");
  };

  // Garden loading screen timer
  useEffect(() => {
    if (view === "analysis" && urlType === "garden") {
      const t = setTimeout(handleAnalysisComplete, 1500);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, urlType]);

  // Route guards
  if (urlType && (!slugs || urlType !== planData.planType || currentStep === -1)) {
    return <Navigate to="/plan" replace />;
  }
  for (let s = 0; s < Math.min(currentStep, 6); s++) {
    if (!canProceedAt(s)) {
      return <Navigate to={stepPath(s)} replace />;
    }
  }

  function canProceedAt(step: number): boolean {
    if (step === 0) return planData.planType !== "";
    if (planData.planType === "lawn") {
      switch (step) {
        case 1:
          return !!planData.location && !!planData.size;
        case 2:
          return planData.grassType !== "";
        case 3:
          return planData.sunlight !== "";
        case 4:
          return true;
        case 5:
          return (
            planData.sprinklerSystem !== "" &&
            (planData.sprinklerSystem === "no" || planData.sprinklerFrequency !== "")
          );
      }
    } else if (planData.planType === "garden") {
      switch (step) {
        case 1:
          return planData.growingSetup !== "" && planData.location !== "";
        case 2:
          return planData.plantType !== "";
        case 3:
          return planData.plantSubtype !== "";
        case 4:
          return planData.gardenStage !== "";
        case 5:
          return planData.sunlight !== "" && planData.soilType !== "";
      }
    }
    return false;
  }

  if (view === "results") {
    if (planData.planType === "lawn") {
      return <LawnPlanResults lawnData={planData} onRestart={handleRestart} />;
    } else {
      return (
        <GardenPlanResults
          gardenData={planData}
          onRestart={handleRestart}
          onBackToSteps={handleBackToSteps}
        />
      );
    }
  }

  if (view === "analysis" && planData.planType === "lawn") {
    return <AnalysisAnimation onComplete={handleAnalysisComplete} />;
  }

  if (view === "analysis") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">Generating Your Garden Report</h2>
          <p className="text-gray-500">Analyzing your inputs to create a personalized plan...</p>
        </div>
      </div>
    );
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
          return <GardenSizeStep data={planData} onUpdate={updatePlanData} />;
        case 2:
          return (
            <PlantTypeStep
              selectedType={planData.plantType}
              onTypeChange={(type) =>
                updatePlanData({ plantType: type, plantSubtype: "" })
              }
            />
          );
        case 3:
          return <PlantVarietyStep data={planData} onUpdate={updatePlanData} />;
        case 4:
          return <GardenStageStep data={planData} onUpdate={updatePlanData} />;
        case 5:
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
          return "Growing Setup";
        case 2:
          return "Plant Type";
        case 3:
          return "Plant Variety";
        case 4:
          return "Garden Stage";
        case 5:
          return "Location & Conditions";
        default:
          return "";
      }
    }

    return "";
  };

  const canProceed = () => canProceedAt(currentStep);


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
                ? planData.planType === "garden"
                  ? "Generate Report"
                  : "Generate Plan"
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
