export type ReturnType = {
    type: string;
    payload: object | string
}

export const getLocationApiData = (type: string, query: object) => {
    const returnData: ReturnType = {
        type: type,
        payload: query
    }
    return returnData
}

export const settingsActions = {
    toggleSettings: 'toggleSettings',
    activeLocation: 'activeLocation',
    toggleOptions: 'toggleOptions',
}

export const getSettingsData = (action: string, payload: any) => {
    const returnData: ReturnType = {
        type: action,
        payload: payload
    }
    return returnData
}