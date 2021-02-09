import { ChatStatistics } from "./type";
import { formatDate } from "./helper";
import * as moment from "moment";

export function fetchChatStatistics(
  startDate: moment.Moment,
  endDate: moment.Moment,
  token: string
): Promise<ChatStatistics> {
  return fetch(
    `https://api.giosg.com/api/reporting/v1/rooms/84e0fefa-5675-11e7-a349-00163efdd8db/chat-stats/daily/?start_date=${formatDate(
      startDate.toDate()
    )}&end_date=${formatDate(endDate.toDate())}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  ).then((response) => response.json());
}
