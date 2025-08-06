import ShareIcon from "./ShareIcon";

function LatestTitle(props) {
  return (
    <div className="my-5 latest-title">
      <div className="row">
        <div className="col-sm-6 text-center text-sm-start mb-3">
          <h3>{props.title ? props.title : "আজকের খবর"}</h3>
        </div>
        <div className="col-sm-6 d-flex  mb-3 justify-content-center justify-content-sm-end flex-wrap">
          <div className="share-count text-center me-2">
            {/* <p className="mb-0">
              7.2k <br />
              <span>Shares</span>
            </p> */}
          </div>
          <ShareIcon facebook={true} whatsapp={true} share={true} copy={true} />
        </div>
      </div>
    </div>
  );
}

export default LatestTitle;
