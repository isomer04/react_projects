import React from "react";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Link } from "react-router-dom";

function Navigation() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav>
      <button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Menu
      </button>

      <MenuList id="simple-menu" onClose={handleClose}>
        <MenuItem component={Link} to="/" onClick={handleClose}>
          Home
        </MenuItem>
        <MenuItem component={Link} to="/about" onClick={handleClose}>
          About
        </MenuItem>
        <MenuItem component={Link} to="/contact" onClick={handleClose}>
          Contact
        </MenuItem>
        <MenuItem component={Link} to="/chart" onClick={handleClose}>
          Chart
        </MenuItem>
      </MenuList>
    </nav>
  );
}

export default Navigation;
