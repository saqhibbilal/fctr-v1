'use client';

import React, { useEffect, useState } from 'react';

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        {/* Grid Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(124, 69, 133, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(124, 69, 133, 0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 1) 100%)'
            }}
          />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl opacity-50 animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-1000 ${
          isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
        }`}>
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Enterprise Cloud
          </span>
          <br />
          <span className="text-foreground">Training Excellence</span>
        </h1>

        <p className={`text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
          isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
        }`}>
          Master Oracle Cloud, AI, Data Engineering, and modern business solutions with industry experts. Transform your
          career with hands-on training.
        </p>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 ${
          isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
        }`}>
          <button
            onClick={() => {
              const element = document.getElementById("courses");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 hover:scale-105"
          >
            Explore Courses
          </button>
          <button
            onClick={() => {
              const element = document.getElementById("experts");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 border border-primary text-primary hover:bg-primary/10 font-semibold transition-all duration-300 hover:scale-105"
          >
            Meet Our Experts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
