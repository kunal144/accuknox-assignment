"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./card";
import AddWidget from "./addWidget";
import { removeWidget } from "../redux/reducers/widgetSlice";
import Widgets from "./widgets";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuRefreshCcw } from "react-icons/lu";
import { FaClock } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

interface Widget {
  id: number;
  name: string;
  content: string;
}

interface Category {
  id: number;
  name: string;
  widgets: Widget[];
}

interface RootState {
  handleWidget: {
    categories: Category[];
  };
}

function Dashboard() {
  const categories = useSelector(
    (state: RootState) => state.handleWidget.categories
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const dispatch = useDispatch();

  const handleRemoveWidget = (categoryId: number, widgetId: number) => {
    dispatch(
      removeWidget({
        categoryId: categoryId,
        widgetId: widgetId,
      })
    );
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <div className="flex max-sm:text-sm  justify-between items-center p-5">
        <div className=" font-semibold">CNAPP Dashboard</div>
        <div className="flex items-center max-sm:gap-2 gap-8">
          <button
            onClick={toggleDrawer}
            className="border bg-white max-sm:w-[2rem] text-sm rounded-md border-slate-100 h-[2rem] w-[7rem] hover:shadow-md active:scale-95 duration-150 ease-in-out"
          >
            <div className="flex  justify-around items-center">
              <p className="text-slate-500 max-sm:hidden ">Add Widget</p>
              <p className="text-slate-500">+</p>
            </div>
          </button>
          <button className="border flex items-center justify-center rounded border-slate-300 bg-white h-[2rem] w-[1.8rem]">
            <LuRefreshCcw />
          </button>
          <button className="border flex items-center justify-center rounded border-slate-300 bg-white h-[2rem] w-[1.7rem]">
            <BsThreeDotsVertical />
          </button>

          <button className="border max-sm:hidden flex items-center justify-around   rounded border-blue-800 bg-white max-sm:h-[1.2rem] max-sm:w-[5rem] h-[2.2rem] w-[9.5rem]">
            <FaClock />
            <div className="h-full w-[0.06rem] bg-blue-950"></div>
            <p className="max-sm:text-xs ">Last 2 days</p>
            <IoIosArrowDown />
          </button>
        </div>
      </div>

      <SideDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

      {categories.map((category: Category) => {
        return (
          <div key={category.id} className="pl-8 h-full ">
            <p className="p-2">{category.name}</p>
            <div className="flex pb-6 gap-5 overflow-scroll">
              {category.widgets.map((widget: Widget) => (
                <div className="" key={widget.id}>
                  <Card
                    key={widget.id}
                    widgetName={widget.name}
                    handleRemove={() =>
                      handleRemoveWidget(category.id, widget.id)
                    }
                  />
                </div>
              ))}
              <AddWidget widgetDrawerFunc={toggleDrawer} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface SideDrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

function SideDrawer({ isOpen, toggleDrawer }: SideDrawerProps) {
  return (
    <div className="relative z-30">
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleDrawer}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[600px] max-sm:w-screen bg-white   transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="top-0 h-10  flex justify-between  items-center  bg-blue-800">
            <p className="pl-2 text-white">Add Widgets</p>
            <button onClick={toggleDrawer} className="p-4 text-white">
              X
            </button>
          </div>
          <p className="text-slate-600 p-2">
            Personalise your dashboard by adding the following widget
          </p>
        </div>

        <Widgets toggle={toggleDrawer} />
      </div>
    </div>
  );
}

export default Dashboard;
