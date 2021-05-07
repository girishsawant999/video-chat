import Video from "Components/Video";
import React from "react";
import "./style.css";

const SelfVideo = ({ stream, myVideo, callAccepted, callEnded, leaveCall }) => {
  const minimizeVideo = () => {
    const ele = document.querySelector(".self-video-div");
    if (ele) {
      ele.classList.add("hide");
    }
  };
  const expandVideo = () => {
    const ele = document.querySelector(".self-video-div");
    if (ele) {
      ele.classList.remove("hide");
    }
  };

  return (
    <>
      <div className="self-video-div position-absolute">
        <div className="h-100 w-100 position-relative">
          <span
            className="position-absolute minimize-button"
            onClick={minimizeVideo}
          >
            <i className="fas fa-compress-arrows-alt"></i>
          </span>
          <span
            className="position-absolute expand-button"
            onClick={expandVideo}
          >
            <i className="fas fa-expand-arrows-alt"></i>
          </span>
          {stream && (
            <Video
              componentRef={myVideo}
              muted
              autoPlay
              playsInline
              className="self-video"
            />
          )}
          <div></div>
        </div>
      </div>
    </>
  );
};

export default SelfVideo;
