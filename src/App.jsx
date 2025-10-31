import React, { useEffect, useState } from "react";
import { languages } from "./constants/languages";
import { getFarewellText, getRandomWord } from "./components/utils";
import Confetti from "react-confetti";

const App = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [currentLetters, setCurrentLetters] = useState([]);

  const wrongGuess = currentLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameWon = currentWord
    .split("")
    .every((letter) => currentLetters.includes(letter));

  const isGameLost = wrongGuess >= languages.length - 1;

  const isGameOver = isGameLost || isGameWon;

  const lastGuessLetter = currentLetters[currentLetters.length - 1];
  const lastIncorrectGuess =
    lastGuessLetter && !currentWord.includes(lastGuessLetter);

  const startNewGame = () => {
    setCurrentWord(() => getRandomWord());
    setCurrentLetters([]);
  };
  const addLetter = (letter) => {
    setCurrentLetters((prev) =>
      prev.includes(letter) ? prev : [...prev, letter]
    );
  };

  const alphabets = "qwertyuiopasdfghjklzxcvbnm";

  const keyboardElements = alphabets.split("").map((letter, index) => {
    const isGuessed = currentLetters.includes(letter);
    const isCorrect = currentWord.includes(letter);

    let bgColor = "bg-yellow-100 hover:bg-yellow-200";
    if (isGuessed) {
      bgColor = isCorrect ? "bg-green-400 text-white" : "bg-red-400 text-white";
    }
    return (
      <button
        onClick={() => addLetter(letter)}
        key={index}
        disabled={isGuessed || isGameOver}
        className={`${bgColor} text-gray-800 font-semibold 
                 rounded-md shadow-sm 
                 w-10 h-10 md:w-14 md:h-14 md:text-lg 
                 flex items-center justify-center 
                 transition-colors duration-200 uppercase`}
      >
        {letter}
      </button>
    );
  });

  const langElements = languages.map((lang, index) => {
    const isLangLost = index < wrongGuess;

    return (
      <div key={lang.name} className="relative inline-block m-1">
        {isLangLost ? (
          <span
            className={`px-3 py-1 rounded text-sm md:text-base font-medium
                      bg-neutral-800 text-white
                      shadow-inner dark:bg-neutral-400`}
          >
            💀
          </span>
        ) : (
          <span
            className="px-3 py-1 rounded text-sm md:text-base font-medium "
            style={{
              backgroundColor: lang.backgroundColor,
              color: lang.color,
            }}
          >
            {lang.name}
          </span>
        )}
      </div>
    );
  });

  const letterElements = currentWord.split("").map((letter, index) => {
    const isGuessed = currentLetters.includes(letter);
    const isShowLetter = isGameLost || isGuessed;
    const isMissed = isGameLost && !isGuessed;

    return (
      <span
        key={index}
        className={`text-3xl font-semibold mx-2 drop-shadow-md uppercase min-w-[1ch] text-center
        ${isMissed ? "text-red-500" : "text-gray-900"}`}
        style={{
          textDecorationThickness: "0.1rem",
          textUnderlineOffset: "0.5rem",
        }}
      >
        {isShowLetter ? letter : "_"}
      </span>
    );
  });

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      } 
                  h-screen flex flex-col justify-between items-center py-4 md:py-8 px-4 transition-colors duration-300`}
    >
      {/* Header Section */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 px-4 py-2 rounded-md shadow-md 
             bg-gray-200 text-gray-900 hover:bg-gray-300
             dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
      >
        {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <div className="text-center">
        <h1 className="font-semibold text-3xl md:text-5xl">Assembly EndGame</h1>
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-00 mt-2 max-w-2xl">
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </div>

      {lastIncorrectGuess && wrongGuess < languages.length && !isGameOver && (
        <div className="w-full max-w-xs md:max-w-lg rounded-xl shadow-md px-6 py-4 bg-purple-500 text-white text-center border border-dashed">
          <p className="text-2xl md:text-3xl font-bold mb-1">
            {getFarewellText(languages[wrongGuess - 1]?.name || "Unknown")}
          </p>
        </div>
      )}
      {/* Win Message */}
      {isGameOver && (
        <div
          className={`w-full max-w-xs md:max-w-lg rounded-xl shadow-md px-6 py-5 text-white
                ${isGameWon ? "bg-green-500" : "bg-red-500"}`}
        >
          {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
          <div className="flex flex-col items-center text-center">
            {isGameWon ? (
              <>
                <p className="text-2xl md:text-3xl font-bold mb-1">You Win!</p>
                <p className="text-lg md:text-xl">
                  Well Done <span>🎉</span>
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl md:text-3xl font-bold mb-1">
                  Game Over!
                </p>
                <p className="text-lg md:text-xl">
                  You lose! Better start learning Assembly <span>💀</span>
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Languages Section */}
      <div className="flex flex-wrap justify-center my-5">{langElements}</div>

      {/* Current Word Display */}
      <div className="px-6 py-4 bg-gray-100  shadow-md rounded-lg flex justify-center items-center">
        {letterElements}
      </div>

      {/* Keyboard Section */}
      <div className="mt-6 bg-yellow-50  p-6 rounded-lg shadow-md flex flex-wrap justify-center gap-2">
        {keyboardElements}{" "}
      </div>

      {isGameOver && (
        <button
          className="bg-blue-400 hover:bg-blue-500 px-7 py-3 rounded-md text-xl text-white shadow-md mt-3"
          onClick={startNewGame}
        >
          New Game
        </button>
      )}
    </div>
  );
};

export default App;
