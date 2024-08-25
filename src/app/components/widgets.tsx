import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeMultipleWidgets,
  addWidgets,
} from "../redux/reducers/widgetSlice";

interface Widget {
  id: number;
  name: string;
  content: string;
}

interface Category {
  id: number;
  name: string;
  shortName: string;
  widgets: Widget[];
}

interface RootState {
  handleWidget: {
    categories: Category[];
    availableWidgets: Widget[];
  };
}

interface props {
  toggle: () => void;
}

export default function Widgets({ toggle }: props) {
  const { categories, availableWidgets } = useSelector(
    (state: RootState) => state.handleWidget
  );
  const [activeTab, setActiveTab] = useState<number>(categories[0]?.id || 0);
  const [addWidget, setAddWidgets] = useState<any>([]);
  const [removeWidgets, setRemoveWidgets] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dispatch = useDispatch();

  const filteredWidgets = availableWidgets.filter((widget) =>
    widget.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveWidgets = (
    categoryId: number,
    toRemoveWidgetId: number[]
  ) => {
    dispatch(
      removeMultipleWidgets({
        categoryId: categoryId,
        widgetIds: toRemoveWidgetId,
      })
    );

    toggle();
  };

  const handleAddWidgets = (categoryId: any, toAddWidgetId: any) => {
    dispatch(
      addWidgets({
        categoryId: categoryId,
        widgetIds: toAddWidgetId,
      })
    );
    toggle();
  };

  useEffect(() => {
    const activeCategory = categories.find(
      (category) => category.id === activeTab
    );
    const initialWidgets =
      activeCategory?.widgets.map((widget) => widget.id) || [];
    setAddWidgets(initialWidgets);
  }, [activeTab, categories]);

  const handleTabClick = (categoryId: number) => {
    setActiveTab(categoryId);
  };

  const handleCheckboxChange = (widgetId: number, isChecked: boolean) => {
    if (isChecked) {
      setAddWidgets((prev: any) => [...prev, widgetId]);

      setRemoveWidgets((prev) => prev.filter((id) => id !== widgetId));
    } else {
      setRemoveWidgets((prev) => [...prev, widgetId]);
      setAddWidgets((prev: any) => prev.filter((id: any) => id !== widgetId));
    }
  };

  return (
    <div className="w-full p-6">
      <div className="border-b border-gray-300 mb-4">
        <ul className="flex space-x-4">
          {categories.map((category) => (
            <li
              key={category.id}
              className={`relative cursor-pointer pb-2 ${
                activeTab === category.id
                  ? "text-blue-600 font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick(category.id)}
            >
              {category.shortName}
              {activeTab === category.id && (
                <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-600 rounded transition-all duration-300 ease-out"></span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search widgets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="transition-opacity duration-300 ease-in-out">
        {categories.map(
          (category) =>
            activeTab === category.id && (
              <div key={category.id}>
                {filteredWidgets.length > 0 ? (
                  filteredWidgets.map((widget) => (
                    <div
                      key={widget.id}
                      className="mb-4 flex items-center fade-in border border-slate-300 py-2 rounded"
                    >
                      <input
                        type="checkbox"
                        id={`widget-${widget.id}`}
                        className="mx-3 "
                        checked={addWidget.includes(widget.id)}
                        onChange={(e) =>
                          handleCheckboxChange(widget.id, e.target.checked)
                        }
                      />
                      <label
                        htmlFor={`widget-${widget.id}`}
                        className="text-gray-800 font-medium"
                      >
                        {widget.name}
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No widgets found.</p>
                )}
                <div className="flex justify-end mt-6 space-x-4 bottom-0">
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={toggle}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600  text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => {
                      handleRemoveWidgets(category.id, removeWidgets);
                      handleAddWidgets(category.id, addWidget);
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
