import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

function myRandom(nums) {
  let num = Math.floor(Math.random() * (nums + 1));
  return num;
}

function fillCards() {
  let count = 0,
    amountCards = { ...[4, 4, 4, 4, 4] },
    orderedCards = [];
  do {
    let num = myRandom(4);
    if (amountCards[num]) {
      amountCards[num] = amountCards[num] - 1;
      orderedCards.push({ value: num, id: nanoid() });
      count++;
    }
  } while (count < 20);

  return orderedCards;
}

const initialState = {
  player1: {
    amountCards: { ...[4, 4, 4, 4, 4] },
    orderedCards: fillCards(),
    cardsInHand: [],
    selectedCard: null,
    lives: 3,
    streak: 0,
  },
  player2: {
    amountCards: { ...[4, 4, 4, 4, 4] },
    orderedCards: fillCards(),
    cardsInHand: [],
    selectedCard: null,
    lives: 3,
    streak: 0,
  },
  nowTurn: myRandom(1),
  round: 1,
  comparisons: 0,
  someoneWon: false,
  winner: null,
  mode: null,
};

export const counterSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    takeCards1: (state, action) => {
      if (action.payload === 3 && !state.player1.cardsInHand.length) {
        state.player1.cardsInHand.push(
          ...state.player1.orderedCards.splice(0, action.payload)
        );
      }
    },
    takeCards2: (state, action) => {
      if (action.payload === 3 && !state.player2.cardsInHand.length) {
        state.player2.cardsInHand.push(
          ...state.player2.orderedCards.splice(0, action.payload)
        );
      }
    },
    selectCard1: (state, action) => {
      console.log(state.someoneWon);
      if (!state.someoneWon) {
        state.player1.selectedCard = state.player1.cardsInHand.find(
          (card) => card.id === action.payload
        );
      }
    },
    selectCard2: (state, action) => {
      if (!state.someoneWon) {
        state.player2.selectedCard = state.player2.cardsInHand.find(
          (card) => card.id === action.payload
        );
      }
    },
    turn: (state) => {
      if (
        // при одинаковых значениях карт
        state.player1.selectedCard.value === state.player2.selectedCard.value
      ) {
        if (state.nowTurn) {
          if (
            state.player2.orderedCards.find(
              (card) => card.id === state.player2.selectedCard
            )
          ) {
            // Если в колод
            // Если ход второго игрока
            state.player2.orderedCards.push(state.player2.selectedCard); // Кладём в очередь
            state.player2.cardsInHand = state.player2.cardsInHand.filter(
              // Убираем из защиты
              (card) => card.id !== state.player2.selectedCard.id
            );
            state.player2.cardsInHand.push(
              ...state.player2.orderedCards.splice(0, 1)
            ); // Ставим карту в защиту
          } else {
            state.player1.orderedCards.push(state.player2.selectedCard);
            state.player2.cardsInHand = state.player2.cardsInHand.filter(
              // Убираем из защиты
              (card) => card.id !== state.player2.selectedCard.id
            );
            state.player2.cardsInHand.push(
              ...state.player2.orderedCards.splice(0, 1)
            ); // Ставим карту в защиту
          }
        } else {
          if (
            state.player2.orderedCards.find(
              (card) => card.id === state.player2.selectedCard
            )
          ) {
            state.player1.orderedCards.push(state.player1.selectedCard); // Кладём в очередь
            state.player1.cardsInHand = state.player1.cardsInHand.filter(
              // Убираем из защиты
              (card) => card.id !== state.player1.selectedCard.id
            );
            state.player1.cardsInHand.push(
              ...state.player1.orderedCards.splice(0, 1)
            ); // Ставим карту в защиту
          } else {
            state.player2.orderedCards.push(state.player1.selectedCard); // Кладём в очередь
            state.player1.cardsInHand = state.player1.cardsInHand.filter(
              // Убираем из защиты
              (card) => card.id !== state.player1.selectedCard.id
            );
            state.player1.cardsInHand.push(
              ...state.player1.orderedCards.splice(0, 1)
            ); // Ставим карту в защиту
          }
        }
      } else if (
        // Если у первого игрока 4, а  у второго 0
        state.player1.selectedCard.value === 4 &&
        state.player2.selectedCard.value === 0
      ) {
        state.player2.streak = state.player2.streak + 1;
        // убираем карту из защиты
        state.player1.cardsInHand = state.player1.cardsInHand.filter(
          (card) => card.id !== state.player1.selectedCard.id
        );
        state.player2.cardsInHand = state.player2.cardsInHand.filter(
          (card) => card.id !== state.player2.selectedCard.id
        );
        // убираем карту у оппонента
        //state.player2.
        // добавляем карты в очередь
        state.player2.orderedCards.push(
          state.player2.selectedCard,
          state.player1.selectedCard
        );
      } else if (
        // Если у первого игрока 0, а у второго 4
        state.player1.selectedCard.value === 0 &&
        state.player2.selectedCard.value === 4
      ) {
        state.player1.streak = state.player1.streak + 1;
        // убираем карту из защиты
        state.player1.cardsInHand = state.player1.cardsInHand.filter(
          (card) => card.id !== state.player1.selectedCard.id
        );
        state.player2.cardsInHand = state.player2.cardsInHand.filter(
          (card) => card.id !== state.player2.selectedCard.id
        );
        // добавляем карты в очередь
        state.player1.orderedCards.push(
          state.player1.selectedCard,
          state.player2.selectedCard
        );
      } else if (
        // Если у первого карта больше
        state.player1.selectedCard.value > state.player2.selectedCard.value
      ) {
        state.player1.streak = state.player1.streak + 1;
        // убираем карту из защиты
        state.player1.cardsInHand = state.player1.cardsInHand.filter(
          (card) => card.id !== state.player1.selectedCard.id
        );
        state.player2.cardsInHand = state.player2.cardsInHand.filter(
          (card) => card.id !== state.player2.selectedCard.id
        );
        // добавляем карты в очередь
        state.player1.orderedCards.push(
          state.player1.selectedCard,
          state.player2.selectedCard
        );
      } else if (
        // Если у второго карта больше
        state.player1.selectedCard.value < state.player2.selectedCard.value
      ) {
        state.player2.streak = state.player2.streak + 1;
        // убираем карту из защиты
        state.player1.cardsInHand = state.player1.cardsInHand.filter(
          (card) => card.id !== state.player1.selectedCard.id
        );
        state.player2.cardsInHand = state.player2.cardsInHand.filter(
          (card) => card.id !== state.player2.selectedCard.id
        );
        // убираем карту у оппонента
        //state.player2.
        // добавляем карты в очередь
        state.player2.orderedCards.push(
          state.player2.selectedCard,
          state.player1.selectedCard
        );
      }

      state.player1.selectedCard = null; // Убираем выделение с карт
      state.player2.selectedCard = null;
      state.comparisons++;
    },
    changeTurn: (state) => {
      state.nowTurn = !state.nowTurn;
    },
    setLivesAll: (state, action) => {
      state.player1.lives = action.payload;
      state.player2.lives = action.payload;
    },
    determineWinner: (state) => {
      state.someoneWon = true;
      state.winner =
        (!state.player1.cardsInHand.length &&
          !state.player1.orderedCards.length) ||
        !state.player1.lives
          ? 2
          : 1;
    },
    resetStreak: (state) => {
      state.player1.streak = 0;
      state.player2.streak = 0;
    },
    removeLive1: (state) => {
      state.player1.lives = state.player1.lives - 1;
    },
    removeLive2: (state) => {
      state.player2.lives = state.player2.lives - 1;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  takeCards1,
  takeCards2,
  selectCard1,
  selectCard2,
  changeTurn,
  turn,
  setLivesAll,
  determineWinner,
  resetStreak,
  removeLive1,
  removeLive2,
  setMode,
} = counterSlice.actions;
/* amount cards each value */
export const selectAmountCardsPlayer1 = (state) =>
  state.game.player1.amountCards;
