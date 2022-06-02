import { AnyAction } from "redux";
import { CATEGORIES_ACTION_TYPE } from "./categories.type";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.action";
import { Category } from "./categories.type";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = INITIAL_STATE,
  action = {} as AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
      return {
        ...state,
        isLoading: true,
      };  
  }

  if (fetchCategoriesSuccess.match(action)) {
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };
  }

  if (fetchCategoriesFailed.match(action)) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
  }

  return state;
};
