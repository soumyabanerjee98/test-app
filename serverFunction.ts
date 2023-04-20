import { processIDs, server } from "./config";
import { Data, Request } from "./pages/api";

const dotenv = require("dotenv");

dotenv.config();

const searchlocation = async (reqData: Request["data"]) => {
  const currentLocWeather = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHERAPI}&q=${reqData?.query}&days=${server?.forecastDay}&aqi=yes`
  );
  const currentLocWeatherJson = await currentLocWeather.json();
  if (currentLocWeatherJson?.error) {
    const data: Data = {
      returnCode: false,
      response: currentLocWeatherJson?.error,
      message: "Something went wrong!",
    };
    return data;
  }
  const data: Data = {
    returnCode: true,
    response: currentLocWeatherJson,
    message: "Data fetched successfully",
  };
  return data;
};

export const processHandler = async (
  processId: Request["processId"],
  reqData: Request["data"]
) => {
  switch (processId) {
    case processIDs?.searchlocation:
      return await searchlocation(reqData);
      break;
    default:
      return {
        returnCode: false,
        response: undefined,
        message: "Incorrect process ID",
      };
      break;
  }
};
