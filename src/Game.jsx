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
  selectSomeoneWon,
  determineWinner,
  selectStreak1,
  selectStreak2,
  resetStreak,
  removeLive1,
  removeLive2,
} from "./features/game/gameSlice";

import { Lives } from "./Lives";
import Favorite from "./img/icons/favorite.svg";
import Close from "./img/icons/close.svg";
import { Player } from "./Player";

export const Game = () => {
  const streak1 = useSelector(selectStreak1);
  const streak2 = useSelector(selectStreak2);
  const someoneWon = useSelector(selectSomeoneWon);
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

  useEffect(() => {
    console.log("Вызывается только один раз");
    dispatch(takeCards1(3));
    dispatch(takeCards2(3));
  }, []);

  useEffect(() => {
    console.log("Зашли сюда");
    if (selectedCard1 && selectedCard2) {
      dispatch(turn());
    }
  }, [selectedCard1, selectedCard2]);

  const cardsInHandsPlayer1 = useSelector(selectCardsInHandsPlayer1);
  const cardsInHandsPlayer2 = useSelector(selectCardsInHandsPlayer2);

  useEffect(() => {
    if (
      !cardsInHandsPlayer1.length &&
      !cardsInHandsPlayer2.length &&
      comparisons > 0
    ) {
      // можно обойтись одной длиной
      dispatch(changeTurn());
      dispatch(takeCards1(3));
      dispatch(takeCards2(3));
      if (streak1 === 3) {
        dispatch(removeLive2());
      } else if (streak2 === 3) {
        dispatch(removeLive1());
      }
      dispatch(resetStreak());
    }
  }, [cardsInHandsPlayer1, cardsInHandsPlayer2]);

  const lives1 = useSelector(selectLives1);
  const lives2 = useSelector(selectLives2);
  // ЭТОТ ЮЗЭФФЕКТ
  useEffect(() => {
    if (
      (!orderedCards1.length && cardsInHandsPlayer1.length) ||
      (!orderedCards2.length && cardsInHandsPlayer2.length) ||
      !lives1 ||
      !lives2
    ) {
      dispatch(determineWinner());
    }
  }, [orderedCards1, orderedCards2, cardsInHandsPlayer1, cardsInHandsPlayer2]);
  return (
    <div className={`game game${nowTurn ? 2 : 1}`}>
      <Player
        player={1}
        lives={lives1}
        cardsInHands={cardsInHandsPlayer1}
        nowTurn={nowTurn}
        selectedCard1={selectedCard1}
        selectCard1={selectCard1}
        selectCard2={selectCard2}
        selectedCard2={selectedCard2}
        amountCards={orderedCards1.length}
      />
      <h1 className={`nowTurn nowTurn${nowTurn ? 2 : 1}`}>
        {!nowTurn ? "Ходит первый игрок" : "Ходит второй игрок"}
      </h1>
      <Player
        player={2}
        lives={lives2}
        cardsInHands={cardsInHandsPlayer2}
        nowTurn={nowTurn}
        selectedCard1={selectedCard1}
        selectedCard2={selectedCard2}
        selectCard1={selectCard1}
        selectCard2={selectCard2}
        amountCards={orderedCards2.length}
      />
      {someoneWon && (
        <div className="modal-background">
          <div className="modal"></div>
        </div>
      )}
    </div>
  );
};
