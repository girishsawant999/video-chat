import Video from "Components/Video";
import React from "react";
import "./style.css";

const UserVideo = ({ userVideo }) => {
  return (
    <>
      <div className="user-video-div h-100 w-100 d-flex justify-content-center align-items-center">
        <Video
          componentRef={userVideo}
          autoPlay
          playsInline
          className="user-video"
        />
      </div>
    </>
  );
};

export default UserVideo;
