import { processIDs } from "@/config";
import { ReturnType } from "../action"

const initialState = {
    searchedLocationArray: [],
    loading: true
}

export const locationApiReducer = (state = initialState, action: ReturnType) => {
    switch (action.type) {
        case processIDs?.searchlocation:
            return {
                ...state,
                searchedLocationArray: action.payload,
                loading: false
            }
            break;
        default: 
            return state  
            break;  
    }
}