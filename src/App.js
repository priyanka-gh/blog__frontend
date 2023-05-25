import logo from "./logo.svg";
import React, { Suspense, lazy } from "react";
import "./App.css";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import HomeCardDetails from "./components/HomeCardDetails/HomeCardDetails";
import MyAllBlogs from "./components/MyAllBlogs/MyAllBlogs";
import PostBlog from "./components/PostBlog/PostBlog";
import FailPost from "./components/Failure/FailPost";
import SuccessPost from "./components/Success/Posted";
import UpdateBlog from "./components/UpdateBlog/UpdateBlog";
import Updated from "./components/Success/Updated";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details/:blogId" element={<HomeCardDetails />} />
          <Route path="/myAllBlogs" element={<MyAllBlogs />} />
          <Route path="/post" element={<PostBlog />} />
          <Route path="/successPost" element=<SuccessPost /> />
          <Route path="/successUpdate" element=<Updated /> />
          <Route path="/failPost" element=<FailPost /> />
          <Route path="/updateBlog" element=<UpdateBlog /> />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
