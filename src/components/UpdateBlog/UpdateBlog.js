import React, { useState, useEffect } from "react";
import "./UpdateBlog.scss";
import { updateProduct, getThisBlog } from "../apicalls";
import { isAuthenticated } from "../index";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state.detail;
  const blogId = blog._id;

  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    content: "",
    photo: null,
    error: "",
    success: false,
  });

  const { content, photo, error, success } = values;

  useEffect(() => {
    preload(blogId);
  }, [blogId]);

  const preload = (blogId) => {
    getThisBlog(blogId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          content: data.content,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "" });

    const formData = new FormData();
    formData.set("content", content);
    if (photo) {
      formData.set("photo", photo);
    }

    updateProduct(blogId, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          content: "",
          photo: null,
          success: true,
        });
      }
    });
  };

  return (
    <div className="postPick">
      <div className="textPost">
        <div className="upperInfo">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
            placeholder="choose a file"
            className="inpChoose"
            id="file"
          />
          <label htmlFor="file" className="btn-1">
            Upload file
          </label>
        </div>
        <textarea
          className="content"
          type="text"
          value={content}
          onChange={handleChange("content")}
        ></textarea>
        <button className="submitPost" type="submit" onClick={onSubmit}>
          SUBMIT
        </button>
        {error && <p className="error-message">{error}</p>}
        {success && navigate("/successUpdate")}
      </div>
    </div>
  );
};

export default UpdateBlog;
