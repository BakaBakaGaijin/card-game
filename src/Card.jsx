/* VENDOR */
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";

/* APPLICATION */
import {
  selectedCardPlayer1,
  selectedCardPlayer2,
} from "./features/game/gameSlice";

export const Card = ({ card, onClick, player }) => {
  const selectedCard1 = useSelector(selectedCardPlayer1),
    selectedCard2 = useSelector(selectedCardPlayer2);

  return (
    <div
      className={
        selectedCard1?.id === card?.id || selectedCard2?.id === card?.id
          ? `card card${player} selected-card${player}`
          : `card card${player}`
      }
      key={nanoid()}
      onClick={onClick}
    >
      {card?.value}
    </div>
  );
};
