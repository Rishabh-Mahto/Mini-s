import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function GridReverse() {
  const [totalCells, setTotalCells] = useState(0);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [selectedGrid, setSelectedGrid] = useState<number[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

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
    setSelectedGrid([]);
    setIsResetting(false);
  }, [totalCells]);

  useEffect(() => {
    if (!isResetting) return;
    if (selectedGrid.length === 0) {
      setIsResetting(false);
      return;
    }

    const id = setTimeout(() => {
      setSelectedGrid((prev) => prev.slice(0, -1));
    }, 1000);

    return () => clearTimeout(id);
  }, [isResetting, selectedGrid]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div>
        <h1>Grid Reverse</h1>
        <div className="flex gap-2 mt-2">
          <input
            disabled={isResetting}
            ref={inputRef}
            type="number"
            placeholder="Number of Cells..."
            className="border-black border px-2 py-1 rounded text-xs w-[150px]"
          />
          <button
            onClick={() => {
              setTotalCells(Number(inputRef.current?.value) || 0);
            }}
            className="bg-black text-white px-1 py-1 cursor-pointer rounded text-xs"
          >
            <ArrowRight size={16} />
          </button>
        </div>
        <div
          className={`grid grid-cols-5 mt-5 gap-2 ${
            isResetting ? "pointer-events-none opacity-50" : "cursor-pointer"
          }`}
        >
          {/* [...Array(totalCells)].map || Array(totalCells).fill(null).map : these can be used */}
          {Array.from({ length: totalCells }).map((_, index) => (
            <div
              onClick={() => handleGridSelect(index)}
              key={index}
              className={`w-8 h-8 flex items-center justify-center border border-gray-400 rounded-sm ${
                selectedGrid.includes(index)
                  ? "bg-green-400 text-white"
                  : "bg-gray-100"
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
