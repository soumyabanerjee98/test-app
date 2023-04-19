import { processIDs } from "@/config"

export type ReturnType = {
    type: string;
    payload: object
}

export const getSearchedLocationData = (query: object) => {
    const returnData: ReturnType = {
        type: processIDs?.searchlocation,
        payload: query
    }
    return returnData
}