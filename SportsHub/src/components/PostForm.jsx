import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { CardContent, CardHeader, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { LoginContainer } from "./styed";


const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_API_KEY = import.meta.env.VITE_APP_CLOUDNARY_API_KEY;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_APP_CLOUDNARY_CLOUD_NAME;

function PostForm({ handleCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [comments, setComments] = useState([]);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("api_key", CLOUDINARY_API_KEY);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    return response.data.secure_url;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let imageUrl = "";
    if (image) {
      imageUrl = await handleImageUpload(image);
    }

    const post = {
      id: Int8Array,
      title,
      content,
      image_url: imageUrl,
      comments: comments,
    };
    handleCreate(post);
    setTitle("");
    setContent("");
    setImage(null);
    setComments([]);
  };

  return (
    <Grid container justifyContent={"center"} alignItems="center">
      <Card sx={{ width: 500, padding: "60px" }}>
        <CardHeader style={{ textAlign: "center" }} title="Create Post" />
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

            <label htmlFor="image-upload">Image Upload:</label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={(event) => setImage(event.target.files[0])}
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

          {console.log(CLOUDINARY_API_KEY + " CLOUDINARY_API_KEY")}

          {console.log(API_KEY + " API_KEY")}

        </CardContent>
      </Card>
    </Grid>
  );
}

export default PostForm;



// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import { CardContent, CardHeader, Grid } from "@mui/material";
// import Card from "@mui/material/Card";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { LoginContainer } from "./styed";

// const CLOUDINARY_UPLOAD_PRESET = "your_upload_preset";
// const CLOUDINARY_API_KEY = "your_api_key";
// const CLOUDINARY_CLOUD_NAME = "your_cloud_name";

// function generateUniqueId() {
//   return Math.random().toString(36).substring(2) + Date.now().toString(36);
// }

// function PostForm({ handleCreate }) {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [image, setImage] = useState(null);
//   const [comments, setComments] = useState([]);

//   const handleImageUpload = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
//     formData.append("api_key", CLOUDINARY_API_KEY);

//     const response = await axios.post(
//       `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
//       formData
//     );

//     return response.data.secure_url;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     let imageUrl = "";
//     if (image) {
//       imageUrl = await handleImageUpload(image);
//     }

//     const post = {
//       id: generateUniqueId(),
//       title,
//       content,
//       image_url: imageUrl,
//       comments: comments,
//     };
//     handleCreate(post);
//     setTitle("");
//     setContent("");
//     setImage(null);
//     setComments([]);
//   };

//   return (
//     <Grid container justifyContent={"center"} alignItems="center">
//       <Card sx={{ width: 500, padding: "60px" }}>
//         <CardHeader style={{ textAlign: "center" }} title="Create Post" />
//         <CardContent>
//           <Box
//             onSubmit={handleSubmit}
//             component="form"
//             sx={{
//               "& > :not(style)": { m: 1, width: "25ch" },
//             }}
//             noValidate
//             autoComplete="off"
//           >
//             <label htmlFor="title">Title: </label>
//             <TextField
//               type="text"
//               id="title"
//               value={title}
//               onChange={(event) => setTitle(event.target.value)}
//               required
//             />
//             <br />
//             <label htmlFor="content">Content:</label>
//             <TextField
//               id="content"
//               value={content}
//               onChange={(event) => setContent(event.target.value)}
//             />
//             <br />

//             <label htmlFor="image-upload">Image Upload:</label>
//             <input
//               type="file"
//               id="image-upload"
//               accept="image/*"
//               onChange={(event) => setImage(event.target.files[0])}
//             />
//             <br />

//             <label htmlFor="comment">Comment:</label>
//             <TextField
//               id="comment"
//               value={comments.length > 0 ? comments[0].text : ""}
//               onChange={(event) => setComments([{ text: event.target.value }])}
//             />
//             <br />

//             <button type="submit">Create Post</button>
//           </Box>

//           <br />
//           <Link to="/">Back to Home</Link>
//         </CardContent>
//       </Card>
//     </Grid>
//   );
// }

// export default PostForm
