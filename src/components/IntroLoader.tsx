import React, { useEffect, useState } from 'react';

interface IntroLoaderProps {
  onComplete: () => void; // Renamed from onLoadingComplete for consistency with existing file
  duration?: number;
}

const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete, duration = 3500 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fadeOutStartTime = duration - 1000; // Start fading out 1 second before end

    // Timer to start fade-out
    const fadeTimer = setTimeout(() => {
      // This state could trigger a CSS class for fade-out if preferred
      // For simplicity here, the main fadeOut is handled by the animation
    }, fadeOutStartTime);

    // Timer to complete and unmount
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-amber-50 flex flex-col items-center justify-center z-50"
      style={{ animation: `fadeOutAnimation ${duration / 1000}s ease-out forwards` }}
    >
      <style jsx global>{`
        @keyframes fadeOutAnimation {
          0% { opacity: 1; }
          70% { opacity: 1; } /* Stay visible for a good portion */
          100% { opacity: 0; }
        }
        @keyframes pulseLogo {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>

      {/* Logo */}
      <img
        src="/assets/logo.jpg"
        alt="गृहिणी Logo"
        className="w-40 h-40 md:w-48 md:h-48 mb-6" // Adjusted size
        style={{ animation: `pulseLogo 2s infinite ease-in-out` }}
      />

      {/* Brand Name - Optional, as logo contains "Gruhani" visually. Slogan is more key. */}
      {/* <h1 className="font-heading text-5xl md:text-6xl font-bold text-red-800 mb-4">
        गृहिणी
      </h1> */}

      {/* Tagline */}
      <p className="text-xl md:text-2xl text-red-700 font-playfair px-4 text-center">
        घर की रसोई से, दिल तक का सफर
      </p>
    </div>
  );
};

export default IntroLoader;