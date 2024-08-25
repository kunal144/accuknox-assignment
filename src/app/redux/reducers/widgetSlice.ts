import { createSlice } from "@reduxjs/toolkit";
import dashboard from "../../dashboardData/data.json";

const initialState = {
  categories: dashboard.categories,
  availableWidgets: dashboard.availableWidgets,
};

interface addWidgets {
  categoryId: number;
  widgetIds: number[];
}

const widgetSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addWidgets: (state, action) => {
      const { categoryId, widgetIds } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);

      if (category) {
        const newWidgets = widgetIds
          .map((id: any) =>
            state.availableWidgets.find((widget) => widget.id === id)
          )
          .filter(
            (widget: any) =>
              widget && !category.widgets.some((w) => w.id === widget.id)
          );

        category.widgets.push(...newWidgets);
        console.log("Updated Widgets:", category.widgets);
      } else {
        console.warn(`Category with ID ${categoryId} not found`);
      }
    },

    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      console.log(widgetId);
      if (category) {
        category.widgets = category.widgets.filter((w) => w.id !== widgetId);

        console.log("Updated Widgets:", category.widgets);
      } else {
        console.warn(`Category with ID ${categoryId} not found`);
      }
    },
    removeMultipleWidgets: (state, action) => {
      const { categoryId, widgetIds } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);

      if (category) {
        category.widgets = category.widgets.filter(
          (w) => !widgetIds.includes(w.id)
        );
        console.log("Updated Widgets:", category.widgets);
      } else {
        console.warn(`Category with ID ${categoryId} not found`);
      }
    },
  },
});

export const { addWidgets, removeWidget, removeMultipleWidgets } =
  widgetSlice.actions;

export default widgetSlice.reducer;
