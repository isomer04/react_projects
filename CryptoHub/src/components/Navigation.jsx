// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const Navigation = () => {
//   return (
//     <nav>
//       <ul>
//         <li><NavLink exact to="/">Home</NavLink></li>
//         <li><NavLink to="/create">Create Post</NavLink></li>
//       </ul>
//     </nav>
//   );
// }

// export default Navigation;

import React from "react";
import { Link } from "react-router-dom";
import { MenuItem, MenuList } from "@mui/material";

function Navigation({ handleClose }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1,
        backgroundColor: "#E4F0D0",
        color: "white",
        fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
      }}
    >
      <MenuList
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        id="simple-menu"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        keepMounted
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
              fontFamily:
                "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Home
          </Link>
        </MenuItem>


        <MenuItem onClick={handleClose}>
          <Link
            to={`/cryptotracker`}
            style={{
              textDecoration: "none",
              color: "black",
              fontFamily:
                "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Crypto Tracker
          </Link>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Link
            to={`/cryptonews`}
            style={{
              textDecoration: "none",
              color: "black",
              fontFamily:
                "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Crypto News
          </Link>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Link
            to={`/create`}
            style={{
              textDecoration: "none",
              color: "black",
              fontFamily:
                "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Create a Post
          </Link>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Link
            to={`/about`}
            style={{
              textDecoration: "none",
              color: "black",
              fontFamily:
                "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            About{" "}
          </Link>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Link
            to={`/contact`}
            style={{
              textDecoration: "none",
              color: "black",
              fontFamily:
                "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Contact{" "}
          </Link>
        </MenuItem>
      </MenuList>
    </nav>
  );
}

export default Navigation;

// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Container from "@mui/material/Container";
// // import { MenuLink, MenuBar } from "./styled";

// import { MenuLink, MenuBar } from "./styed";

// const pages = [
//   {
//     name: "Home",
//     url: "/",
//   },
//   {
//     name: "Create Post",
//     url: "/create",
//   },
// ];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

// const Navigation = (props) => {
//   return (
//     <MenuBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//             {pages.map((page) => (
//               <MenuLink
//                 to={page.url}
//                 className={({ isActive, isPending }) =>
//                   isPending ? "pending" : isActive ? "active" : ""
//                 }
//               >
//                 {page.name}
//               </MenuLink>
//             ))}
//           </Box>
//         </Toolbar>
//       </Container>
//     </MenuBar>
//   );
// };

// export default Navigation;
