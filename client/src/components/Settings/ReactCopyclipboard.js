import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
const ReactCopyclipboard = ({ onelement, setAlert }) => {
  return (
    <div>
      <CopyToClipboard
        text={onelement}
        onCopy={() => {
          setAlert("copied", "success");
        }}
      >
        <button className="copy-button">Copier</button>
      </CopyToClipboard>
    </div>
  );
};

export default connect(null, { setAlert })(ReactCopyclipboard);
