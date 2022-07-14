/* VENDOR */
import { useDispatch, useSelector } from "react-redux";

/* APPLICATION */
import "./Player.css";
import Close from "./img/icons/close.svg";
import { Card } from "./Card";
import { selectMode } from "./features/game/gameSlice";

export const Player = ({
  player,
  lives,
  cardsInHands,
  nowTurn,
  selectedCard1,
  selectedCard2,
  selectCard1,
  selectCard2,
  amountCards,
}) => {
  const dispatch = useDispatch(),
    mode = useSelector(selectMode),
    selectCardHandler = (id) => {
      if (player === 1) {
        if (!nowTurn) {
          dispatch(selectCard1(id));
        } else if (selectedCard2) {
          dispatch(selectCard1(id));
        }
      } else {
        // Карты второго игрока или бота
        if (nowTurn && mode !== "ai") {
          // Ходит второй игрок или бот
          dispatch(selectCard2(id));
        } else if (selectedCard1) {
          dispatch(selectCard2(id));
        }
      }
    };

  return (
    <div className="player">
      <header className={`player-header player-header${player}`}>
        <div
          className={player === 1 ? "container" : "container container-reverse"}
        >
          <h2 className={`player-header__title player-header__title${player}`}>
            {mode === "ai" && player === 2 ? "бот" : `${player} игрок`}
          </h2>
          <div className="player-header-lives">
            {lives}
            <img src={Close} className="player-header-lives__mul" alt="" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              width="48"
              className={`player-header-lives__heart${player}`}
            >
              <path d="m24 41.95-2.05-1.85q-5.3-4.85-8.75-8.375-3.45-3.525-5.5-6.3T4.825 20.4Q4 18.15 4 15.85q0-4.5 3.025-7.525Q10.05 5.3 14.5 5.3q2.85 0 5.275 1.35Q22.2 8 24 10.55q2.1-2.7 4.45-3.975T33.5 5.3q4.45 0 7.475 3.025Q44 11.35 44 15.85q0 2.3-.825 4.55T40.3 25.425q-2.05 2.775-5.5 6.3T26.05 40.1ZM24 38q5.05-4.65 8.325-7.975 3.275-3.325 5.2-5.825 1.925-2.5 2.7-4.45.775-1.95.775-3.9 0-3.3-2.1-5.425T33.5 8.3q-2.55 0-4.75 1.575T25.2 14.3h-2.45q-1.3-2.8-3.5-4.4-2.2-1.6-4.75-1.6-3.3 0-5.4 2.125Q7 12.55 7 15.85q0 1.95.775 3.925.775 1.975 2.7 4.5Q12.4 26.8 15.7 30.1 19 33.4 24 38Zm0-14.85Z" />
            </svg>
          </div>
        </div>
      </header>
      <div className={`player-field player-field${player}`}>
        <div
          className={player === 1 ? "container" : "container container-reverse"}
        >
          {
            <div className="field field1">
              {cardsInHands.map((card) => (
                <Card
                  player={player}
                  key={card.id}
                  card={card}
                  onClick={() => selectCardHandler(card.id)}
                />
              ))}
            </div>
          }
          <div className={`cardStack cardStack${player}`}>
            <div className={`cardStack__item cardStack__item${player}`}>
              <div className={`cardStack__item cardStack__item${player}`}>
                Осталось {amountCards} карт
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
