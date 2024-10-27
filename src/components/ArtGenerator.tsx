import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "./LoadingSpinner";
import { Wand2 } from "lucide-react";

const ArtGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Oops!",
        description: "Please enter a spooky description first!",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulated API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      // For demo, using a placeholder Halloween image
      setImage("https://source.unsplash.com/random/400x400/?halloween");
      toast({
        title: "Magic Complete! 🎃",
        description: "Your spooky masterpiece is ready!",
      });
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: "The magic spell failed. Please try again!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <div className="space-y-4">
        <Input
          placeholder="Describe your spooky Halloween creation..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border-2 border-halloween-purple focus:border-halloween-orange transition-colors"
        />
        <Button
          onClick={generateImage}
          disabled={loading}
          className="w-full halloween-gradient text-white hover:opacity-90 animate-float"
        >
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Spooky Art
        </Button>
      </div>

      {loading && <LoadingSpinner />}

      {image && !loading && (
        <div className="image-frame">
          <img
            src={image}
            alt="Generated Halloween Art"
            className="w-full h-auto rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ArtGenerator;