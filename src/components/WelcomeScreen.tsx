import { useEffect, useState } from 'react';
import { Snow } from './Snow';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [hideText, setHideText] = useState(false);
  const [hideOverlay, setHideOverlay] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => {
      setHideText(true);
    }, 6000);

    const overlayTimer = setTimeout(() => {
      setHideOverlay(true);
    }, 7000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 8000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(overlayTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-40 overflow-hidden gradient-romantic transition-opacity duration-1000 ease-out ${
        hideOverlay ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <Snow enabled={!hideOverlay} />

      <div
        className={`absolute inset-0 transition-all duration-1000 ease-out ${
          hideOverlay
            ? 'opacity-0 backdrop-blur-none'
            : 'opacity-100 backdrop-blur-[80px]'
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_hsla(0,63%,55%,0.55),_hsla(222,33%,27%,0.88))]" />
      </div>

      <div className="relative flex h-full w-full items-center justify-center px-6">
        <div
          className={`relative z-10 max-w-2xl text-center transition-all duration-700 ease-in-out ${
            hideText ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Hola viccc,
            </h1>

            <p className="text-xl md:text-2xl text-white leading-relaxed animate-[fade-in_0.8s_ease-out_0.5s_both]">
              llevo haciendo esto mucho tiempo, y ya está terminado por fin
            </p>

            <p className="text-xl md:text-2xl text-white leading-relaxed animate-[fade-in_0.8s_ease-out_1s_both]">
              espero que te guste mi amor,{' '}
              <span className="text-primary font-semibold">feliz navidad</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}