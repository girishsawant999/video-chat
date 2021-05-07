import Violin from "Assets/tones/Violin.mp3";

const useAudio = () => {
  const audio = new Audio(Violin);

  const playAudio = (_tone) => {
    _tone.play();
  };
  const stopAudio = (_tone) => {
    _tone.pause();
    _tone.currentTime = 0;
  };
  return {
    audio,
    playAudio,
    stopAudio,
  };
};

export default useAudio;
