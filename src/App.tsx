import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import logo from "./logo.svg";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import { response } from "./type"
import { formatDate } from "./helper";

function App() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [value, onChange] = useState(new Date());
  const [response, setResponse] = useState<response>();

  useEffect(() => {
    fetch(`https://api.giosg.com/api/reporting/v1/rooms/84e0fefa-5675-11e7-a349-00163efdd8db/chat-stats/daily/?start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}`, {
        method: "GET",
        headers: {
            'Authorization': process.env.REACT_APP_TOKEN ?? '',
        }
    }).then((response) => response.json())
      .then((data) => setResponse(data));
  }, [startDate, endDate]);

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
        defaultActiveStartDate={new Date(2017,4,1)}
      />
      <div className="dateBox">Start date: {formatDate(startDate)}</div>
      <div className="dateBox">Start date: {formatDate(endDate)}</div>
      <div>Total conversation count: {response?.total_chats_from_autosuggest_count}</div>
      <div>Total user message count: {response?.total_chats_from_user_count}</div>
      <div>Total visitor message count: {response?.total_chats_from_visitor_count}</div>
    </div>
  );
}

export default App;
