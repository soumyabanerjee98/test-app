import { server } from "./config";
import { Data, Request } from "./pages/api";

export const callApi = async (
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