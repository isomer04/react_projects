import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import PostList from "./components/PostList";
import Post from "./components/Post";
import PostForm from "./components/PostForm";
import "./App.css";

const supabaseUrl = "https://ztycxpibtoepsrhyzvbl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0eWN4cGlidG9lcHNyaHl6dmJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2NTQyODcsImV4cCI6MTk5NjIzMDI4N30.6c3IJP0yTKzUN_eygXr9ff5Mb6Sbsnfb_P3DpfSIF1A";
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    let { data: posts, error } = await supabase.from("posts").select("*");
    if (error) console.log("Error fetching posts:", error);
    setPosts(posts);
  };

  const createPost = async (newPost) => {
    let { data: post, error } = await supabase.from("posts").insert(newPost);
    if (error) console.log("Error creating post:", error);
    setPosts([...posts, post]);
  };

  const updatePost = async (updatedPost) => {
    let { data: post, error } = await supabase
      .from("posts")
      .update(updatedPost)
      .match({ id: updatedPost.id });
    if (error) console.log("Error updating post:", error);
    setPosts(posts.map((p) => (p.id === post.id ? post : p)));
  };

  const deletePost = async (postId) => {
    await supabase.from("posts").delete().match({ id: postId });
    setPosts(posts.filter((p) => p.id !== postId));
  };

  return (
    <div className="app">

      <Header />
      <Navigation />
      <Routes>
        <Route path="/">
          {/* <PostList posts={posts} /> */}
        </Route>
        <Route path="/post/:id">
          {/* <Post post={posts} updatePost={updatePost} deletePost={deletePost} /> */}
        </Route>
        <Route path="/create">
          {/* <PostForm createPost={createPost} /> */}
        </Route>
      </Routes>
      <Footer />
      </div>

  );
}

export default App;
