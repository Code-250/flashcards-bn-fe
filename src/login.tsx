import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FlashCards from "./assets/card.jpg";
import { loginSchema } from "./validations/authenticationSchema";
import { LOGIN_MUTATION } from "./graphql/authentication";

interface LoginInputs {
  email: string;
  password: string;
}

const theme = createTheme();
const Login = () => {
  const Navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(loginSchema),
  });
  const [login] = useMutation(LOGIN_MUTATION);
  const onSubmit: SubmitHandler<LoginInputs> | undefined = async (
    data: LoginInputs
  ) => {
    setFormState(data);
    await login({
      variables: {
        email: formState.email,
        password: formState.password,
      },
    })
      .then((res) => {
        const { token } = res.data.login;
        console.log(token, "the data here");
        localStorage.setItem("token", JSON.stringify(token));
        Navigate("/dashboard");
      })
      .catch((err: any) => {
        console.log(err.message, "error message");
        toast.error(err.message);
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
          <Typography sx={{ mt: 5 }}>Sign In</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
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
              id="email"
              type="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...register("email")}
              {...(errors.email && {
                error: true,
                helperText: errors.email.message,
              })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              type="password"
              label="PassWord"
              autoComplete="current-password"
              {...register("password")}
              {...(errors.password && {
                error: true,
                helperText: errors.password.message,
              })}
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
              <Link variant="body1" href="signup" sx={{ color: "#09329C" }}>
                {"Don't have an account? Signup"}
              </Link>
            </Grid>
          </Box>
        </Grid>
        <Grid
          item
          sx={{ width: "50.0%", display: { xs: "none", md: "block" } }}
        >
          <img src={FlashCards} alt="flash card" width="100%" height="100%" />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Login;
