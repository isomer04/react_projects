import React, { useState } from "react";

function PostForm({ handleCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const post = {
      title,
      content,
      image_url: imageUrl,
      comments: comments,
    };
    handleCreate(post);
    setTitle("");
    setContent("");
    setImageUrl("");
    setComments([]);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      />
            <br />

      <label htmlFor="image-url">Image URL:</label>
      <input
        type="url"
        id="image-url"
        value={imageUrl}
        onChange={(event) => setImageUrl(event.target.value)}
      />
            <br />

      <label htmlFor="comment">Comment:</label>
      <textarea
        id="comment"
        value={comments.length > 0 ? comments[0].text : ""}
        onChange={(event) => setComments([{text: event.target.value}])}
      />
            <br />

      <button type="submit">Create Post</button>
    </form>
  );
}

export default PostForm;
