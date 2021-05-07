import Video from "Components/Video";
import React from "react";
import "./style.css";

const SelfVideo = ({
  stream,
  myVideo,
  callAccepted,
  callEnded,
  leaveCall,
  localStreamConstraints,
  setlocalStreamConstraints,
}) => {
  const toggleMinimize = () => {
    const ele = document.querySelector(".self-video-div");
    if (ele) {
      ele.classList.toggle("hide");
    }
  };

  const onClickMic = (e) => {
    const audio = !localStreamConstraints.audio;
    setlocalStreamConstraints({
      ...localStreamConstraints,
      audio,
    });
    const ele = document.querySelector(".mute-button");
    if (audio) {
      ele && ele.classList.add("enabled");
    } else {
      ele && ele.classList.remove("enabled");
    }
  };
  const onCameraClick = (e) => {
    const video = !localStreamConstraints.video;
    setlocalStreamConstraints({
      ...localStreamConstraints,
      video,
    });
    const ele = document.querySelector(".camera-button");
    if (video) {
      ele && ele.classList.add("enabled");
    } else {
      ele && ele.classList.remove("enabled");
    }
  };

  return (
    <>
      <div className="self-video-div position-absolute">
        <div className="h-100 w-100 position-relative">
          <span
            className="position-absolute minimize-button"
            onClick={toggleMinimize}
          >
            <i className="fas fa-expand-alt"></i>
          </span>

          <div className="position-absolute video-functions-buttons">
            <span className="mute-button" onClick={onClickMic}>
              <i className="fas fa-microphone-alt-slash"></i>
            </span>

            <span className="camera-button" onClick={onCameraClick}>
              <i className="fas fa-video-slash"></i>
            </span>
          </div>

          <div className="h-100 w-100 video-div">
            {stream && (
              <Video
                componentRef={myVideo}
                muted
                autoPlay
                playsInline
                className="self-video"
              />
            )}
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default SelfVideo;
