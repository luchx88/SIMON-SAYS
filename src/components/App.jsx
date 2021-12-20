import React, { useState, useEffect } from "react";
import "@styles/App.scss";

import ColorButton from "./ColorButton";
import StartButton from "./StartButton";
import ScoreMarker from "./ScoreMarker";
import FinalScoreModal from "./FinalScoreModal";
import MaxScore from "./MaxScore";

import timeout from "../utils/timeout"
import redFile from "../assets/mp3-notes/f5.mp3"
import greenFile from "../assets/mp3-notes/d5.mp3"
import blueFile from "../assets/mp3-notes/c5.mp3"
import yellowFile from "../assets/mp3-notes/a-5.mp3"

const App = () => {
  const redSound = new Audio(redFile);
  const greenSound = new Audio(greenFile);
  const blueSound = new Audio(blueFile);
  const yellowSound = new Audio(yellowFile);

  const colorList = ['red', 'green', 'blue', 'yellow'];
  const [showModal, setShowModal] = useState(false);

  const initGame = {
    illuminating: false,
    userTurn: false,
    score: 0,
    colorSequence: [],
    userColors: []
  }

  const [isOn, setIsOn] = useState(false);
  const [game, setGame] = useState(initGame);
  const [flashColor, setFlashColor] = useState('');
  const [maxScore, setMaxScore] = useState([]);

  useEffect(() => {
    if(isOn) {
      setGame({...initGame, illuminating: true})
    } else if (isOn && !game.score) {
      setGame({...initGame, illuminating: true})
    } else {
      setGame({
        ...initGame,
        score: game.colorSequence.length - 1,
      });
    }
  }, [isOn])

  useEffect(() => {
    if (isOn && game.illuminating) {
      const randomNumber = Math.floor(Math.random() * 4);
      const newColor = colorList[randomNumber];

      const newSequence = [...game.colorSequence];
      newSequence.push(newColor);

      setGame({...game, colorSequence: newSequence})
    }
  }, [isOn, game.illuminating])

  useEffect(() => {
    if (isOn && game.illuminating && game.colorSequence.length) {
      illuminateColors();
    }
  }, [isOn, game.illuminating, game.colorSequence.length])

  const illuminateColors = async () => {
    await timeout(1000);
    for (let i = 0; i < game.colorSequence.length; i++) {
      setFlashColor(game.colorSequence[i]);
      playSound(game.colorSequence[i]);
      await timeout(500);
      setFlashColor('');
      await timeout(500);
      if (i === game.colorSequence.length - 1) {
        const colorsCopy = [...game.colorSequence];
        setGame({
          ...game,
          illuminating: false,
          userTurn: true,
          userColors: colorsCopy
        })
      }
    }
  }

  const handleClick = async (color) => {
    if (game.userTurn && !game.illuminating) {

      const userColorsCopy = [...game.userColors];
      const firstColor = userColorsCopy.shift();

      setFlashColor(color);
      playSound(color);
      await timeout(250);


      if (firstColor === color) {
        if(!userColorsCopy.length) {
          setGame({
            ...game,
            illuminating: true,
            userTurn: false,
            score: game.colorSequence.length,
            userColors: []
          })
        } else {
          setGame({
            ...game,
            userColors: userColorsCopy
          })
        }
      } else {
        const score = game.score;
        const maxScoreCopy = [...maxScore];
        maxScoreCopy.push(game.score);
        setMaxScore(maxScoreCopy);
        setIsOn(false);
        setShowModal(true);
      }
      setFlashColor('');
      await timeout(100)
    }
  }

  const playSound = (color) => {
    switch(color) {
      case 'red':
        redSound.play();
        break;
      case 'green':
        greenSound.play();
        break;
      case 'blue':
        blueSound.play();
        break;
      case 'yellow':
        yellowSound.play();
        break;
    }
  }

  return (
    <main className="App-container">
      <section className="App__gameboard">
        {colorList.map((v, i) => (
          <ColorButton
            onClick={() => handleClick(v)}
            flash={flashColor === v}
            color={v}
            key={v}
          />
          ))
        }
        {!isOn && <StartButton setIsOn={setIsOn} />}
        {isOn && <ScoreMarker score={game.score} />}
        {showModal && (
          <FinalScoreModal
            score={game.score}
            setShowModal={setShowModal}
          />
        )}
      </section>
      {!(maxScore.length === 0) && <MaxScore maxScore={maxScore} />}
    </main>
  );
}

export default App;
