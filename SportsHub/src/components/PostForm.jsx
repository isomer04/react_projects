import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { CardContent, CardHeader, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";

import { LoginContainer } from "./styed";

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
    <Grid container justifyContent={"center"} alignItems="center">
      <Card sx={{ width: 500, padding: "60px" }}>
        <CardHeader style={{ textAlign: "center" }} title="Create  Post" />
        <CardContent>
          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <label htmlFor="title">Title: </label>
            <TextField
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            <br />
            <label htmlFor="content">Content:</label>
            <TextField
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
            <br />

            <label htmlFor="image-url">Image URL:</label>
            <TextField
              type="url"
              id="image-url"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
            />
            <br />

            <label htmlFor="comment">Comment:</label>
            <TextField
              id="comment"
              value={comments.length > 0 ? comments[0].text : ""}
              onChange={(event) => setComments([{ text: event.target.value }])}
            />
            <br />

            <button type="submit">Create Post</button>
          </Box>

          <br />
          <Link to="/">Back to Home</Link>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default PostForm;
