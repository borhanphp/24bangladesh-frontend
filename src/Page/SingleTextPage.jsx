import React from "react";

function SingleTextPage({ data }) {
  return (
    <div className="my-4 container">
      <h3 className="my-5 fw-bold">{data?.title}</h3>
      <div
        className="my-3 open-window "
        dangerouslySetInnerHTML={{
          __html: data?.details,
        }}
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      />
    </div>
  );
}

export default SingleTextPage;
