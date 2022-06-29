import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { GET_ALL_FLASHCARDS, UPDATE_FLASHCARDS } from "../graphql/flascards";

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

export default function BasicUpdateModal({ handleClose, open, update }) {
  const [question, setQuestion] = useState(update.question);
  const [answer, setAnswer] = useState(update.answer);
  const [details, setDetails] = useState(update.details);
  const [errorField, setErrorField] = React.useState<boolean>(false);
  const [helperText, setHelperText] = React.useState<string>("");
  const { refetch } = useQuery(GET_ALL_FLASHCARDS, {
    onError: (err) => {
      toast.error(err.message);
      console.log(err, "something went wrong");
    },
    variables: {
      allFlashcards: {
        order: { id: "asc" },
      },
    },
  });
  const id = open ? parseInt(update.id) : null;
  console.log(id);
  const [updateFlashcard, resUpdateFlashCard] = useMutation(UPDATE_FLASHCARDS, {
    onError: (err) => {
      toast.error(err.message);
    },
    variables: {
      updateFlashcardId: id,
      question,
      answer,
      details,
    },
    onCompleted: () => {
      toast.success("successfully updated flashcard");
      refetch();
      handleClose();
    },
  });
  const handleUpdate = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim() || !details.trim()) {
      setErrorField(true);
      setHelperText("All fields are required");
      return;
    }
    updateFlashcard();
  };

  React.useEffect(() => {
    setQuestion(update.question);
    setAnswer(update.answer);
    setDetails(update.details);
  }, [update]);
  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ mb: 2 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Update Flashcard
          </Typography>
          <TextField
            id="outlined-basic"
            label="Question"
            variant="outlined"
            fullWidth
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            error={errorField}
            helperText={helperText}
          />
          <TextField
            id="outlined-basic"
            label="Answer"
            variant="outlined"
            fullWidth
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            error={errorField}
            helperText={helperText}
            sx={{
              my: 2,
            }}
          />
          <TextField
            id="outlined-basic"
            label="Details"
            variant="outlined"
            fullWidth
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            error={errorField}
            helperText={helperText}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#09329C",
              color: "white",
              mt: 2,
              "&:hover": {
                backgroundColor: "#09329C",
                color: "white",
              },
            }}
            onClick={(e) => handleUpdate(e)}
            fullWidth
          >
            {resUpdateFlashCard.loading ? (
              <CircularProgress sx={{ color: "white" }} />
            ) : (
              "Update"
            )}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
