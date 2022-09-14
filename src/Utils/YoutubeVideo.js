import React from "react";

const YoutubeVideo = (props) => {
  return (
    <iframe
      title={props.id}
      src={props.videoLink}
      style={{ width: "100%", height: props.height ? props.height : "auto" }}
    ></iframe>
  );
};

export default YoutubeVideo;
