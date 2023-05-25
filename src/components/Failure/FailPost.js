import React from "react";
import "./FailPost.css";
import { FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const FailPost = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <div className="failed">
      <FaTimes className="checkIcon" />
      <h2 className="h1failed">{data.message}</h2>
    </div>
  );
};

export default FailPost;
