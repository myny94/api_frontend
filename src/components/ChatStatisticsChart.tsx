import { ChatStatistics, ChatStatisticsByDate } from "../type";
import { Line, ChartData } from "react-chartjs-2";
import * as chartjs from "chart.js";

type ChatStatisticsChartProps = {
  chatStatistics: ChatStatistics;
};

// chart colors list
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

function responseToLineData(
  byDate: ChatStatisticsByDate[]
): ChartData<chartjs.ChartData> {
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
    data: byDate.map((data) => ({ x: new Date(data.date), y: data[key] })),
    label: label,
    borderColor: colors[index % colors.length],
    fill: false,
    type: "line",
  }));

  return {
    labels: byDate.map((x) => x.date),
    datasets: datasets,
  };
}

function ChatStatisticsChartComponent(props: ChatStatisticsChartProps) {
  return (
    <Line
      data={responseToLineData(props.chatStatistics.by_date)}
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
  );
}

export default ChatStatisticsChartComponent;
