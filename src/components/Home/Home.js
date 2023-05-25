import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../index";
import { showAllBlogs } from "../apicalls";
import ImageHelper from "../helper/imageHelper";
import "./Home.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const preload = () => {
    showAllBlogs().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <div className="home__container">
      {blogs.length !== 0 ? (
        <div className="home__grid">
          {blogs.map((blog, index) => (
            <div className="home__card">
              <a key={index} href={`/details/${blog._id}`}>
                <ImageHelper card={blog} class="bgphoto"></ImageHelper>
                <div className="home__content">
                  {truncate(blog.content, 50)}
                </div>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1>Nothing to show</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
