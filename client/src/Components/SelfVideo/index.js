import Video from "Components/Video";
import React from "react";
import "./style.css";

const SelfVideo = ({ stream, myVideo, callAccepted, callEnded, leaveCall }) => {
  const toggleMinimize = () => {
    const ele = document.querySelector(".self-video-div");
    if (ele) {
      ele.classList.toggle("hide");
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
