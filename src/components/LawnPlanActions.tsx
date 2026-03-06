
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface LawnPlanActionsProps {
  onRestart: () => void;
  onGetProducts?: () => void;
}

const LawnPlanActions = ({ onRestart, onGetProducts }: LawnPlanActionsProps) => {
  return (
    <div className="text-center space-y-4">
      <Button
        onClick={onRestart}
        variant="secondary"
        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3"
      >
        Create Another Plan
      </Button>
      <div>
        <Button onClick={onGetProducts} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg">
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
