import { processHandler } from "@/serverFunction";
import type { NextApiRequest, NextApiResponse } from "next";

export type Data = {
  returnCode: boolean | undefined;
  response: object | any[] | string | any | undefined;
  message: string | undefined;
};

export type Request = {
  processId: string;
  data: object | undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const reqBody: Request = {
    processId: req?.body?.processId,
    data: req?.body?.data
  }
  if (req?.method === "POST") {
    const data = await processHandler(reqBody?.processId, reqBody?.data);
    res?.send({
      returnCode: data?.returnCode,
      response: data?.response,
      message: data?.message
    });
    return;
  }
  res?.send({
    returnCode: true,
    response: null,
    message: "Server running",
  });
}
