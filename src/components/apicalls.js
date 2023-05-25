import { API } from "../backend";

export const createBlog = (userId, token, blog) => {
  return fetch(`${API}/blogs/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("err"));
};

//done
export const showAllBlogs = () => {
  return fetch(`${API}/blogs`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//done
export const getThisBlog = (blogId, token) => {
  const blogID = blogId;
  return fetch(`${API}/blog/${blogID}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//done
export const getMyBlogs = (userId, token) => {
  return fetch(`${API}/blogs/all/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUsersBlogs = (userId) => {
  return fetch(`${API}/blogs/all/${userId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUser = (userId) => {
  return fetch(`${API}/user/${userId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteBlog = (userId, blogId, token) => {
  return fetch(`${API}/blogs/remove/${userId}/${blogId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const getAllBlogsByUser = (userId) => {
  return fetch(`${API}/blogs/all/${userId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const updateProduct = (blogId, userId, token, blog) => {
  return fetch(`${API}/blogs/update/${userId}/${blogId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const likePost = (userId, blogId, token) => {
  return fetch(`${API}/like/${userId}/${blogId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const commentOnPost = (userId, blogId, commentText, token) => {
  return fetch(`${API}/comment/${userId}/${blogId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content: commentText }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllComments = (blogId) => {
  return fetch(`${API}/comments/${blogId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteComment = (userId, commentId, token) => {
  return fetch(`${API}/comment/${userId}/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("reis ", response);
      return response.json();
    })
    .then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        return data; // Return the data here
      }
    })
    .catch((err) => console.log(err));
};

export const deleteLike = (likeId) => {
  return fetch(`${API}/likes/delete/${likeId}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getLike = (userId, blogId) => {
  return fetch(`${API}/like/${userId}/${blogId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const totalLikes = (blogId) => {
  return fetch(`${API}/likes/${blogId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
