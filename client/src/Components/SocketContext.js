import { createContext, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";
const SocketContext = createContext();

const socket = io(process.env.REACT_APP_BACKEND_URL);

const ContextProvider = ({ children }) => {
  const [stream, setstream] = useState(null);
  const [myId, setmyId] = useState("");
  const [call, setcall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [callRejected, setCallRejected] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const initiate = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Browser not supported");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setstream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    socket.on("me", (id) => setmyId(id));

    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setcall({
        isReceivedCall: true,
        from,
        name: callerName,
        signal,
      });
    });
  };

  useEffect(initiate, []);

  const answercall = () => {
    setCallAccepted(true);
    setcall({
      ...call,
      isReceivedCall: false,
    });
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const rejectCall = () => {
    console.log(`rejectCall`);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      setcall({});
      socket.emit("rejectcall", { signal: data, to: call.from });
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id, name) => {
    setCallRejected(false);
    setCallEnded(false);
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userTocall: id,
        signalData: data,
        from: myId,
        name,
      });
    });

    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);
      peer.on("stream", (currentStream) => {
        userVideo.current.srcObject = currentStream;
      });
      peer.signal(signal);
    });

    socket.on("callrejected", (signal) => {
      setCallRejected(true);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.href = window.location.origin;
  };

  return (
    <SocketContext.Provider
      value={{
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
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, ContextProvider };
