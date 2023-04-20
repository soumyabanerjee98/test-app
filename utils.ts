import { Data, Request } from "./pages/api";

export const callApi = async (
  processId: Request["processId"],
  reqdata: Request["data"]
) => {
  const body: Request = {
    processId: processId,
    data: reqdata,
  };
  const data = await fetch('/api', {
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

export const monthName = (num: string) => {
  switch (num) {
    case "01":
      return "January";
      break;
    case "02":
      return "February";
      break;
    case "03":
      return "March";
      break;
    case "04":
      return "April";
      break;
    case "05":
      return "May";
      break;
    case "06":
      return "June";
      break;
    case "07":
      return "July";
      break;
    case "08":
      return "August";
      break;
    case "09":
      return "September";
      break;
    case "10":
      return "October";
      break;
    case "11":
      return "November";
      break;
    case "12":
      return "December";
      break;
    default:
      return "";
      break;
  }
};

export const timeFormat = (time: string) => {
  const hr = time?.split(':')?.[0]
  const min = time?.split(':')?.[1]
  let meridian = 'AM'
  let formathr = hr
  if(parseInt(hr) > 12 && parseInt(hr) < 25){
    meridian = 'PM';
    formathr = (parseInt(hr) - 12).toString()
  }
  return `${formathr}:${min} ${meridian}`
}

export const formatDate = (date: string) => {
  const day = date?.split("-")?.[2];
  const month = monthName(date?.split("-")?.[1]);
  return `${month} ${day}`
}

export const formatDateTime = (localtime: string) => {
  const currLocDate = localtime?.split(" ")?.[0]?.toString();
  const currLocTime = localtime?.split(" ")?.[1]?.toString();
  const day = currLocDate?.split("-")?.[2];
  const month = monthName(currLocDate?.split("-")?.[1]);
  const year = currLocDate?.split("-")?.[0];
  const time = timeFormat(currLocTime);
  return `${time} ${month} ${day}, ${year}`
}