import { Button } from '@/components/ui/button';

interface LawnPlanActionsProps {
  onRestart: () => void;
  onGetProducts?: () => void;
}

const LawnPlanActions = ({ onRestart, onGetProducts }: LawnPlanActionsProps) => {
  return (
    <div className="text-center space-y-4 py-4">
      <Button
        onClick={onRestart}
        variant="secondary"
        className="bg-muted hover:bg-muted/80 text-foreground px-8 py-3 rounded-full"
      >
        Create Another Plan
      </Button>
      <div>
        <Button
          onClick={onGetProducts}
          className="bg-brand hover:bg-brand-dark text-white px-8 py-3 text-lg rounded-full shadow-lg transition-transform hover:scale-[1.02]"
        >
          Get Your Products
        </Button>
      </div>
      <p className="text-muted-foreground text-sm max-w-md mx-auto">
        Ready to transform your lawn? Get the recommended products delivered to your door.
      </p>
    </div>
  );
};

export default LawnPlanActions;
