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

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      toast({
        title: "Configuration Error",
        description: "Please set up your OpenAI API key in the .env file",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt: prompt,
          n: 1,
          size: "1024x1024"
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to generate image');
      }

      setImage(data.data[0].url);
      toast({
        title: "Magic Complete! 🎃",
        description: "Your spooky masterpiece is ready!",
      });
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: error instanceof Error ? error.message : "The magic spell failed. Please try again!",
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