/* VENDOR */
import { useState } from "react";
import { useDispatch } from "react-redux";

/* APPLICATION */
import "./Lives.css";
import Add from "./img/icons/add.svg";
import Favorite from "./img/icons/favorite.svg";
import Remove from "./img/icons/remove.svg";
import { setLivesAll } from "./features/game/gameSlice";

export const Lives = () => {
  const [lives, setLives] = useState(3),
    dispatch = useDispatch();

  return (
    <div className="page-lives">
      <h2 className="page-lives-title">
        У каждого игрока будет по <span>{lives}</span>{" "}
        <img src={Favorite} alt="" />
      </h2>
      <p className="page-lives-description">
        *Если у одного из игроков закночатся все карты - игра завершится
        досрочно
      </p>
      <div className="page-lives-btns">
        <img
          src={Add}
          alt=""
          className="page-lives-btns__btn"
          onClick={() => setLives(lives + 1)}
        />
        <img
          src={Remove}
          alt=""
          className="page-lives-btns__btn"
          onClick={lives === 1 ? null : () => setLives(lives - 1)}
        />
      </div>
      <button
        className="next"
        onClick={() => {
          dispatch(setLivesAll(lives));
        }}
      >
        Продолжить
      </button>
    </div>
  );
};
