import React, { useEffect, useState, useRef } from "react";
import Calendar from "react-calendar";
import logo from "./logo.svg";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import { response } from "./type";
import { formatDate } from "./helper";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import userImage from "./images/user.svg";
import DatePicker from 'react-date-picker';

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
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [token, setToken] = useState<string>("");
  const [response, setResponse] = useState<response>();

  useEffect(() => {
    fetch(
      `https://api.giosg.com/api/reporting/v1/rooms/84e0fefa-5675-11e7-a349-00163efdd8db/chat-stats/daily/?start_date=${formatDate(
        startDate
      )}&end_date=${formatDate(endDate)}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setResponse(data));
  }, [startDate, endDate, token]);

  return (
    <div className="App">
      <Calendar
        onChange={(dates) => {
          if (Array.isArray(dates)) {
            setStartDate(dates[0]);
            setEndDate(dates[1]);
          }
        }}
        value={[startDate, endDate]}
        selectRange={true}
        defaultActiveStartDate={new Date(2017, 4, 1)}
      />
      <div className="inputBoxes">
        <div className="dateBoxes">
          <div className="dateBox">
            <div className="inputText">Start date</div>
            <div className="inputBox">{formatDate(startDate)}</div>
          </div>
          <div className="dateBox">
            <div className="inputText">End date</div>
            <div className="inputBox">{formatDate(endDate)}</div>
          </div>
        </div>
        <input
          className="tokenBox"
          placeholder="Access token"
          onChange={(event) => setToken(event.target.value)}
        ></input>
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
