import React from "react";
import "./updated.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useLocation } from "react-router-dom";
import { API } from "../../backend";

const Posted = () => {
  const location = useLocation();
  const { createdBlogUrl } = location.state;
  const baseUrl = window.location.origin;
  const link = `${baseUrl}${createdBlogUrl}`;
  return (
    <div className="posted">
      <h2 className="h1Posted">POSTED SUCCESSFULLY!!</h2>
      <CopyToClipboard text={link}>
        <button className="btn">Copy URL</button>
      </CopyToClipboard>
    </div>
  );
};

export default Posted;
