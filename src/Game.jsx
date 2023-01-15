import "./App.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
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
  selectWinner,
  selectMode,
  restart,
} from "./features/game/gameSlice";

import { Player } from "./Player";

function findZero(element) {
  return element.value === 0;
}

function findFour(element) {
  return element.value === 4;
}

export const Game = () => {
  const streak1 = useSelector(selectStreak1),
    streak2 = useSelector(selectStreak2),
    someoneWon = useSelector(selectSomeoneWon),
    comparisons = useSelector(selectComparisons),
    nowTurn = useSelector(selectedTurn),
    selectedCard1 = useSelector(selectedCardPlayer1),
    selectedCard2 = useSelector(selectedCardPlayer2),
    orderedCards1 = useSelector(selectOrderedCardsPlayer1),
    orderedCards2 = useSelector(selectOrderedCardsPlayer2),
    cardsInHandsPlayer1 = useSelector(selectCardsInHandsPlayer1),
    cardsInHandsPlayer2 = useSelector(selectCardsInHandsPlayer2),
    lives1 = useSelector(selectLives1),
    lives2 = useSelector(selectLives2),
    winner = useSelector(selectWinner),
    mode = useSelector(selectMode),
    dispatch = useDispatch();

  // Берём карты в защиту один раз в начале игры
  useEffect(() => {
    dispatch(takeCards1(3));
    dispatch(takeCards2(3));
  }, [dispatch]);

  // Засчитать ход, когда выбрано 2 карты
  useEffect(() => {
    if (selectedCard1 && selectedCard2) {
      dispatch(turn());
    }
  }, [selectedCard1, selectedCard2, dispatch]);

  // Берём карты в защиту каждый раз как они там закончились
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
  }, [
    cardsInHandsPlayer1,
    cardsInHandsPlayer2,
    dispatch,
    comparisons,
    streak1,
    streak2,
  ]);

  // Проверяем, выиграл ли кто
  useEffect(() => {
    if (
      (!orderedCards1.length && cardsInHandsPlayer1.length) ||
      (!orderedCards2.length && cardsInHandsPlayer2.length) ||
      !lives1 ||
      !lives2
    ) {
      dispatch(determineWinner());
    }
  }, [
    orderedCards1,
    orderedCards2,
    cardsInHandsPlayer1,
    cardsInHandsPlayer2,
    dispatch,
    lives1,
    lives2,
  ]);

  // Ход бота
  useEffect(() => {
    if (nowTurn && orderedCards1.length && mode !== "friend" && !someoneWon) {
      // Если у бота есть 0
      if (cardsInHandsPlayer2.findIndex(findZero) !== -1) {
        const aiZeroIndex = cardsInHandsPlayer2.findIndex(findZero);
        console.log("У меня есть 0");
        dispatch(selectCard2(cardsInHandsPlayer2[aiZeroIndex].id));

        // А у человека 4
        if (cardsInHandsPlayer1.findIndex(findFour) !== -1) {
          const personFourIndex = cardsInHandsPlayer1.findIndex(findFour);
          console.log("У меня есть 0, а у человека 4. Время действовать!");
          setTimeout(() => {
            dispatch(selectCard2(cardsInHandsPlayer2[aiZeroIndex].id));
            setTimeout(() => {
              dispatch(selectCard1(cardsInHandsPlayer1[personFourIndex].id));
            }, 2000);
          }, 2000);
        } else if (cardsInHandsPlayer1.findIndex(findZero) !== -1) {
          // И у человека 0
          const personZeroIndex = cardsInHandsPlayer1.findIndex(findZero);
          console.log("У меня есть 0, и у человека 0. Время действовать!");

          setTimeout(() => {
            dispatch(selectCard2(cardsInHandsPlayer2[aiZeroIndex].id));
            setTimeout(() => {
              dispatch(selectCard1(cardsInHandsPlayer1[personZeroIndex].id));
            }, 2000);
          }, 2000);
        } else {
          setTimeout(() => {
            dispatch(selectCard2(cardsInHandsPlayer2[aiZeroIndex].id));
            setTimeout(() => {
              dispatch(selectCard1(cardsInHandsPlayer1[0].id));
            }, 2000);
          }, 2000);
        }
      } else {
        console.log("cards in hands: ", cardsInHandsPlayer2[0]?.id);
        setTimeout(() => {
          dispatch(selectCard2(cardsInHandsPlayer2[0]?.id));
          setTimeout(() => {
            dispatch(selectCard1(cardsInHandsPlayer1[0]?.id));
          }, 2000);
        }, 2000);
      }
      console.log("my turn, human");
    }
  }, [
    nowTurn,
    dispatch,
    cardsInHandsPlayer1,
    cardsInHandsPlayer2,
    mode,
    orderedCards1.length,
    someoneWon,
  ]);

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
        {mode === "friend"
          ? !nowTurn
            ? "Ходит первый игрок"
            : "Ходит второй игрок"
          : !nowTurn
          ? "Ходит игрок"
          : "Ходит бот"}
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
          <div className="modal">
            <h3>
              Поздравлям! Победил{" "}
              <span className={`modal-winner modal-winner${winner}`}>
                {mode === "friend" || (mode === "ai" && winner === 1)
                  ? `${winner} игрок`
                  : "бот"}
              </span>
            </h3>
            <button
              className="modal-winner__btn"
              onClick={() => dispatch(restart())}
            >
              Сыграть ещё раз
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
