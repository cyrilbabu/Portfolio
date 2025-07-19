const options = [
  "All",
  "What I Doing",
  "AI ML Realated",
  "What I Learned",
  "What I Built",
  "Job Related",
];

export default function SelectCategory({ selectedCategory }) {
  return (
    <div className="flex bg-blue-950 text-white justify-around mb-4">
      {options.map((option) => {
        const value = option === "All" ? "" : option;
        const isSelected = selectedCategory === value;
        return (
          <a
            key={option}
            href={`?category=${encodeURIComponent(value)}`}
            className={`p-2 w-full text-center font-bold text-lg ${
              isSelected ? "border-2 border-white bg-white/30 rounded" : ""
            }`}
          >
            {option}
          </a>
        );
      })}
    </div>
  );
}
