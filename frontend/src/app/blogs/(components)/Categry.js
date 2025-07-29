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
    <div className="w-full overflow-x-auto scrollbar-hide mb-4">
      <div className="flex gap-3 md:gap-6 whitespace-nowrap px-4 py-1 bg-blue-950 rounded-lg text-white justify-start md:justify-around">
        {options.map((option) => {
          const value = option === "All" ? "" : option;
          const isSelected = selectedCategory === value;
          return (
            <a
              key={option}
              href={`?category=${encodeURIComponent(value)}`}
              className={`px-4 py-1 w-full text-center font-semibold text-sm md:text-lg rounded transition ${
                isSelected
                  ? "border-2 border-white bg-white/30"
                  : "hover:bg-white/10"
              }`}
            >
              {option}
            </a>
          );
        })}
      </div>
    </div>
  );
}
