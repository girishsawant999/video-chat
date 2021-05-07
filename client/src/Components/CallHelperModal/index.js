import Modal from "Components/Modal";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";

const CallHelperModal = ({
  open,
  setOpen,
  userId,
  callUser,
  callRejected,
  callAccepted,
  clientId = "",
}) => {
  const [callingStatus, setCallingStatus] = useState(false);

  const onMakeCall = (e) => {
    e.preventDefault();
    setCallingStatus(true);
    const clientId = e.target.clientId.value;
    const Name = e.target.name.value;
    callUser(clientId, Name);
  };

  const onCopyLink = (e) => {
    toast("📝 Join link copied");
    setOpen(false);
  };

  useEffect(() => {
    if (callRejected) {
      toast(`😡 Call Rejected`);
      setCallingStatus(false);
    }
  }, [callRejected]);

  useEffect(() => {
    if (callAccepted) {
      setOpen(false);
    }
  }, [callAccepted, setOpen]);

  useEffect(() => {
    if (!open) {
      setCallingStatus(open);
    }
  }, [open]);

  return (
    <>
      <Modal open={open} setOpen={setOpen}>
        <>
          {!clientId && (
            <>
              <div className="create-link d-flex justify-content-center align-items-center flex-column">
                <h4>Share joining link</h4>
                <CopyToClipboard
                  text={`${
                    process.env.REACT_APP_FRONTEND_URL ||
                    "http://localhost:3000"
                  }?id=${userId}`}
                >
                  <button className="primary" onClick={onCopyLink}>
                    <i className="fa fa-clipboard" aria-hidden="true"></i>
                    Copy joining link
                  </button>
                </CopyToClipboard>
              </div>
              <hr />
            </>
          )}
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
                defaultValue={clientId}
                readOnly={clientId}
                required
              />
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                required
              />

              {callingStatus ? (
                <button disabled className="primary mt-2">
                  <i className="fas fa-yin-yang fa-spin"></i>Caling
                </button>
              ) : (
                <button type="submit" className="primary mt-2">
                  <i className="fas fa-phone-alt"></i>Make a call
                </button>
              )}
            </form>
          </div>
        </>
      </Modal>
    </>
  );
};

export default CallHelperModal;
