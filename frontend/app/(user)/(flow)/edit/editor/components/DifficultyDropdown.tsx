import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const difficulties = [
  { label: "Easy", value: "easy", color: "text-green-400" },
  { label: "Medium", value: "medium", color: "text-yellow-400" },
  { label: "Hard", value: "hard", color: "text-red-400" },
];

export default function DifficultyDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectOption = (val: string) => {
    setInputValue(val);
    onChange(val);
    setOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange(e.target.value);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Select or type difficulty..."
        className="border-[1px] border-gray-500 rounded-sm px-3 py-2 focus:outline-none focus:ring-0 w-full"
      />

      <div
        className={`absolute  w-full bg-[#1e1f1f] border-gray-500 rounded-md shadow-lg z-10 overflow-hidden ${
          open
            ? "opacity-100 max-h-screen  pointer-events-auto"
            : "opacity-0 max-h-0 pointer-events-none"
        } duration-500`}
      >
        {difficulties.map((d) => (
          <button
            key={d.value}
            type="button"
            onClick={() => selectOption(d.value)}
            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700/40 ${d.color}`}
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
}
