import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import FlashCard from "./assets/card.jpg";
import { signupSchema } from "./validations/authenticationSchema";
import { SIGNUP_MUTATION } from "./graphql/authentication";

const theme = createTheme();

interface SignupInputs {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const Navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>({
    resolver: yupResolver(signupSchema),
  });
  const [login] = useMutation(SIGNUP_MUTATION);
  const onSubmit: SubmitHandler<SignupInputs> | undefined = async (
    data: SignupInputs
  ) => {
    setFormState(data);
    await login({
      variables: {
        name: formState.name,
        email: formState.email,
        password: formState.password,
      },
    })
      .then(() => {
        console.log(data, "the data here");
        Navigate("/");
      })
      .catch((err: any) => {
        console.log(err.message, "error message");
        toast.error(err.message);
      });
  };

  React.useLayoutEffect(() => {
    console.log("useeffect......");
    refetch();
  }, []);

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
              id="name"
              label="full Name"
              autoComplete="names"
              autoFocus
              {...register("name")}
              {...(errors.name && {
                error: true,
                helperText: errors.name.message,
              })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              autoComplete="email"
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
              Sign up
            </Button>
            <Grid container alignItems="center" justifyContent="center">
              <Link variant="body1" href="/" sx={{ color: "#09329C" }}>
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
