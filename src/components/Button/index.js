import React from "react";

export const Button = (props) => {
  const { color, hoverColor, clickEvent, text, additionalClass } = props;
  return (
    <button
      className={`text-white font-bold py-2 px-4 mr-2 
      rounded-full ${additionalClass} ${color} hover:${hoverColor}`}
      onClick={(e) => clickEvent(e)}
    >
      {text}
    </button>
  );
};
