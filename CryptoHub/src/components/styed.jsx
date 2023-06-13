/** @format */

import { styled } from "@mui/system";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import { Grid } from "@mui/material";


export const MenuLink = styled(NavLink)({
  color: "#fff",
  display: "inline-block",
  padding: "0px 30px 0 0 ",
  textDecoration: "none",
  "&.active": {
    color: "yellow",
  },
  "&:hover": {
    color: "green",
  },
});
export const MenuBar = styled(AppBar)({
  backgroundColor: "#ffb001",
});

export const LoginContainer = styled(Grid)(() => ({
  // backgroundImage: "radial-gradient(#fff, #034f84)",
 
}));