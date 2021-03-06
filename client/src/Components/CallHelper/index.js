import React from "react";

const CallHelper = ({ answercall, rejectCall, call, setshowMakeCallModal }) => {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center h-100 w-100">
        {!call.isReceivedCall && (
          <>
            <div className="call-status text-6">Call is not connected</div>
            <div className="">
              <button
                className="primary"
                onClick={() => setshowMakeCallModal(true)}
              >
                <i className="far fa-plus-square"></i>Click to Join or Create
              </button>
            </div>
          </>
        )}
        {call.isReceivedCall && (
          <div className="d-flex justify-content-center align-items-center flex-column mt-4">
            <h4>{call.name}</h4>
            <div className="d-flex mt-2">
              <button className="primary mx-2" onClick={answercall}>
                <i className="fas fa-phone-volume"></i>Answer
              </button>
              <button className="primary mx-2 reject-call" onClick={rejectCall}>
                <i className="fas fa-phone-slash"></i>
                Reject
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CallHelper;
