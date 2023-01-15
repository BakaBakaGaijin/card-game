/* VENDOR */
import { useSelector } from "react-redux";

/* APPLICATION */
import "./App.css";
import { Game } from "./Game";
import { Lives } from "./Lives";
import { Mode } from "./Mode";
import { selectMode, selectLives } from "./features/game/gameSlice";

function App() {
  const isMode = useSelector(selectMode),
    isLives = useSelector(selectLives);

  return (
    <div className="App">
      {!isMode ? <Mode /> : !isLives ? <Lives /> : <Game />}
    </div>
  );
}

export default App;
