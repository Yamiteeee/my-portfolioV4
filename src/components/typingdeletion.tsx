import React, { useState, useEffect } from 'react';

interface RetypingWordProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function RetypingWord({
  words,
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseDuration = 2000,
}: RetypingWordProps) {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullWord = words[currentWordIdx];

    if (!isDeleting) {
      // Typing Phase
      if (currentText !== fullWord) {
        timer = setTimeout(() => {
          setCurrentText(fullWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Full word reached, pause before deleting
        timer = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    } else {
      // Deleting Phase
      if (currentText !== '') {
        timer = setTimeout(() => {
          setCurrentText(fullWord.slice(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        // Fully cleared, move to the next word entry
        setIsDeleting(false);
        setCurrentWordIdx((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIdx, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="relative">
      {currentText}
      {/* Editorial Blinking Accent Cursor */}
      <span className="animate-pulse bg-zinc-400 ml-0.5 inline-block w-[3px] h-[0.8em] align-middle" />
    </span>
  );
}