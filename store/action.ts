import { processIDs } from "@/config"
import { Data } from "@/pages/api";

export type ReturnType = {
    type: string;
    payload: object
}

export const getSearchedLocationData = (query: Data['response']) => {
    const returnData: ReturnType = {
        type: processIDs?.searchlocation,
        payload: query
    }
    return returnData
}