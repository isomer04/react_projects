import React, { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const PostList = ({ posts }) => {
  const [sortType, setSortType] = useState("created_at");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (type) => {
    setSortType(type);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortType === "upvotes") {
      return b.upvotes - a.upvotes;
    } else {
      const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
      const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
      return dateB - dateA;
    }
  });

  const filteredPosts = sortedPosts.filter(
    (post) =>
      post &&
      post.title &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function getHumanReadableDate(createdAt) {
    const postedAt = new Date(Date.parse(createdAt));
    const diffInMilliseconds = new Date() - postedAt;
    const diffInHours = Math.floor(diffInMilliseconds / (3600 * 1000));
    const diffInDays = Math.floor(diffInMilliseconds / (86400 * 1000));
    const diffInWeeks = Math.floor(diffInMilliseconds / (604800 * 1000));

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return `${diffInWeeks} weeks ago`;
    }
  }

  return (
    <div
      style={
        {
          // backgroundColor: "white",
          // color: "black",
          // width: "100%",
          // textAlign: "left",
        }
      }
    >
            <Header />

      {" "}
      <div>
        <button onClick={() => handleSort("created_at")}>
          Sort by Created Time
        </button>
        <button onClick={() => handleSort("upvotes")}>Sort by Upvotes</button>
      </div>
      <br />
      <div>
        <label>Search by Title:  </label>
        <input type="text" value={searchTerm} onChange={handleSearch} />
      </div>
      <br />
      {filteredPosts.map((post) => (
        <div
          style={{
            // backgroundColor: "white",
            // color: "black",
            textAlign: "left",
            borderTop: "5px solid ",
            boxShadow: "0px 0px 25px 0px #ffffff",
            paddingLeft: "2%",
          }}
          key={post.id}
        >
          {/* <p>Posted On: {new Date(post.created_at).toLocaleString()}</p> */}

          <p>Posted {getHumanReadableDate(post.created_at)}</p>

          {post && (
            <Link
              style={{ color: "black", fontWeight: "bolder", fontSize: 20 }}
              to={`/post/${post.id}`}
            >
              {post.title}
            </Link>
          )}
          <p>
            {" "}
            👍 {post.upvotes}
            {post.upvotes < 2 ? " Upvote" : " Upvotes"}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default PostList;
