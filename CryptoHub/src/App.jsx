import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import PostList from "./components/PostList";
import Post from "./components/Post";
import PostForm from "./components/PostForm";
import CryptoTracker from "./components/CryptoTracker";
import DetailView from "./routes/DetailView";
import NotFound from "./routes/NotFound";
import About from "./routes/About";
import Contact from "./routes/Contact";
import CryptoNews from "./components/CryptoNews";

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
    let { data: posts, error } = await supabase.from("sportshub").select("*");
    if (error) console.log("Error fetching posts:", error);
    setPosts(posts);
  };

  const handleCreate = async (newPost) => {
    let { data: post, error } = await supabase
      .from("sportshub")
      .insert(newPost);
    if (error) console.log("Error creating post:", error);
    setPosts([...posts, post]);
  };

  const updatePost = async (updatedPost) => {
    const { data: post, error } = await supabase
      .from("sportshub")
      .update(updatedPost)
      .match({ id: updatedPost.id });

    if (error) {
      console.log("Error updating post:", error);
    } else {
      // Check if the post object is null
      if (!post) {
        // throw new Error("Unable to update post: post is null");
      }

      if (post) {
        setPosts(posts.map((p) => (p.id === post.id ? post : p)));
      }
    }
  };

  const deletePost = async (postId) => {
    await supabase.from("sportshub").delete().match({ id: postId });
    setPosts(posts.filter((p) => p.id !== postId));
  };

  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<PostList posts={posts} />} />
        <Route
          path="/post/:id"
          element={
            <Post
              posts={posts}
              updatePost={updatePost}
              deletePost={deletePost}
            />
          }
        />
        <Route
          path="/create"
          element={<PostForm handleCreate={handleCreate} />}
        />

        <Route path="/cryptotracker" element={<CryptoTracker />} />
        <Route
          index={false}
          path="/coinDetails/:symbol"
          element={<DetailView />}
        />

        <Route path="/cryptonews" element={<CryptoNews />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
