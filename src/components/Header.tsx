import { Heart, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Countdown } from './Countdown';
import { nextUnlock } from '@/lib/unlock-logic';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

export function Header() {
  const next = nextUnlock();

  return (
    <header className="w-full border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Heart className="w-6 h-6 text-primary fill-primary" />
          <h1 className="text-xl md:text-2xl font-semibold text-foreground">
            Calendario de Adviento
          </h1>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          {next && (
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs text-muted-foreground">Próximo desbloqueo:</span>
              <Countdown target={next} />
            </div>
          )}
          
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 rounded-full px-4 border-2 lowercase"
              >
                <Info className="w-4 h-4" />
                <span className="hidden md:inline">info</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold text-left">
                  Tu diciembre sorpresa
                </DialogTitle>
                <DialogDescription className="space-y-4 text-left pt-4">
                  <p className="text-foreground leading-relaxed">
                    Holaaa viccc, te dejo por aquí un poco más de info sobre <strong>nuestro calendario de adviento</strong>, jeje.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    Cada día, del 1 al 24 de diciembre, se desbloqueará una nueva sorpresa a partir de las <strong>9:00</strong>.
                    Haz clic en la tarjeta del día para descubrir qué he preparado para ti: puede ser un mensaje, una foto, una sorpresa...
                  </p>
                  <p className="text-primary leading-relaxed text-left">
                    ♥ Prometo sacarte cada día una sonrisa ♥
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
