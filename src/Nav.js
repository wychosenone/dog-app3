
// import { AppBar, Toolbar, Typography, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import Avatar from "@mui/material/Avatar";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
import { AppBar, Toolbar, Box } from "@mui/material";
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <AppBar position="static" style={{ backgroundColor: "#329" }}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={1}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#fff",
              marginRight: "20px",
              padding: "5px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = '#f00'; // change color on mouse enter
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = ''; // reset color on mouse leave
            }}
          >
            Gallery
          </Link>

          <Link
            to="/favourite"
            style={{
              textDecoration: "none",
              color: "#fff",
              marginRight: "20px",
              padding: "5px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = '#f00'; // change color on mouse enter
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = ''; // reset color on mouse leave
            }}
          >
            Favourite
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

