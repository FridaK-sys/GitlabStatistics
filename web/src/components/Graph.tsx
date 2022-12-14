import { commitsByDate } from "../api/types";
import { format, parseISO } from "date-fns";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import "./Graph.css"
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Chart(props: { data: commitsByDate[] }) {
  
  const { theme } = useContext(ThemeContext);
  const graphColor = theme === 'dark'? '#212529' : '#f5f5f5';
  const strokeColor = '#212529';
  const filteredData = props.data.slice();

  /** 
  * Function returns a custom tooltip for the graph
  *
  * @param active
  * @param payload
  * @param label
  * @returns all commits from main
  */
  function CustomTooltip({ active, payload, label }: any) {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="date">
            <strong>{format(parseISO(label), "eeee, d MMM, yyyy")}</strong>
          </p>
          <p className="numberOfCommits">
            Commits: {JSON.stringify(payload[0].value, null, 2)}
          </p>
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
        data={filteredData}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="fill-color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={graphColor} stopOpacity={0.7} />
              <stop offset="100%" stopColor={graphColor} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
          dataKey="date"
          tickFormatter={(str: any) => {
            if ( str === 'auto' || str === 0){
              return str;
            } else{
              const dateObject = parseISO(str);
              return format(dateObject, "MMM d");
            }
          }}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Area
          type="monotone"
          dataKey="commits"
          stroke={strokeColor}
          fill="url(#fill-color)"
          activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}