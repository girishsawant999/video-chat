import React, { useEffect } from "react";

const nullFunction = () => null;
function Video({
  src = null,
  onClick = nullFunction,
  className = "",
  componentRef = null,
  autoPlay = false,
  playsInline = false,
  loop = false,
  muted = false,
  controls = false,
}) {
  useEffect(() => {
    if (!componentRef) return;
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.play();
        } else {
          entry.target.pause();
        }
      });
    }, {});
    observer.observe(componentRef.current);
  }, [componentRef]);

  return (
    <>
      <video
        ref={componentRef}
        onClick={onClick}
        className={className}
        src={src}
        autoPlay={autoPlay}
        playsInline={playsInline}
        loop={loop}
        muted={muted}
        controls={controls}
      />
    </>
  );
}

export default Video;
