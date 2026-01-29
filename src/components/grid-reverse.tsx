import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function GridReverse() {
  const [totalCells, setTotalCells] = useState(0);
  const [inputValue, setInputValue] = useState<number>(0);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [selectedGrid, setSelectedGrid] = useState<number[]>([]);

  const handleGridSelect = (index: number) => {
    console.log("Selected Grid Index:", index);
    setSelectedGrid((prev) => {
      if (prev.includes(index)) return prev;
      const next = [...prev, index];

      if (next.length === totalCells) {
        setIsResetting(true);
      }

      return next;
    });
  };

  useEffect(() => {
    if (!isResetting) return;

    const id = setInterval(() => {
      setSelectedGrid((prev) => {
        if (prev.length < 1) {
          clearInterval(id);
          setIsResetting(false);
          return [];
        }

        const next = [...prev];
        next.pop();
        return next;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isResetting]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div>
        <h1>Grid Reverse</h1>
        <div className="flex gap-2 mt-2">
          <input
            disabled={isResetting}
            type="number"
            placeholder="Number of Cells..."
            className="border-black border px-2 py-1 rounded text-xs w-[150px]"
            onChange={(e) => {
              setInputValue(parseInt(e.target.value));
            }}
          />
          <button
            onClick={() => {
              setTotalCells(inputValue || 0);
            }}
            className="bg-black text-white px-1 py-1 cursor-pointer rounded text-xs"
          >
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-5 mt-5 gap-2 cursor-pointer">
          {/* [...Array(totalCells)].map || Array(totalCells).fill(null).map : these can be used */}
          {Array.from({ length: totalCells }).map((_, index) => (
            <div
              onClick={() => handleGridSelect(index)}
              key={index}
              className={`w-8 h-8 flex items-center justify-center border rounded-sm ${
                selectedGrid.includes(index)
                  ? "bg-green-400 text-white"
                  : "bg-gray-2100"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
