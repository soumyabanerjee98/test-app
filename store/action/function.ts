import { Data, Request } from "@/pages/api";
import { actions } from "./actions";
import { processIDs, server } from "@/config";

export type Action = {
  type: string;
  data: object | any[] | any | undefined;
};

type Dispatch = (arg: Action) => void;

const callApi = async (
  processId: Request["processId"],
  reqdata: Request["data"]
) => {
  const body: Request = {
    processId: processId,
    data: reqdata,
  };
  const url =
    process.env.NODE_ENV === "production" ? server?.live : server?.test;
  const data = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await data.json();
  const responseJson: Data = {
    returnCode: response?.returnCode,
    response: response?.response,
    message: response?.message,
  };
  return responseJson;
};
export const searchLocation = (query: string) => async (dispatch: Dispatch) => {
  dispatch({ type: actions?.loading, data: null });
  const returnData = await callApi(processIDs?.searchlocation, {
    query: query,
  });
  if (returnData?.returnCode) {
    dispatch({ type: actions?.success, data: returnData?.response });
  } else {
    dispatch({ type: actions?.error, data: returnData?.response });
  }
};
