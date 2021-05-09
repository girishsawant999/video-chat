import Violin from "Assets/tones/Violin.mp3";
import { useRef } from "react";

const useAudio = () => {
  const audio = useRef(new Audio(Violin));
  const playAudio = () => {
    audio.current.play();
  };
  const stopAudio = () => {
    audio.current.pause();
    audio.current.currentTime = 0;
  };
  return {
    playAudio,
    stopAudio,
  };
};

export default useAudio;
