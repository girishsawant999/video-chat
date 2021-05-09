import CallHelper from "Components/CallHelper";
import CallHelperModal from "Components/CallHelperModal";
import EndCall from "Components/EndCall";
import SelfVideo from "Components/SelfVideo";
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
    setlocalStreamConstraints,
    localStreamConstraints,
  } = useContext(SocketContext);

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

  useEffect(() => {
    if (!showMakeCallModal && clientId) {
      setclientId("");
    }
  }, [showMakeCallModal, clientId]);

  return (
    <>
      <ToastContainer
        position="top-center"
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
            answercall={answercall}
            rejectCall={rejectCall}
            call={call}
            setshowMakeCallModal={setshowMakeCallModal}
          />
        )}
        <SelfVideo
          stream={stream}
          myVideo={myVideo}
          callAccepted={callAccepted}
          callEnded={callEnded}
          leaveCall={leaveCall}
          setlocalStreamConstraints={setlocalStreamConstraints}
          localStreamConstraints={localStreamConstraints}
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
