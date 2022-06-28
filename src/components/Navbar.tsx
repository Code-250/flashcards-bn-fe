import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const NavBar = () => {
  return (
    <Grid container justifyContent="space-between">
      <Typography>FalshCards</Typography>
      <Grid item>
        <Typography>Logout</Typography>
      </Grid>
    </Grid>
  );
};

export default NavBar;
