import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
    const updatedPost = {
      ...post,
      comments: [...post.comments, { text: comment }],
    };
    updatePost(updatedPost);
    setPost(updatedPost);
    setComment("");
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>Posted on: {new Date(post.created_at).toLocaleString()}</p>
      <p>Upvotes: {post.upvotes}</p>
     
      <hr />
      <p>{post.content}</p>
      {post.image_url && <img src={post.image_url} alt={post.title} />}
      <hr />

      <button onClick={handleUpvote}>Upvote</button>
      <button onClick={() => setShowEditForm(true)}>Edit Post</button>

      <button onClick={handleDelete}>Delete Post</button>
      <hr />
      {showEditForm && (
        <>
          <h3>Edit Post</h3>
          <form onSubmit={handleUpdate}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
            <label htmlFor="image-url">Image URL:</label>
            <input
              type="url"
              id="image-url"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
            />
            <button type="submit">Update Post</button>
            <button onClick={() => setShowEditForm(false)}>Cancel</button>
          </form>
          <hr />
        </>
      )}
      <h3>Comments</h3>
      <ul>
        {post.comments &&
          post.comments.map((comment, index) => {
            const jsonString = comment;
            const commentObj = JSON.parse(jsonString);
            return (
              <li key={index}>
                <p>{commentObj.text}</p>
              </li>
            );
          })}
      </ul>
      <form onSubmit={handleComment}>
        <label htmlFor="comment">Add a comment:</label>
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
