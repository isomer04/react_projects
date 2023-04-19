import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Post = ({ posts, updatePost, deletePost }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({});

  useEffect(() => {
    const currentPost = posts.find(p => p.id === id);
    if (currentPost) {
      setPost(currentPost);
    } else {
      // navigate('/');
    }
  }, [id, posts, navigate]);

  const handleUpvote = () => {
    const updatedPost = { ...post, upvotes: post.upvotes + 1 };
    updatePost(updatedPost);
    setPost(updatedPost);
  }

  const handleDelete = () => {
    deletePost(post.id);
    navigate('/');
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>Posted on: {new Date(post.created_at).toLocaleString()}</p>
      <p>Upvotes: {post.upvotes}</p>
      <button onClick={handleUpvote}>Upvote</button>
      <hr />
      <p>{post.content}</p>
      {post.image_url && <img src={post.image_url} alt={post.title} />}
      <hr />
      <h3>Comments</h3>
      <ul>
        {post.comments && post.comments.map(comment => (
          <li key={comment.id}>
            <p>{comment.text}</p>
            <p>Commented by: {comment.author}</p>
          </li>
        ))}
      </ul>
      <hr />
      <button onClick={handleDelete}>Delete Post</button>
    </div>
  );
}

export default Post;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const Post = ({ posts, updatePost, deletePost }) => {
//   const { id } = useParams();
//   const history = useNavigate();

//   const [post, setPost] = useState({});

//   useEffect(() => {
//     const currentPost = posts.find(p => p.id === id);
//     if (currentPost) {
//       setPost(currentPost);
//     } else {
//       history.push('/');
//     }
//   }, [id, posts, history]);

//   const handleUpvote = () => {
//     const updatedPost = { ...post, upvotes: post.upvotes + 1 };
//     updatePost(updatedPost);
//     setPost(updatedPost);
//   }

//   const handleDelete = () => {
//     deletePost(post.id);
//     history.push('/');
//   }

//   return (
//     <div>
//       <h2>{post.title}</h2>
//       <p>Posted on: {new Date(post.created_at).toLocaleString()}</p>
//       <p>Upvotes: {post.upvotes}</p>
//       <button onClick={handleUpvote}>Upvote</button>
//       <hr />
//       <p>{post.content}</p>
//       {post.image_url && <img src={post.image_url} alt={post.title} />}
//       <hr />
//       <h3>Comments</h3>
//       <ul>
//         {post.comments && post.comments.map(comment => (
//           <li key={comment.id}>
//             <p>{comment.text}</p>
//             <p>Commented by: {comment.author}</p>
//           </li>
//         ))}
//       </ul>
//       <hr />
//       <button onClick={handleDelete}>Delete Post</button>
//     </div>
//   );
// }

// export default Post;

// import React from 'react';
// import { Link } from 'react-router-dom';

// function Post({ post, handleUpvote }) {
//   return (
//     <div className="post">
//       <div className="post-upvotes">
//         <button onClick={() => handleUpvote(post.id)}>
//           {post.upvotes} Upvotes
//         </button>
//       </div>
//       <div className="post-content">
//         <h3>
//           <Link to={`/posts/${post.id}`}>{post.title}</Link>
//         </h3>
//         <p>{post.content}</p>
//         {post.image_url && <img src={post.image_url} alt={post.title} />}
//       </div>
//     </div>
//   );
// }

// export default Post;
