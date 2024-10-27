import { Ghost } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <Ghost className="w-12 h-12 text-halloween-purple animate-fast-spin" />
    </div>
  );
};

export default LoadingSpinner;