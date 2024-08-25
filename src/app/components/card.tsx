"use client";

import React, { useState } from "react";

interface WidgetProps {
  widgetName?: string;
  widgetContent?: string;
  handleRemove: () => void;
}

function Card({ widgetName, widgetContent, handleRemove }: WidgetProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);

    setTimeout(() => {
      handleRemove();
    }, 500);
  };

  return (
    <div
      className={`card-container transition-opacity transform duration-500 ease-in-out max-sm:h-[9rem] h-[11rem] min-w-[300px] w-[22rem] flex bg-white justify-center items-center border border-slate-300 shadow-lg rounded-xl relative ${
        isVisible ? "fade-in" : "fade-out"
      }`}
    >
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 duration-300"
      >
        x
      </button>
      <p>{widgetName}</p>
    </div>
  );
}

export default Card;
