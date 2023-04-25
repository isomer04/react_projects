import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  const [sortType, setSortType] = useState('created_at');

  const handleSort = (type) => {
    setSortType(type);
  }

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortType === 'upvotes') {
      return b.upvotes - a.upvotes;
    } else {
      return new Date(b.created_at) - new Date(a.created_at);
    }
  });

  return (
    <div>
      <div>
        <button onClick={() => handleSort('created_at')}>Sort by Created Time</button>
        <button onClick={() => handleSort('upvotes')}>Sort by Upvotes</button>
      </div>

      <br />
      <br />
      {sortedPosts.map(post => (
        <div key={post.id}>
          {post && <Link to={`/post/${post.id}`}>{post.title}</Link>}
          <p>Posted on: {new Date(post.created_at).toLocaleString()}</p>
          <p>Upvotes: {post.upvotes}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default PostList;



// import React from 'react';
// import Post from './Post';

// function PostList({ posts, handleUpvote }) {
//   return (
//     <div>
//       {posts.map((post) => (
//         <Post key={post.id} post={post} handleUpvote={handleUpvote} />
//       ))}
//     </div>
//   );
// }

// export default PostList;
