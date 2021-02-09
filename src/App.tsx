import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import { ChatStatistics } from "./type";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import userImage from "./images/user.svg";
import graphImage from "./images/graph.svg";
import ChatStatisticsTableComponent from "./components/ChatStatisticsChartTable";
import ChatStatisticsChartComponent from "./components/ChatStatisticsChart";
import { fetchChatStatistics } from "./Api";

function App() {
  const [startDate, setStartDate] = useState<moment.Moment | null>(
    moment("01/05/2017", "DD/MM/YYYY")
  );
  const [endDate, setEndDate] = useState<moment.Moment | null>(
    moment("01/05/2017", "DD/MM/YYYY")
  );
  const [token, setToken] = useState<string | undefined>(
    localStorage.getItem("token") || undefined
  );
  const [response, setResponse] = useState<ChatStatistics>();
  const [focusedInput, setFocusedInput] = useState<
    "startDate" | "endDate" | null
  >(null);

  useEffect(() => {
    const start = localStorage.getItem("startDate");
    const end = localStorage.getItem("endDate");
    if (start) {
      setStartDate(moment(start));
    }

    if (end) {
      setEndDate(moment(end));
    }
  }, []);

  useEffect(() => {
    if (startDate && endDate && token && token.length > 0) {
      localStorage.setItem("startDate", startDate.toISOString());
      localStorage.setItem("endDate", endDate.toISOString());
      localStorage.setItem("token", token);

      fetchChatStatistics(startDate, endDate, token).then((data) =>
        setResponse(data)
      );
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
            value={token}
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

      {response && <ChatStatisticsTableComponent chatStatistics={response} />}

      {response && (
        <div className="statistics">
          <div className="statisticsText">
            <img alt="graph-image" src={graphImage} /> Graph
          </div>
          <ChatStatisticsChartComponent chatStatistics={response} />
        </div>
      )}
    </div>
  );
}

export default App;
