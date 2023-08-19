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
} from "recharts";
import Spinner from "./Spinner";

const ExpensesLineChart = () => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetKpisQuery();

  const operationalExpenses = useMemo(() => {
    return (
      data !== undefined &&
      data[0].monthlyData.map(
        ({ month, nonOperationalExpenses, operationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Non operational expenses": nonOperationalExpenses,
            "Operational expenses": operationalExpenses,
          };
        }
      )
    );
  }, [data]);

  if (isLoading) return <Spinner />;
  const minLeft = data[0].ranges.nonOpExp.min;
  const maxLeft = data[0].ranges.nonOpExp.max;
  const minRight = data[0].ranges.opExp.min;
  const maxRight = data[0].ranges.opExp.max;

  return (
    <ResponsiveContainer width="99%" height="100%">
      <LineChart
        data={operationalExpenses}
        margin={{
          top: 20,
          right: 0,
          left: -10,
          bottom: 60,
        }}
      >
        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
        <XAxis dataKey="name" tickLine={false} style={{ fontSize: ".7em" }} />
        <YAxis
          yAxisId="left"
          orientation="left"
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
          style={{ fontSize: ".6em" }}
          domain={[minRight, maxRight]}
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
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="Non operational expenses"
          stroke={palette.tertiary[500]}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="Operational expenses"
          stroke={palette.primary.main}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExpensesLineChart;
