import { useEffect, useState } from "react";

export default function TicTacToe() {
  const [gridSize, setGridSize] = useState<number>(0);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [board, setBoard] = useState<string[]>([]);
  const [, setWinner] = useState<string | null>(null);

  const checkWinner = (board: string[], size: number) => {
    // Check rows
    // Check columns
    // Check diagonals
  };

  const options = [
    { name: "3 x 3", value: 3 },
    { name: "4 x 4", value: 4 },
    { name: "5 x 5", value: 5 },
  ];

  const handleClick = (index: number) => {
    console.log("Clicked Cell Index:", index);
    if (board[index]) return; // Prevent overwriting a cell
    setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
    // Update board state here
    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[index] = currentPlayer;
      return newBoard;
    });
  };

  useEffect(() => {
    console.log("Selected Grid Size:", gridSize);
    console.log("Current Player:", currentPlayer);
  }, [gridSize, currentPlayer]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-md font-medium ">Tic Tac Toe</h1>
      <select
        onChange={(e) => setGridSize(Number(e.target.value))}
        className="mt-2 border border-black px-2 py-1 rounded"
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
    </div>
  );
}
