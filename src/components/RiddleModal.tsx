import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  riddles,
  addFailedAttempt,
  markAsSolved,
  logAnswer,
  type Riddle,
} from "@/lib/riddles";

interface RiddleModalProps {
  day: number;
  isOpen: boolean;
  onClose: () => void;
  onSolved: () => void;
}

export function RiddleModal({
  day,
  isOpen,
  onClose,
  onSolved,
}: RiddleModalProps) {
  const riddle = riddles[day] as Riddle;
  const [answer, setAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSubmit = () => {
    let isCorrect = false;
    let submittedAnswer = "";

    if (riddle.type === "text") {
      submittedAnswer = answer.trim();
      isCorrect =
        submittedAnswer.toLowerCase() === riddle.answer?.toLowerCase();
    } else if (riddle.type === "multiple-choice") {
      submittedAnswer = riddle.options?.[selectedOption ?? -1] ?? "";
      isCorrect = selectedOption === riddle.correctOption;
    }

    logAnswer(day, submittedAnswer, isCorrect);

    if (isCorrect) {
      markAsSolved(day);
      onSolved();
      onClose();
    } else {
      addFailedAttempt(day);
      onClose();
    }

    setAnswer("");
    setSelectedOption(null);
  };

  if (!riddle) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-md border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            Acertijo del Día {day}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <p className="text-lg text-center text-foreground/90">
            {riddle.question}
          </p>

          {riddle.type === "text" && (
            <div className="space-y-3">
              <Input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Escribe tu respuesta..."
                className="text-center"
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
          )}

          {riddle.type === "multiple-choice" && (
            <div className="space-y-3">
              {riddle.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedOption === index ? "default" : "outline"}
                  className="w-full text-base py-6"
                  onClick={() => setSelectedOption(index)}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}

          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={
              (riddle.type === "text" && !answer.trim()) ||
              (riddle.type === "multiple-choice" && selectedOption === null)
            }
          >
            Comprobar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
