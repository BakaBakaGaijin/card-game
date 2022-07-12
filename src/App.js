/* VENDOR */
/* APPLICATION */
import logo from "./logo.svg";
import "./App.css";
import { Card } from "./Card";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAmountCardsPlayer1,
  selectAmountCardsPlayer2,
  selectOrderedCardsPlayer1,
  selectOrderedCardsPlayer2,
  selectCardsInHandsPlayer1,
  selectCardsInHandsPlayer2,
  selectedCardPlayer1,
  selectedCardPlayer2,
  selectCard1,
  selectCard2,
  takeCards1,
  takeCards2,
  selectedTurn,
  changeTurn,
  turn,
  selectRound,
  selectComparisons,
  selectLives1,
  selectLives2,
} from "./features/game/gameSlice";

import { Game } from "./Game";
import { Lives } from "./Lives";
import Favorite from "./img/icons/favorite.svg";
import Close from "./img/icons/close.svg";

function App() {
  const [isLives, setIsLives] = useState(false);
  const comparisons = useSelector(selectComparisons);
  const round = useSelector(selectRound);
  let nowTurn = useSelector(selectedTurn);
  let selectedCard1 = useSelector(selectedCardPlayer1);
  let selectedCard2 = useSelector(selectedCardPlayer2);
  const amountCards1 = useSelector(selectAmountCardsPlayer1);
  const amountCards2 = useSelector(selectAmountCardsPlayer2);
  const orderedCards1 = useSelector(selectOrderedCardsPlayer1);
  const orderedCards2 = useSelector(selectOrderedCardsPlayer2);
  const dispatch = useDispatch();

  const [currentCardFirstPlayer, setCurrentCardFirstPlayer] = useState();
  const [currentCardSecondPlayer, setCurrentCardSecondPlayer] = useState();

  /* useEffect(() => {
    console.log("Вызывается только один раз");
    dispatch(takeCards1(3));
    dispatch(takeCards2(3));
  }, []); */

  /* useEffect(() => {
    console.log("Зашли сюда");
    if (selectedCard1 && selectedCard2) {
      dispatch(turn());
    }
  }, [selectedCard1, selectedCard2]); */

  const cardsInHandsPlayer1 = useSelector(selectCardsInHandsPlayer1);
  const cardsInHandsPlayer2 = useSelector(selectCardsInHandsPlayer2);

  /* useEffect(() => {
    if (
      !cardsInHandsPlayer1.length &&
      !cardsInHandsPlayer2.length &&
      comparisons > 0
    ) {
      // можно обойтись одной длиной
      dispatch(changeTurn());
      dispatch(takeCards1(3));
      dispatch(takeCards2(3));
    }
  }, [cardsInHandsPlayer1, cardsInHandsPlayer2]); */

  const lives1 = useSelector(selectLives1);
  const lives2 = useSelector(selectLives2);

  return (
    <div className="App">
      {/* <Game /> */}
      {!isLives ? <Lives handleLives={() => setIsLives(true)} /> : <Game />}
    </div>
  );
}

export default App;
