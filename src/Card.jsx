import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import {
  selectedCardPlayer1,
  selectedCardPlayer2,
  selectedTurn,
} from "./features/game/gameSlice";

export const Card = ({ card, onClick, player }) => {
  let nowTurn = useSelector(selectedTurn);
  let selectedCard1 = useSelector(selectedCardPlayer1);
  let selectedCard2 = useSelector(selectedCardPlayer2);
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
