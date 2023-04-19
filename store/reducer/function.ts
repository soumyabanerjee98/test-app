import { processIDs } from "@/config";
import { ReturnType } from "../action"

const initialState = {
    data: null,
    loading: true
}

export const searchLocationReducer = (state = initialState, action: ReturnType) => {
    switch (action.type) {
        case processIDs?.searchlocation:
            return {
                ...state,
                data: action.payload,
                loading: false
            }
            break;
        default: 
            return state  
            break;  
    }
}