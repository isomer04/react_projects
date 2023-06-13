import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

import { Link } from "react-router-dom";

const Post = ({ posts, updatePost, deletePost }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [comment, setComment] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    if (posts.length > 0) {
      const currentPost = posts.find((post) => post.id === parseInt(id));

      if (currentPost) {
        setPost(currentPost);
        setTitle(currentPost.title);
        setContent(currentPost.content);
        setImageUrl(currentPost.image_url);
      } else {
        navigate("/");
      }
    }
  }, [id, posts, navigate]);

  const handleUpvote = () => {
    const updatedPost = { ...post, upvotes: post.upvotes + 1 };
    updatePost(updatedPost);
    setPost(updatedPost);
  };

  const handleDelete = () => {
    deletePost(post.id);
    navigate("/");
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const updatedPost = {
      ...post,
      title,
      content,
      image_url: imageUrl,
    };
    updatePost(updatedPost);
    setPost(updatedPost);
    setShowEditForm(false);
  };

  const handleComment = (event) => {
    event.preventDefault();
    if (!comment) return;
    const updatedComments = [...post.comments, { text: comment }];
    const updatedPost = { ...post, comments: updatedComments };
    updatePost(updatedPost);
    setPost(updatedPost);
    setComment("");
    location.reload();
  };

  return (
    <div>
      <p>Posted on: {new Date(post.created_at).toLocaleString()}</p>

      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <p> 👍 {post.upvotes} Upvotes</p>

      {post.image_url && (
        <img src={post.image_url} width={400} alt={post.title} />
      )}
      <hr />

      <button onClick={handleUpvote}>Upvote</button>
      <button onClick={() => setShowEditForm(true)}>Edit Post</button>

      <button onClick={handleDelete}>Delete Post</button>
      <hr />
      {showEditForm && (
        <>
          <h3>Edit Post</h3>
          <Box
            onSubmit={handleUpdate}
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            <br />
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />{" "}
            <br />
            <label htmlFor="image-url">Image URL:</label>
            <input
              type="url"
              id="image-url"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
            />{" "}
            <br />
            <button type="submit">Update Post</button>
            <button onClick={() => setShowEditForm(false)}>Cancel</button>
          </Box>
          <hr />
        </>
      )}

      <div >
        {/* <div style={{backgroundColor : 'white', color: "black"}}> */}

        <h3 style={{ boxShadow: "0px 0px 25px 0px #fcfcfc" }}>Comments</h3>
        <ul >
          {post.comments &&
            post.comments.map((comment, index) => {
              const jsonString = comment;
              const commentObj = JSON.parse(jsonString);
              return (
                <div key={index}>
                  <p>{commentObj.text}</p>
                </div>
              );
            })}
        </ul>
      </div>

      <form onSubmit={handleComment}>
        <input
          type="text"
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
      <hr />
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Post;
