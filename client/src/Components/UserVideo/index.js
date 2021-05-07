import Video from "Components/Video";
import React, { useState } from "react";
import Modal from "Components/Modal";
import CopyToClipboard from "react-copy-to-clipboard";

import "./style.css";

const UserVideo = ({
  callAccepted,
  callEnded,
  callUser,
  answercall,
  userVideo,
  userId,
  call,
}) => {
  const [openJoinCreateModal, setOpenJoinCreateModal] = useState(false);

  const onMakeCall = (e) => {
    e.preventDefault();
    const clientId = e.target.clientId.value;
    const Name = e.target.name.value;
    callUser(clientId, Name);
    setOpenJoinCreateModal(false);
    window.location.search = "";
  };
  return (
    <>
      <div className="user-video-div h-100 w-100 d-flex justify-content-center align-items-center">
        {callAccepted && !callEnded ? (
          <Video
            componentRef={userVideo}
            autoPlay
            playsInline
            className="user-video"
          />
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="call-status text-6">Call is not connected</div>
            <div className="">
              <button
                className="primary"
                onClick={() => setOpenJoinCreateModal(true)}
              >
                <i className="far fa-plus-square"></i>Click to Join or Create
              </button>
            </div>

            {call.isReceivedCall && !callAccepted && (
              <div className="d-flex justify-content-center align-items-center flex-column mt-4">
                <h4>Incoming call from {call.name}</h4>
                <button className="primary" onClick={answercall}>
                  <i className="fas fa-phone-volume"></i>Answer
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <Modal
        open={openJoinCreateModal}
        setOpen={setOpenJoinCreateModal}
        modalClass="join-create-modal"
      >
        <>
          <div className="create-link d-flex justify-content-center align-items-center flex-column">
            <h4>Share joining link</h4>
            <CopyToClipboard
              text={`${process.env.REACT_APP_FRONTEND_URL}?id=${userId}`}
            >
              <button className="primary">
                <i className="fa fa-clipboard" aria-hidden="true"></i>
                Copy joining link
              </button>
            </CopyToClipboard>
          </div>
          <hr />
          <div className="join-link">
            <form
              onSubmit={onMakeCall}
              method="post"
              className="d-flex justify-content-center align-items-center flex-column"
            >
              <h4>Call using id</h4>
              <label htmlFor="Enter Id"></label>
              <input
                id="Enter Id"
                type="text"
                placeholder="Enter id"
                name="clientId"
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
        </>
      </Modal>
    </>
  );
};

export default UserVideo;
