export type ReturnType = {
    type: string;
    payload: object
}

export const getLocationApiData = (type: string, query: object) => {
    const returnData: ReturnType = {
        type: type,
        payload: query
    }
    return returnData
}