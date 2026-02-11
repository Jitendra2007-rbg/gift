import { useState, useEffect } from 'react';

export const useTypingEffect = (text: string, speed: number = 50, startDelay: number = 0) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let i = 0;
    let timeoutId: number;
    let intervalId: number;

    setDisplayedText("");
    
    timeoutId = window.setTimeout(() => {
      setIsTyping(true);
      intervalId = window.setInterval(() => {
        setDisplayedText((prev) => {
          const nextText = text.substring(0, i + 1);
          i++;
          if (i >= text.length) {
            clearInterval(intervalId);
            setIsTyping(false);
          }
          return nextText;
        });
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayedText, isTyping };
};
