# Assembly End Game

A fun and interactive word-guessing game built with **React** and **Tailwind CSS**, where players try to guess the correct programming language before running out of lives! Inspired by the classic Hangman game — but with a developer twist

---

## Live Demo

🔗 **Play Now:** [Assembly End Game](https://assembly-end-game-sand.vercel.app/)

---

## Features

- Interactive gameplay with a virtual keyboard  
- Automatic dark/light mode support  
- Visual feedback for wrong guesses (languages fade with skulls)  
- Win/Lose messages with themed styling  
- Reveals unguessed letters in red when you lose  
- Responsive design for desktop and mobile  

---

## Tech Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS  
- **State Management:** React Hooks (`useState`, `useEffect`)  
- **Deployment:** Vercel  

---

## Game Logic Overview

1. A random programming language is selected as the word to guess.  
2. The player clicks letters on the on-screen keyboard.  
3. Correct guesses reveal letters; wrong guesses mark a language as "lost" (💀).  
4. When all letters are revealed → “You Win!” message appears.  
5. When guesses run out → “You Lose! Better start learning Assembly.” message shows.  
6. The entire keyboard is disabled after game over.  

---

## Theming

- **Light Mode:** Soft gray and yellow backgrounds  
- **Dark Mode:** Tailwind’s `dark:` variants automatically switch background and text colors  

---
