import EndCall from "Components/EndCall";
import ModalCustom from "Components/Modal";
import SelfVideo from "Components/SelfVideo";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "./Components/SocketContext";
import UserVideo from "./Components/UserVideo";

function App() {
  const {
    stream,
    myId,
    call,
    callAccepted,
    callEnded,
    myVideo,
    userVideo,
    answercall,
    callUser,
    leaveCall,
  } = useContext(SocketContext);

  const [showMakeCallModal, setshowMakeCallModal] = useState(false);

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
      setshowMakeCallModal(true);
    }
  };

  useEffect(Initiate, []);

  const onMakeCall = (e) => {
    e.preventDefault();
    const clientId = e.target.clientId.value;
    const Name = e.target.name.value;
    callUser(clientId, Name);
    setshowMakeCallModal(false);
  };

  return (
    <div className="h-screen w-screen overflow-hidden position-relative">
      <UserVideo
        callAccepted={callAccepted}
        callEnded={callEnded}
        callUser={callUser}
        answercall={answercall}
        userVideo={userVideo}
        userId={myId}
        call={call}
      />
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
      <ModalCustom open={showMakeCallModal} setOpen={setshowMakeCallModal}>
        <div className="join-link">
          <form
            onSubmit={onMakeCall}
            method="post"
            className="d-flex justify-content-center align-items-center flex-column"
          >
            <label htmlFor="Enter Id"></label>
            <input
              id="Enter Id"
              type="text"
              placeholder="Enter id"
              name="clientId"
              value={getIdFromUrl()}
              readOnly
              required
            />
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              required
            />
            <button type="submit" className="primary mt-2">
              <i className="fas fa-plus"></i>Make a call
            </button>
          </form>
        </div>
      </ModalCustom>
    </div>
  );
}

export default App;
