import { ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Surprise } from '@/lib/surprises';
import { useState } from 'react';

interface SurpriseModalProps {
  open: boolean;
  onClose: () => void;
  surprise: Surprise;
  day: number;
}

export function SurpriseModal({ open, onClose, surprise, day }: SurpriseModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const renderContent = () => {
    switch (surprise.type) {
      case 'text':
        return (
          <div className="space-y-4">
            <p className="text-foreground/90 text-lg leading-relaxed whitespace-pre-line">
              {surprise.message}
            </p>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <img
              src={surprise.mediaUrl}
              alt={surprise.title}
              className="w-full h-auto rounded-lg shadow-lg"
              loading="lazy"
            />
            {surprise.message && (
              <p className="text-foreground/90 text-center italic">
                {surprise.message}
              </p>
            )}
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={surprise.mediaUrl[currentImageIndex]}
                alt={`${surprise.title} - Imagen ${currentImageIndex + 1}`}
                className="w-full h-auto rounded-lg shadow-lg"
                loading="lazy"
              />
              {surprise.mediaUrl.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/50 px-3 py-2 rounded-full">
                  {surprise.mediaUrl.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                      }`}
                      aria-label={`Ver imagen ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
            {surprise.message && (
              <p className="text-foreground/90 text-center italic">
                {surprise.message}
              </p>
            )}
            {surprise.mediaUrl.length > 1 && (
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                  disabled={currentImageIndex === 0}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentImageIndex(Math.min(surprise.mediaUrl.length - 1, currentImageIndex + 1))}
                  disabled={currentImageIndex === surprise.mediaUrl.length - 1}
                >
                  Siguiente
                </Button>
              </div>
            )}
          </div>
        );

      case 'video':
        return (
          <div className="space-y-4">
            <video
              src={surprise.mediaUrl}
              poster={surprise.poster}
              controls
              className="w-full h-auto rounded-lg shadow-lg"
            >
              Tu navegador no soporta el elemento de video.
            </video>
            {surprise.message && (
              <p className="text-foreground/90 text-center italic">
                {surprise.message}
              </p>
            )}
          </div>
        );

      case 'audio':
        return (
          <div className="space-y-4">
            <audio
              src={surprise.mediaUrl}
              controls
              className="w-full"
            >
              Tu navegador no soporta el elemento de audio.
            </audio>
            {surprise.message && (
              <p className="text-foreground/90 text-center">
                {surprise.message}
              </p>
            )}
          </div>
        );

      case 'link':
        return (
          <div className="space-y-4">
            {surprise.message && (
              <p className="text-foreground/90 text-center">
                {surprise.message}
              </p>
            )}
            <Button
              asChild
              size="lg"
              className="w-full gap-2"
            >
              <a
                href={surprise.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {surprise.ctaText}
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle className="text-2xl font-bold text-center mb-4 flex items-center justify-center gap-2">
          <span className="text-primary">Día {day}</span>
          <span>•</span>
          <span>{surprise.title}</span>
        </DialogTitle>

        <div className="mt-4">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
