import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import FlashCard from "./assets/card.jpg";

const theme = createTheme();
const Signup = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        flexWrap="nowrap"
        sx={{ height: "100vh", width: "100%" }}
      >
        <CssBaseline />
        <Grid
          sx={{
            display: "flex",
            marginTop: { xs: 3, md: 0 },
            flexDirection: "column",
            alignItems: "center",
            justifyContent: { xs: "start", md: "center" },
            width: { xs: "100%", md: "50%" },
            padding: { xs: "0px 20px 0px 20px" },
          }}
        >
          <Typography variant="h4">Flash Cards App</Typography>
          <Typography sx={{ mt: 5 }}>Sign up</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 3,
              padding: { xs: "0px 20px 0px 20px", lg: "0px 100px 0px 100px" },
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="full Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="PassWord"
              name="password"
              autoComplete="current-password"
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 3,
                mb: 2,
                color: "white",
                backgroundColor: "#09329C",
                "&:hover": { backgroundColor: "#09329C" },
              }}
            >
              Login
            </Button>
            <Grid container alignItems="center" justifyContent="center">
              <Link variant="body1" href="login" sx={{ color: "#09329C" }}>
                {"Already have an account? login"}
              </Link>
            </Grid>
          </Box>
        </Grid>
        <Grid item sx={{ width: "50%", display: { xs: "none", md: "block" } }}>
          <img src={FlashCard} alt="flash card" width="100%" height="100%" />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Signup;
