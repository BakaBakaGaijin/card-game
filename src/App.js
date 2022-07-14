/* VENDOR */
import { useState } from "react";

/* APPLICATION */
import "./App.css";
import { Game } from "./Game";
import { Lives } from "./Lives";
import { Mode } from "./Mode";

function App() {
  //const [isMode, setIsMode] = useState(false);
  //const [isLives, setIsLives] = useState(false); // Выбрали количество жизней
  const [isMode, setIsMode] = useState(null);
  const [isLives, setIsLives] = useState(null); // Выбрали количество жизней

  return (
    <div className="App">
      {!isMode ? (
        <Mode handleMode={() => setIsMode(true)} />
      ) : !isLives ? (
        <Lives handleLives={() => setIsLives(true)} />
      ) : (
        <Game />
      )}
    </div>
  );
}

export default App;
