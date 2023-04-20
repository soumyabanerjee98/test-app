import { processIDs } from "@/config";
import { ReturnType, settingsActions } from "../action";

const locations = [
  "New York",
  "London",
  "Dubai",
  "Mumbai",
  "Tokyo",
  "Moscow",
  "Toronto",
];

const initialState = {
  searchedLocationDetails: {},
  loading: false,
  locations: locations?.map((i) => {
    return { name: i, active: false };
  }),
  settingsOpen: false
};

export const loadingAction = "loading";

export const locationApiReducer = (
  state = initialState,
  action: ReturnType
) => {
  switch (action.type) {
    case processIDs?.searchlocation:
      return {
        ...state,
        searchedLocationDetails: action.payload,
        loading: false,
      };
      break;
    case loadingAction:
      return {
        ...state,
        searchedLocationDetails: action.payload,
        loading: true,
      };
      break;
    default:
      return state;
      break;
  }
};

export const settingsReducer = (
  state = initialState,
  action: ReturnType
) => {
  switch (action.type) {
    case settingsActions?.toggleSettings:
      return {
        ...state,
        settingsOpen: action.payload,
      };
      break;
    default:
      return state;
      break;
  }
};