
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface LawnPlanActionsProps {
  onRestart: () => void;
}

const LawnPlanActions = ({ onRestart }: LawnPlanActionsProps) => {
  return (
    <div className="text-center space-y-4">
      <Button
        onClick={onRestart}
        variant="outline"
        className="border-green-300 text-green-700 hover:bg-green-50 px-8 py-3"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Create Another Plan
      </Button>
      <div>
        <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg">
          Get Your Products
        </Button>
      </div>
      <p className="text-gray-600 text-sm">
        Ready to transform your lawn? Get the recommended products delivered to your door.
      </p>
    </div>
  );
};

export default LawnPlanActions;
