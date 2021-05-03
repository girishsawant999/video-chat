import { useContext, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import "./App.css";
import { SocketContext } from "./Components/SocketContext";

function App() {
  const {
    stream,
    myId,
    call,
    callAccepted,
    callEnded,
    name,
    myVideo,
    userVideo,
    setname,
    answercall,
    callUser,
    leaveCall,
  } = useContext(SocketContext);

  const [idToCall, setidToCall] = useState("");

  return (
    <div className="App">
      <div className="user-video-div">
        {callAccepted && !callEnded && (
          <video ref={userVideo} autoPlay playsInline></video>
        )}
      </div>
      <div className="sidebar-div">
        {stream && <video ref={myVideo} muted autoPlay playsInline></video>}
        <div className="functions">
          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setname(e.target.value)}
          />
          <CopyToClipboard text={myId}>
            <button>Copy your Id</button>
          </CopyToClipboard>
          <input
            type="text"
            value={idToCall}
            placeholder="Enter user id"
            onChange={(e) => setidToCall(e.target.value)}
          />
          {callAccepted && !callEnded ? (
            <button onClick={leaveCall}>Leave Call</button>
          ) : (
            <button onClick={() => callUser(idToCall)}>Call</button>
          )}
          {call.isReceivedCall && !callAccepted && (
            <button onClick={answercall}>Answer call from {call.name}</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
