import React from "react";
import "./style.css";

const EndCall = ({ callAccepted, callEnded, leaveCall }) => {
  return (
    <>
      {callAccepted && !callEnded && (
        <button className="leave-call" onClick={leaveCall}>
          <i className="fas fa-phone-slash"></i>
        </button>
      )}
    </>
  );
};

export default EndCall;
