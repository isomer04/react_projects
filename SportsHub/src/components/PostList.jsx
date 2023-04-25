import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  const [sortType, setSortType] = useState('created_at');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (type) => {
    setSortType(type);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortType === 'upvotes') {
      return b.upvotes - a.upvotes;
    } else {
      return new Date(b.created_at) - new Date(a.created_at);
    }
  });



  const filteredPosts = sortedPosts.filter((post) =>
  post && post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div>
      <div>
        <button onClick={() => handleSort('created_at')}>Sort by Created Time</button>
        <button onClick={() => handleSort('upvotes')}>Sort by Upvotes</button>
      </div>

      <br />
      <div>
        <label>Search by Title:</label>
        <input type="text" value={searchTerm} onChange={handleSearch} />
      </div>
      <br />

      {filteredPosts.map((post) => (
        <div key={post.id}>
          {post && <Link to={`/post/${post.id}`}>{post.title}</Link>}
          <p>Posted on: {new Date(post.created_at).toLocaleString()}</p>
          <p>Upvotes: {post.upvotes}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default PostList;
