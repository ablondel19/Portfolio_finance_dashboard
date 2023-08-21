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
  Legend,
  Line,
} from "recharts";
import regression, { DataPoint } from "regression";
import Spinner from "./Spinner";
import { floor, ceil } from "@/utils/utils";

const ExpensePrediction = ({ gridArea }) => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    if (!data) return [];
    const monthData = data[0].monthlyData;
    const formatted: Array<DataPoint> = monthData.map(
      ({ expenses }, index: number) => {
        return [index, parseFloat(expenses.toString())];
      }
    );
    const regressionLine = regression.linear(formatted);
    return monthData.map(({ month, expenses }, index: number) => {
      return {
        name: month.substring(0, 3),
        "Actual expenses": expenses,
        "Regression line": regressionLine.points[index][1],
        "Predicted expenses": regressionLine.predict(index + 12)[1],
      };
    });
  }, [data]);

  if (isLoading) return <Spinner />;
  const ranges = formattedData.reduce(
    (acc, data) => {
      if (data["Actual expenses"] <= acc.min)
        acc.min = floor(data["Actual expenses"]);
      if (data["Regression line"] <= acc.min)
        acc.min = floor(data["Regression line"]);
      if (data["Predicted expenses"] <= acc.min)
        acc.min = floor(data["Predicted expenses"]);
      if (data["Actual expenses"] >= acc.max)
        acc.max = ceil(data["Actual expenses"]);
      if (data["Regression line"] >= acc.max)
        acc.max = ceil(data["Regression line"]);
      if (data["Predicted expenses"] >= acc.max)
        acc.max = ceil(data["Predicted expenses"]);
      return acc;
    },
    { min: Infinity, max: -Infinity }
  );

  return (
    <ResponsiveContainer width="99%" height="65%">
      <LineChart
        data={formattedData}
        margin={{
          right: 25,
        }}
      >
        <CartesianGrid stroke={palette.grey[800]} strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tickLine={false}
          style={{ fontSize: ".7em" }}
        ></XAxis>
        <YAxis
          domain={[ranges.min, ranges.max]}
          axisLine={{ strokeWidth: "0" }}
          style={{ fontSize: ".6em" }}
          tickFormatter={(v) => `$${v}`}
        ></YAxis>
        <Tooltip
          offset={50}
          contentStyle={{
            borderColor: palette.grey[700],
            backgroundColor: palette.grey[800],
            color: palette.grey[300],
            borderRadius: "0.25rem",
          }}
        />
        <Legend
          wrapperStyle={{
            fontSize: "0.75em",
            position: "relative",
            left: "2em",
            bottom: "2em",
          }}
        />
        <Line
          type="monotone"
          dataKey="Actual expenses"
          stroke={palette.primary.main}
          strokeWidth={0}
          dot={{ strokeWidth: 1 }}
        />
        <Line
          type="monotone"
          dataKey="Regression line"
          stroke={palette.tertiary[500]}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="Predicted expenses"
          stroke={palette.secondary[500]}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExpensePrediction;
