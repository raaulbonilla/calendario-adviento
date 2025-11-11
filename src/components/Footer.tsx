import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            hecho con <Heart className="w-5 h-5 text-primary fill-primary animate-[pulse_0.8s_ease-in-out_infinite]" /> para mi amor
          </p>
        </div>
      </div>
    </footer>
  );
}
