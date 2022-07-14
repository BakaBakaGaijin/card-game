/* VENDOR */
import { useDispatch } from "react-redux";

/* APPLICATION */
import "./Mode.css";
import { setMode } from "./features/game/gameSlice";

export const Mode = ({ handleMode }) => {
  const dispatch = useDispatch(),
    withFriendHandler = () => {
      dispatch(setMode("friend"));
      handleMode();
    },
    withAIHandler = () => {
      dispatch(setMode("ai"));
      handleMode();
    };

  return (
    <div className="mode">
      <div className="mode-container">
        <h1 className="mode-title">С кем вы хотите сыграть?</h1>
        <div className="mode-btns">
          <button
            className="mode-btns__btn mode-btns__btn1"
            onClick={withFriendHandler}
          >
            С другом
          </button>
          <button
            className="mode-btns__btn mode-btns__btn2"
            onClick={withAIHandler}
          >
            С ботом
          </button>
        </div>
      </div>
    </div>
  );
};
