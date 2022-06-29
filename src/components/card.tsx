import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ReactCardFlip from "react-card-flip";

// eslint-disable-next-line @typescript-eslint/no-redeclare
interface Card {
  question: string;
  answer: string;
  id: number;
}
interface props {
  card: Card;
  handleOpen: Function;
  handleOpenDialog: Function;
}
const CardFlip = ({ card, handleOpen, handleOpenDialog }: props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = (id: number) => {
    setIsFlipped((prev) => !prev);
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography>{card.question}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => handleFlip(card.id)}
            sx={{ color: "#09329C" }}
          >
            View
          </Button>
          <Button
            size="small"
            sx={{ color: "#09329C" }}
            onClick={() => handleOpen(card)}
          >
            Edit
          </Button>
          <Button
            size="small"
            sx={{ color: "#09329C" }}
            onClick={() => handleOpenDialog(card.id)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography>{card.answer}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => handleFlip(card.id)}
            sx={{ color: "#09329C" }}
          >
            View
          </Button>
          <Button
            size="small"
            sx={{ color: "#09329C" }}
            onClick={() => handleOpen(true)}
          >
            Edit
          </Button>
          <Button size="small" sx={{ color: "#09329C" }}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </ReactCardFlip>
  );
};

export default CardFlip;
