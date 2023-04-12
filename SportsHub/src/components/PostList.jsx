// import React from 'react';
// import { Link } from 'react-router-dom';

// const PostList = ({ posts }) => {
//   return (
//     <div>
//       {posts.map(post => (
//         <div key={post.id}>
//           <Link to={`/post/${post.id}`}>
//             <h2>{post.title}</h2>
//           </Link>
//           <p>Posted on: {new Date(post.created_at).toLocaleString()}</p>
//           <p>Upvotes: {post.upvotes}</p>
//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default PostList;


import React from 'react';
import Post from './Post';

function PostList({ posts, handleUpvote }) {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} handleUpvote={handleUpvote} />
      ))}
    </div>
  );
}

export default PostList;
