import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import { response } from "./type";
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

function App() {
  const [startDate, setStartDate] = useState<moment.Moment | null>(moment('01/05/2017', 'DD/MM/YYYY'));
  const [endDate, setEndDate] = useState<moment.Moment | null>(moment('01/05/2017', 'DD/MM/YYYY'));
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
            minDate={moment('01/01/1999', 'DD/MM/YYYY')}
            isOutsideRange={() => false}
          />
        </div>
        <div className="tokenBox">
            <div className="tokenImage">
                <img alt="image" src={userImage}/>
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
    </div>
  );
}

export default App;