export const selectAmountCardsPlayer2 = (state) =>
  state.game.player2.amountCards;
/* ordered cards */
export const selectOrderedCardsPlayer1 = (state) =>
  state.game.player1.orderedCards;
export const selectOrderedCardsPlayer2 = (state) =>
  state.game.player2.orderedCards;
/* cards in hand */
export const selectCardsInHandsPlayer1 = (state) =>
  state.game.player1.cardsInHand;
export const selectCardsInHandsPlayer2 = (state) =>
  state.game.player2.cardsInHand;
/* selected card */
export const selectedCardPlayer1 = (state) => state.game.player1?.selectedCard;
export const selectedCardPlayer2 = (state) => state.game.player2?.selectedCard;
/* Who go first */
export const selectedTurn = (state) => state.game.nowTurn;
export const selectRound = (state) => state.game.round;
export const selectComparisons = (state) => state.game.comparisons;
export const selectLives1 = (state) => state.game.player1.lives;
export const selectLives2 = (state) => state.game.player2.lives;
export const selectSomeoneWon = (state) => state.game.someoneWon;
export const selectStreak1 = (state) => state.game.player1.streak;
export const selectStreak2 = (state) => state.game.player2.streak;
export const selectWinner = (state) => state.game.winner;
export const selectMode = (state) => state.game.mode;
export default counterSlice.reducer;
