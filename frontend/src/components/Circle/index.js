import React from "react";

export const Circle = ({ item, clickEvent, isFlipped, isInActive,index }) => {
  if (isInActive) {
    isFlipped = true;
  }

  const handleClick = () => {
    !isFlipped && clickEvent(index);
  };

  return (
    <div
      className={`w-24 h-24 rounded-full m-4 bg-gray-600 flex flex-wrap justify-center items-center card 
        ${isFlipped ? "is-flipped" : ""} 
      `}
      onClick={handleClick}
    >
      <div className="card-face card-front-face"></div>
      <div className="card-face card-back-face text-3xl font-bold">
        {item.item}
      </div>
    </div>
  );
};
