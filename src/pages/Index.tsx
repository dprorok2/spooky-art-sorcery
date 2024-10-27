import ArtGenerator from "@/components/ArtGenerator";
import { Ghost } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-halloween-black to-halloween-purple p-4">
      <div className="container max-w-4xl mx-auto pt-8 pb-16">
        <div className="text-center mb-12">
          <h1 className="halloween-title text-6xl mb-4 text-halloween-orange">
            Spooky Art Generator
          </h1>
          <p className="text-white text-xl">
            Create magical Halloween art for your school party! 
            <Ghost className="inline-block ml-2 mb-1" />
          </p>
        </div>
        
        <ArtGenerator />
      </div>
    </div>
  );
};

export default Index;