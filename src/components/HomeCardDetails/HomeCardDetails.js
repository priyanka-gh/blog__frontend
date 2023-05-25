import React, { useEffect, useState } from "react";
import "./HomeCardDetails.css";
import {
  getThisBlog,
  likePost,
  totalLikes,
  getLike,
  deleteLike,
  commentOnPost,
  getUser,
  deleteComment,
  getAllComments,
} from "../apicalls";
import { isAuthenticated } from "../index";
import { BsFillHeartFill } from "react-icons/bs";
import ImageHelper from "../helper/imageHelper";
import { useParams } from "react-router-dom";

const HomeCardDetails = () => {
  const [blogs, setBlogs] = useState([]);
  const [likes, setLikes] = useState(0);
  const [color, setColor] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const { user, token } = isAuthenticated();
  const [myLike, setmyLike] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    isAuthenticated() ? setLoggedIn(true) : setLoggedIn(false);
  }, []);

  const blogId = useParams();

  const preload = () => {
    getThisBlog(blogId.blogId, token).then((data) => {
      if (data.error) {
        console.log("Got error in get blog ");
      } else {
        setBlogs(data);
      }
    });
  };

  useEffect(() => {
    preload();
    getLikes(blogId.blogId);
    getComments(blogId.blogId);
  }, [blogId]);

  useEffect(() => {
    getThisLike(user ? user._id : "", blogId.blogId);
  }, [likes]);

  const getLikes = (blogId) => {
    totalLikes(blogId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLikes(data);
      }
    });
  };

  const getComments = (blogId) => {
    getAllComments(blogId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setComments(data);
      }
    });
  };
  const deleteThisComment = (userId, commentId) => {
    deleteComment(userId, commentId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        getComments(blogId.blogId);
      }
    });
  };

  const deleteThisLike = (likeId) => {
    deleteLike(likeId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        getLikes(blogId.blogId); // Re-fetch likes after deletion
      }
    });
  };

  const delLike = (userId, blogId) => {
    getLike(userId, blogId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        deleteThisLike(data[0]._id);
      }
    });
  };

  const getThisLike = (userId, blogId) => {
    getLike(userId, blogId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setmyLike(data.length);
      }
    });
  };

  var likeThisPost = (userId, blogId) => {
    likePost(userId, blogId, token).then((data) => {
      if (!loggedIn) {
        setTimeout(function () {
          window.location.href = "/login";
        });
      }
      if (data.error) {
        delLike(userId, blogId);
        setColor(0);
      } else {
        getLikes(blogId); // Fetch updated likes count
        setColor(1);
      }
    });
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() === "") {
      return; // Don't submit empty comments
    }
    commentOnPost(user._id, blogId.blogId, commentText, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCommentText(""); // Clear comment text field after submission
        getComments(blogId.blogId); // Refresh comments
      }
    });
  };

  return (
    <div className="insideDetailsCard">
      <div className="detOne">
        <ImageHelper card={blogs}></ImageHelper>
        <div className="detContent">
          <h5>{blogs ? blogs.content : ""}</h5>
        </div>
        {color === 1 || myLike > 0 ? (
          <div>
            <h4>
              <BsFillHeartFill
                className="likeIcon"
                color="red"
                onClick={() => likeThisPost(user?._id || "", blogs._id)}
              />
              <span>{likes} likes</span>
            </h4>
          </div>
        ) : (
          <h4>
            <BsFillHeartFill
              className="likeIcon"
              stroke="black"
              strokeWidth="0.2"
              color="white"
              onClick={() => likeThisPost(user?._id || "", blogs._id)}
            />
            <span>{likes} likes</span>
          </h4>
        )}
      </div>

      <div className="detTwo">
        <h4>Comments</h4>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Comment on post..."
            value={commentText}
            className="inpComment"
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <h4>{comment.userName}</h4>
            <h5>{truncate(comment.content, 500)}</h5>
            {comment.user === user?._id && (
              <button
                className="btn"
                onClick={() => deleteThisComment(user._id, comment._id)}
              >
                Delete Comment
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCardDetails;
