"use client";

import React from "react";

interface WidgetDrawerFuncProps {
  widgetDrawerFunc: () => void;
}

function AddWidget({ widgetDrawerFunc }: WidgetDrawerFuncProps) {
  const handleAddWidget = () => {
    widgetDrawerFunc();
  };

  return (
    <div className="add-widget-container fade-in transition-opacity transform duration-500 ease-in-out max-sm:h-[9rem] h-[11rem] min-w-[300px] w-[22rem] flex bg-white justify-center items-center border border-slate-300 shadow-lg rounded-xl">
      <button
        onClick={handleAddWidget}
        className="border text-sm rounded-md border-slate-100 h-[2rem] w-[7rem] hover:shadow-md active:scale-95 duration-150 ease-in-out"
      >
        <div className="flex justify-around items-center">
          <p className="text-slate-500">+</p>
          <p className="text-slate-500">Add Widget</p>
        </div>
      </button>
    </div>
  );
}

export default AddWidget;
