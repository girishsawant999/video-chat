import useAudio from "Components/useAudio";
import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Peer from "simple-peer";
import { io } from "socket.io-client";

const SocketContext = createContext();

const socket = io(
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/"
);

const ContextProvider = ({ children }) => {
  const { playAudio, stopAudio } = useAudio();

  const [stream, setstream] = useState(null);
  const [myId, setmyId] = useState("");
  const [call, setcall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [callRejected, setCallRejected] = useState(false);
  const [localStreamConstraints, setlocalStreamConstraints] = useState({
    audio: false,
    video: false,
  });

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    if (!stream || !myVideo) return;
    stream.getAudioTracks().forEach((track) => (track.enabled = false));
    stream.getVideoTracks().forEach((track) => (track.enabled = false));
    if (localStreamConstraints.audio) {
      stream.getAudioTracks().forEach((track) => (track.enabled = true));
    }
    if (localStreamConstraints.video) {
      stream.getVideoTracks().forEach((track) => (track.enabled = true));
    }
    myVideo.current.srcObject = stream;
    return () => {};
  }, [localStreamConstraints, stream]);

  const setLocalVideoStream = () => {
    const constraints = {
      video: true,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      },
    };
    navigator.mediaDevices.getUserMedia(constraints).then((currentStream) => {
      setstream(currentStream);
    });
  };

  const initiate = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Browser not supported");
      return;
    }

    setLocalVideoStream();
    socket.on("me", (id) => setmyId(id));

    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setcall({
        isReceivedCall: true,
        from,
        name: callerName,
        signal,
      });
      toast(`???? Incoming call`);
      playAudio();
    });
  };

  useEffect(initiate, [playAudio]);

  const answercall = () => {
    setCallAccepted(true);
    stopAudio();
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
    stopAudio();
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
        localStreamConstraints,
        setlocalStreamConstraints,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, ContextProvider };
