import CallHelper from "Components/CallHelper";
import CallHelperModal from "Components/CallHelperModal";
import EndCall from "Components/EndCall";
import SelfVideo from "Components/SelfVideo";
import useAudio from "Components/useAudio";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketContext } from "./Components/SocketContext";
import UserVideo from "./Components/UserVideo";

function App() {
  const {
    stream,
    myId,
    call,
    callAccepted,
    callEnded,
    callRejected,
    myVideo,
    userVideo,
    answercall,
    rejectCall,
    callUser,
    leaveCall,
  } = useContext(SocketContext);

  const { audio, playAudio, stopAudio } = useAudio();

  const [showMakeCallModal, setshowMakeCallModal] = useState(false);
  const [clientId, setclientId] = useState("");

  const getIdFromUrl = () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("id");
    } catch {
      return false;
    }
  };

  const Initiate = () => {
    const Id = getIdFromUrl();
    if (Id) {
      setclientId(Id);
      setshowMakeCallModal(true);
    }
  };

  useEffect(Initiate, []);

  const onAnswerCall = () => {
    stopAudio(audio);
    answercall();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="h-screen w-screen overflow-hidden position-relative">
        {callAccepted && !callEnded ? (
          <UserVideo userVideo={userVideo} />
        ) : (
          <CallHelper
            callAccepted={callAccepted}
            answercall={onAnswerCall}
            rejectCall={rejectCall}
            callRejected={callRejected}
            call={call}
            setshowMakeCallModal={setshowMakeCallModal}
            audio={audio}
            playAudio={playAudio}
            stopAudio={stopAudio}
          />
        )}
        <SelfVideo
          stream={stream}
          myVideo={myVideo}
          callAccepted={callAccepted}
          callEnded={callEnded}
          leaveCall={leaveCall}
        />
        <EndCall
          callAccepted={callAccepted}
          callEnded={callEnded}
          leaveCall={leaveCall}
        />
      </div>
      <CallHelperModal
        open={showMakeCallModal}
        setOpen={setshowMakeCallModal}
        userId={myId}
        callUser={callUser}
        clientId={clientId}
        callRejected={callRejected}
        callAccepted={callAccepted}
      />
    </>
  );
}

export default App;
