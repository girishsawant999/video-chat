import Violin from "Assets/tones/Violin.mp3";
import { useCallback, useRef } from "react";

const useAudio = () => {
  const audio = useRef(new Audio(Violin));

  const playAudio = useCallback(() => audio.current.play(), []);

  const stopAudio = useCallback(() => {
    audio.current.pause();
    audio.current.currentTime = 0;
  }, []);

  return {
    playAudio,
    stopAudio,
  };
};

export default useAudio;
