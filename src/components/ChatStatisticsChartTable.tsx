import { ChatStatistics } from "../type";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

type ChatStatisticsChartProps = {
  chatStatistics: ChatStatistics;
};

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

function ChatStatisticsTableComponent(props: ChatStatisticsChartProps) {
  return (
    <BootstrapTable
      bootstrap4
      keyField="date"
      data={props.chatStatistics.by_date}
      columns={columns}
      pagination={paginationFactory({
        sizePerPage: 5,
        hideSizePerPage: true,
      })}
    />
  );
}

export default ChatStatisticsTableComponent;