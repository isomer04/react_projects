import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink to="/create">Create Post</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;
