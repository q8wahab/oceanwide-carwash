import React from "react";

type SnakeRowProps = {
  count: number;
  startIndex: number;
  totalWashes: number;
  reverse?: boolean;
};

const SnakeRow: React.FC<SnakeRowProps> = ({ count, startIndex, totalWashes, reverse = false }) => {
  const circles = Array.from({ length: count }, (_, i) => {
    const index = startIndex + i;
    const filled = index < totalWashes;
    return (
      <div
        key={index}
        className={`w-4 h-4 rounded-full ${filled ? "bg-teal-500" : "bg-gray-300"}`}
      ></div>
    );
  });

  return (
    <div className={`flex justify-center items-center space-x-2 my-1 ${reverse ? "flex-row-reverse" : ""}`}>
      {circles}
    </div>
  );
};

export default SnakeRow;
