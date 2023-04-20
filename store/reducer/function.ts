import { processIDs } from "@/config";
import { ReturnType, settingsActions } from "../action";

const locations = [
  {loc: "New York", curr: 'USD'},
  {loc: "London", curr: 'EUR'},
  {loc: "Dubai", curr: 'AED'},
  {loc: "Mumbai", curr: 'INR'},
  {loc: "Tokyo", curr: 'JPY'},
  {loc: "Moscow", curr: 'RUB'},
  {loc: "Toronto", curr: 'CAD'}
];

const options = ["Weather", "Currency"];

const locationinitialState = {
  searchedLocationDetails: {},
  loading: false,
};

const settingsinitialState = {
  locations: locations?.map((i) => {
    return { name: i?.loc, active: false, currency: i?.curr };
  }),
  options: options?.map((i, idx) => {
    if(idx === 0){
      return {opt: i, active: true}
    }
    return {opt: i, active: false}
  }),
  settingsOpen: false,
};

export const loadingAction = "loading";

export const locationApiReducer = (
  state = locationinitialState,
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
  state = settingsinitialState,
  action: ReturnType
) => {
  switch (action.type) {
    case settingsActions?.toggleSettings:
      return {
        ...state,
        settingsOpen: action.payload,
      };
      break;
      case settingsActions?.activeLocation:
      return {
        ...state,
        locations: state?.locations?.map((i) => {
          if(i?.name === action.payload){
            return {...i, active: true}
          }
          return {...i, active: false}
        }),
      };
      break;
      case settingsActions?.toggleOptions:
      return {
        ...state,
        options: state?.options?.map((i) => {
          if(i?.opt === action.payload){
            return {...i, active: !i?.active}
          }
          return i
        }),
      };
      break;
    default:
      return state;
      break;
  }
};
