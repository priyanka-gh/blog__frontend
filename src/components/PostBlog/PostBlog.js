import React, { useState } from "react";
import "./PostBlog.scss";
import { createBlog } from "../apicalls";
import { isAuthenticated } from "../index";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Post = () => {
  const url = window.location.href;
  const navigate = useNavigate();
  const { user, token } = isAuthenticated();
  const [createdBlogUrl, setCreatedBlogUrl] = useState("");

  const [values, setValues] = useState({
    content: "",
    photo: "",
    author: "",
    // success: false,
  });

  const { content, photo, author, success } = values;

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    console.log("trrr");
    event.preventDefault();
    const formData = new FormData();
    formData.set("content", content);
    formData.set("author", user._id);
    formData.append("photo", photo);

    setValues({ ...values, error: "" });
    createBlog(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        setTimeout(function () {
          navigate("/failPost", { state: { message: data.error } });
        }, 1000);
      } else {
        setValues({
          ...values,
          content: "",
          photo: "",
          createdBlog: data.name,
          // success: true,
        });
        const createdBlogUrl = `/details/${data._id}`;
        navigate("/successPost", { state: { createdBlogUrl } });
      }
    });
  };

  return (
    <div className="postPick">
      <div className="textPost">
        <div className="upperInfo">
          {/* <div className="select"></div> */}
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
            className="inpChoose"
            id="file"
          />
          <label htmlFor="file" className="btn-1">
            Upload File
          </label>
        </div>
        <textarea
          className="content"
          type="text"
          onChange={handleChange("content")}
        ></textarea>
        <button className="submitPost" type="submit" onClick={onSubmit}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default Post;
