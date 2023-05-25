import React, { useState, useEffect } from "react";
import "./MyAllBlogs.css";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getMyBlogs } from "../apicalls";
import { isAuthenticated } from "../index";
import { deleteBlog } from "../apicalls";
import ImageHelper from "../helper/imageHelper";

const MyAllBlogs = () => {
  let navigate = useNavigate();

  function selectBlog() {
    navigate("/post");
  }

  const [blogs, setBlogs] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getMyBlogs(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  useEffect(() => {
    preload();
  });

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const deleteThisBlog = (blogId) => {
    deleteBlog(user._id, blogId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        window.location.reload();
        setBlogs(data);
      }
    });
  };

  const updateThisBlog = (blog) => {
    navigate("/updateBlog", { state: { detail: blog } });
  };

  return (
    <div className="myAllBlogs">
      <div className="innerClass">
        <button className="createNew" onClick={selectBlog}>
          Create New
        </button>
        {blogs &&
          blogs.map((blog, index) => {
            return (
              <div className="allBlogCard2">
                <div className="myBlogsBody">
                  <div className="my__card">
                    <a key={index} href={`/details/${blog._id}`}>
                      <ImageHelper card={blog} class="bgphoto"></ImageHelper>
                      <div className="card__content">
                        {truncate(blog.content, 50)}
                      </div>
                    </a>
                  </div>
                  <div className="blogIcon">
                    <FaEdit
                      className="editIcon"
                      onClick={function () {
                        updateThisBlog(blog);
                      }}
                    />
                    <RiDeleteBin6Line
                      className="delIcon"
                      onClick={function () {
                        deleteThisBlog(blog._id);
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyAllBlogs;
