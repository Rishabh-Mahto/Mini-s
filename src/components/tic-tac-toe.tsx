import { useEffect, useState } from "react";

export default function TicTacToe() {
  const [gridSize, setGridSize] = useState<number>(0);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [board, setBoard] = useState<string[]>([]);
  const [winningCombinations, setWinningCombinations] = useState<number[][]>(
    [],
  );
  const [winner, setWinner] = useState<string | null>(null);

  const genrateWinningCombinations = (size: number) => {
    const combinations: number[][] = [];

    //rows
    for (let row = 0; row < size; row++) {
      // [[0,1,2], [3,4,5], [6,7,8]]
      const winRow: number[] = [];
      for (let col = 0; col < size; col++) {
        winRow.push(row * size + col);
      }
      combinations.push(winRow);
    }

    //columns
    for (let col = 0; col < size; col++) {
      // [[0,3,6], [1,4,7], [2,5,8]]
      const winCol: number[] = [];
      for (let row = 0; row < size; row++) {
        winCol.push(col + row * size);
      }
      combinations.push(winCol);
    }

    //diagonals
    const winDiag1: number[] = [];
    for (let i = 0; i < size; i++) {
      winDiag1.push(i * size + i);
    }
    combinations.push(winDiag1);

    const winDiag2: number[] = [];
    for (let i = 0; i < size; i++) {
      winDiag2.push(i * size + (size - 1 - i));
    }
    combinations.push(winDiag2);

    return combinations;
  };

  const options = [
    { name: "3 x 3", value: 3 },
    { name: "4 x 4", value: 4 },
    { name: "5 x 5", value: 5 },
  ];

  const handleClick = (index: number) => {
    console.log("Clicked Cell Index:", index);
    if (board[index]) return; // Prevent overwriting a cell

    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[index] = currentPlayer;
      return newBoard;
    });

    setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
  };

  const checkWinner = () => {};

  useEffect(() => {
    if (!gridSize) return;

    setWinningCombinations(genrateWinningCombinations(gridSize));
    setBoard(Array(gridSize * gridSize).fill(null));
    setCurrentPlayer("X");
  }, [gridSize]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-md font-medium ">Tic Tac Toe</h1>
      <div className="flex mt-2 gap-2 items-center justify-center">
        {" "}
        <select
          onChange={(e) => {
            setBoard([]);
            setGridSize(Number(e.target.value));
            setCurrentPlayer("X");
            setWinner(null);
          }}
          className="border border-black px-2 py-1 rounded"
        >
          <option value={0}>Select Grid</option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="m-2 p-2 border border-black rounded"
            >
              {option.name}
            </option>
          ))}
        </select>
        <button
          className="cursor-pointer border border-black p-1 text-xs rounded bg-black text-white"
          onClick={() => {
            setBoard([]);
            setCurrentPlayer("X");
            setWinner(null);
          }}
        >
          Reset
        </button>
      </div>
      <div
        className="mt-4 gap-2 grid"
        style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
      >
        {" "}
        {Array(gridSize * gridSize)
          .fill(null)
          .map((_, index) => (
            <div
              onClick={() => handleClick(index)}
              key={index}
              className="w-10 h-10 border border-black cursor-pointer flex items-center justify-center"
            >
              {board[index]}
            </div>
          ))}
      </div>
      {winner && <h1 className="mt-4 text-xl font-bold">Winner: {winner}</h1>}
    </div>
  );
}
