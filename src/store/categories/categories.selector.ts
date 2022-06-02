import { createSelector } from "reselect";
import { RootState } from "../store";
import { CategoriesState } from "./categories.reducer";
import { CategoryMap } from "./categories.type";

const selectCategoriesReducer = (state: RootState): CategoriesState => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap => {
    return categories.reduce(
      (acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
      },
      {} as CategoryMap //Note, this is the initial value of the returning map
    );
  }
);

export const selectIsCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  (categories) => categories.isLoading
);
