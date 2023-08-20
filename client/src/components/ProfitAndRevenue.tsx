import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Legend,
} from "recharts";
import Spinner from "./Spinner";
import { LayoutState } from "@/main";
import { useSelector } from "react-redux";

const ProfitAndRevenueLineChart = ({ gridArea }) => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetKpisQuery();

  const revenueAndProfit = useMemo(() => {
    return (
      data !== undefined &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: (revenue - expenses).toFixed(2),
        };
      })
    );
  }, [data]);

  if (isLoading) return <Spinner />;
  const minLeft = data[0].ranges.profit.min;
  const maxLeft = data[0].ranges.profit.max;
  const minRight = data[0].ranges.revenue.min;
  const maxRight = data[0].ranges.revenue.max;

  return (
    <ResponsiveContainer width="99%" height="100%">
      <LineChart
        data={revenueAndProfit}
        margin={{
          top: 30,
          right: -10,
          left: -10,
          bottom: 40,
        }}
      >
        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
        <XAxis dataKey="name" tickLine={false} style={{ fontSize: ".7em" }} />
        <YAxis
          yAxisId="left"
          tickLine={false}
          axisLine={false}
          style={{ fontSize: ".6em" }}
          domain={[minLeft, maxLeft]}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickLine={false}
          axisLine={false}
          domain={[minRight, maxRight]}
          style={{ fontSize: ".6em" }}
        />
        <Tooltip
          labelStyle={{
            color: palette.grey[400],
          }}
          contentStyle={{
            backgroundColor: palette.grey[800],
            borderRadius: "1rem",
            offset: 50,
          }}
        />
        <Legend
          verticalAlign="bottom"
          wrapperStyle={{
            alignItems: "left",
            fontSize: "0.7em",
            bottom: "45px",
            left: "-10px",
          }}
        ></Legend>
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="profit"
          stroke={palette.tertiary[500]}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="revenue"
          stroke={palette.primary.main}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProfitAndRevenueLineChart;
