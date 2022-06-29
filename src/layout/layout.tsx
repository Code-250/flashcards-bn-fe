import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useQuery, useMutation } from "@apollo/client";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DELETE_FLASHCARDS, GET_ALL_FLASHCARDS } from "../graphql/flascards";
import CardFlip from "../components/card";
import BasicModal from "../components/Modal";
import BasicUpdateModal from "../components/updateModal";
import AlertDialogSlide from "../components/dialog";

const theme = createTheme();
interface Cards {
  question: string;
  answer: string;
  id: number;
}
interface UpdateCard {
  id: number;
  question: string;
  answer: string;
  details: string;
}

export default function Album() {
  const [sort, setSort] = React.useState("");
  const { data, refetch } = useQuery(GET_ALL_FLASHCARDS, {
    variables: {
      orderBy: { id: sort ? `${sort}` : "asc" },
    },
  });
  const [deleteFlashcard] = useMutation(DELETE_FLASHCARDS);
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [updateFlashcard, setUpdateFlashcard] = useState({});
  const [cardToDelete, setCardToDelete] = useState(0);
  console.log(updateFlashcard, "data");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setOpenUpdate(false);
  };
  const closeDialog = () => {
    setOpenDialog(false);
  };
  const handleUpdate = (card: UpdateCard) => {
    setUpdateFlashcard(card);
    setOpenUpdate(true);
  };
  const handleOpenDialog = (id: number) => {
    setOpenDialog(true);
    setCardToDelete(id);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };
  const deletedFlashcard = async (id: number) => {
    await deleteFlashcard({
      variables: {
        deleteFlashcardId: id,
      },
    });
    setOpenDialog(false);
    refetch();
  };
  React.useLayoutEffect(() => {
    refetch();
  }, [sort, refetch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative" sx={{ backgroundColor: "#09329C" }}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            FlashCards
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Flash Cards
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Flash Card is a card bearing information on both sides, which is
              intended to be used as an aid in memorization. Each flashcard
              bears a question on one side and an answer on the other
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#09329C",
                  color: "white",
                  height: 40,
                  "&:hover": { backgroundColor: "#09329C" },
                }}
                onClick={handleOpen}
              >
                Create a card
              </Button>
              <Box sx={{ minWidth: 150, height: 10 }}>
                <FormControl fullWidth>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ textAlign: "center", paddingBottom: "20px" }}
                  >
                    sort
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sort}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <BasicModal handleClose={handleClose} open={open} />
              <BasicUpdateModal
                handleClose={handleClose}
                open={openUpdate}
                update={updateFlashcard}
              />
              <AlertDialogSlide
                dialog={openDialog}
                closeDialog={closeDialog}
                action={() => deletedFlashcard(cardToDelete)}
              />
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data &&
              data.allFlashcards.map((card: Cards, index: number) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <CardFlip
                    card={card}
                    handleOpen={handleUpdate}
                    handleOpenDialog={handleOpenDialog}
                  />
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
