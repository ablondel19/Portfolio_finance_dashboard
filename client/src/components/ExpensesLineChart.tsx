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

const ExpensesLineChart = ({ gridArea }) => {
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
        <Legend
          verticalAlign="bottom"
          wrapperStyle={{
            fontSize: "0.7em",
            bottom: "45px",
          }}
        ></Legend>
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
