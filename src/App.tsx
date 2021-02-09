import { useEffect, useState, useMemo } from "react";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import { response, date_data } from "./type";
import { formatDate } from "./helper";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import userImage from "./images/user.svg";
import graphImage from "./images/graph.svg";
import * as chartjs from "chart.js";
import { Line, ChartData } from "react-chartjs-2";

const columns = [
  {
    dataField: "conversation_count",
    text: "total conversation",
  },
  {
    dataField: "missed_chat_count",
    text: "Missed chat",
  },
  {
    dataField: "visitors_with_conversation_count",
    text: "Visitors with conversation",
  },
  {
    dataField: "date",
    text: "Date",
    sort: true,
  },
];

const colors = [
    "#3366cc",
    "#dc3912",
    "#ff9900",
    "#109618",
    "#990099",
    "#0099c6",
    "#dd4477",
    "#66aa00",
    "#b82e2e",
    "#316395",
    "#994499",
    "#22aa99",
    "#aaaa11",
    "#6633cc",
    "#e67300",
    "#8b0707",
    "#651067",
    "#329262",
    "#5574a6",
    "#3b3eac",
    "#b77322",
    "#16d620",
    "#b91383",
    "#f4359e",
    "#9c5935",
    "#a9c413",
    "#2a778d",
    "#668d1c",
    "#bea413",
    "#0c5922",
    "#743411",
];

function responseToLineData(response: response): ChartData<chartjs.ChartData> {
  const datasets = [
    {
      label: "Chats from autosuggest",
      key: "chats_from_autosuggest_count" as const,
    },
    { label: "Chats from user", key: "chats_from_user_count" as const },
    { label: "Chats from visitor", key: "chats_from_visitor_count" as const },
    { label: "Conversation", key: "conversation_count" as const },
    { label: "Missed chat", key: "missed_chat_count" as const },
    { label: "User message", key: "user_message_count" as const },
    { label: "Visitor message", key: "visitor_message_count" as const },
    {
      label: "Visitors affected by chat",
      key: "visitors_affected_by_chat_count" as const,
    },
    {
      label: "Visitors autosuggested",
      key: "visitors_autosuggested_count" as const,
    },
    { label: "Visitors with chat", key: "visitors_with_chat_count" as const },
    {
      label: "Visitors with conversation",
      key: "visitors_with_conversation_count" as const,
    },
  ].map(({ label, key }, index) => ({
    data: response.by_date.map((x) => ({ x: new Date(x.date), y: x[key] })),
    label: label,
    borderColor: colors[index % colors.length],
    fill: false,
    type: "line",
  }));

  return {
    labels: response.by_date.map((x) => x.date),
    datasets: datasets,
  };
}

function App() {
  const [startDate, setStartDate] = useState<moment.Moment | null>(
    moment("01/05/2017", "DD/MM/YYYY")
  );
  const [endDate, setEndDate] = useState<moment.Moment | null>(
    moment("01/05/2017", "DD/MM/YYYY")
  );
  const [token, setToken] = useState<string | undefined>();
  const [response, setResponse] = useState<response>();
  const [focusedInput, setFocusedInput] = useState<
    "startDate" | "endDate" | null
  >("startDate");

  useEffect(() => {
    if (startDate && endDate && token) {
      fetch(
        `https://api.giosg.com/api/reporting/v1/rooms/84e0fefa-5675-11e7-a349-00163efdd8db/chat-stats/daily/?start_date=${formatDate(
          startDate.toDate()
        )}&end_date=${formatDate(endDate.toDate())}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => setResponse(data));
    }
  }, [startDate, endDate, token]);

  return (
    <div className="App">
      <div className="inputBoxes">
        <div className="dateBox">
          <div className="inputText">Pick date range</div>
          <DateRangePicker
            startDate={startDate}
            startDateId="start_date"
            endDate={endDate}
            endDateId="end_date"
            focusedInput={focusedInput}
            onFocusChange={(x) => setFocusedInput(x)}
            displayFormat={"YYYY-MM-DD"}
            onDatesChange={(dates) => {
              setStartDate(dates.startDate);
              setEndDate(dates.endDate);
            }}
            startDateAriaLabel={"start date"}
            endDateAriaLabel={"end date"}
            orientation={"horizontal"}
            keepOpenOnDateSelect={false}
            minDate={moment("01/01/1999", "DD/MM/YYYY")}
            isOutsideRange={() => false}
          />
        </div>
        <div className="tokenBox">
          <div className="tokenImage">
            <img alt="image" src={userImage} />
          </div>
          <input
            className="tokenInput"
            placeholder="Access token"
            onChange={(event) => setToken(event.target.value)}
          ></input>
        </div>
      </div>
      <div className="displayBoxes">
        <div className="displayBox">
          <div className="boxNumber">{response?.total_conversation_count}</div>
          <div className="boxText">Total conversation count</div>
        </div>
        <div className="displayBox">
          <div className="boxNumber">{response?.total_user_message_count}</div>
          <div className="boxText">Total user message count</div>
        </div>
        <div className="displayBox">
          <div className="boxNumber">
            {response?.total_visitor_message_count}
          </div>
          <div className="boxText">Total visitor message count</div>
        </div>
      </div>

      {console.log("response", response)}
      {console.log("token", token)}
      {response && (
        <BootstrapTable
          bootstrap4
          keyField="date"
          data={response.by_date}
          columns={columns}
          pagination={paginationFactory({
            sizePerPage: 5,
            hideSizePerPage: true,
          })}
        />
      )}

      {response && (
        <div className="statistics">
          <div className="statisticsText"><img alt="graph-image" src={graphImage} /> Graph</div>
          <Line
            data={responseToLineData(response)}
            options={{
              scales: {
                displayFormats: {
                  millisecond: "DD.MM.YYYY",
                  second: "DD.MM.YYYY",
                  minute: "DD.MM.YYYY",
                  hour: "DD.MM.YYYY",
                  day: "DD.MM.YYYY",
                  week: "DD.MM.YYYY",
                  month: "DD.MM.YYYY",
                  quarter: "DD.MM.YYYY",
                  year: "DD.MM.YYYY",
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
