export type ReturnType = {
    type: string;
    payload: object
}

export const settingsActions = {
    toggleSettings: 'toggleSettings'
}

export const getLocationApiData = (type: string, query: object) => {
    const returnData: ReturnType = {
        type: type,
        payload: query
    }
    return returnData
}

export const getSettingsData = (action: string, payload: any) => {
    const returnData: ReturnType = {
        type: action,
        payload: payload
    }
    return returnData
}