import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import CircularProgress from "@mui/material/CircularProgress";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { flashcardsSchema } from "../validations/flashcardsSchema";
import { CREATE_FLASHCARD } from "../graphql/flascards";
import { toast } from "react-toastify";

interface createFlashcards {
  question: string;
  answer: string;
  details: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ handleClose, open }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [details, setDetails] = useState("");
  const [errorField, setErrorField] = React.useState<boolean>(false);
  const [helperText, setHelperText] = React.useState<string>("");

  console.log(question, answer, details, "data to submit");

  const [addFlashcard, resFlashCard] = useMutation(CREATE_FLASHCARD, {
    variables: {
      post: {
        question: question,
        answer: answer,
        details: details,
      },
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err.message, "error====");
    },
    onCompleted: () => {
      toast.success("successfuly create a flashcard");
    },
  });

  const Submit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim() || !details.trim()) {
      setErrorField(true);
      setHelperText("All fields are required");
      return;
    }
    await addFlashcard();
    setQuestion("");
    setAnswer("");
    setDetails("");
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container component="main">
            <CssBaseline />
            <Typography variant="h4">Create FlashCards</Typography>
            <Box component="form" noValidate>
              <TextField
                margin="normal"
                id="question"
                type="text"
                label="question"
                autoFocus
                fullWidth
                value={answer}
                onChange={(e) => setQuestion(e.target.value)}
                error={errorField}
                helperText={helperText}
              />
              <TextField
                margin="normal"
                id="answer"
                type="text"
                label="answer"
                fullWidth
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                error={errorField}
                helperText={helperText}
              />
              <TextField
                margin="normal"
                id="details"
                type="text"
                label="details"
                fullWidth
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                error={errorField}
                helperText={helperText}
                sx={{ "&:active": { border: "1px solid #09329C" } }}
              />
              <Button
                fullWidth
                variant="contained"
                type="submit"
                onClick={(e) => Submit(e)}
                sx={{
                  backgroundColor: "#09329C",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#09329C",
                    color: "white",
                  },
                }}
              >
                {resFlashCard.loading ? (
                  <CircularProgress sx={{ color: "white" }} />
                ) : (
                  "Create"
                )}
              </Button>
            </Box>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
