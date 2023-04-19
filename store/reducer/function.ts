import { actions } from "../action/actions";
import { Action } from "../action/function";

const searchlocation = {
  data: null,
  loading: false,
};

export const searchLocationReducer = (state = searchlocation, action: Action) => {
  switch (action.type) {
    case actions?.loading: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions?.success: {
      return {
        ...state,
        loading: false,
        data: action?.data 
      };
    }
    case actions?.error: {
      return {
        ...state,
        loading: false,
        data: action?.data
      };
    }
    default:
      return state;
  }
};
