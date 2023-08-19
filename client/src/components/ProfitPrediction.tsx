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

const ProfitPrediction = () => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    if (!data) return [];
    const monthData = data[0].monthlyData;
    const formatted: Array<DataPoint> = monthData.map(
      ({ profit }, index: number) => {
        return [index, parseFloat(profit.toString())];
      }
    );
    const regressionLine = regression.linear(formatted);
    // console.log("formattedData ~ regressionLine:", regressionLine);
    return monthData.map(({ month, profit }, index: number) => {
      return {
        name: month.substring(0, 3),
        "Actual profit": profit,
        "Regression line": regressionLine.points[index][1],
        "Predicted profit": regressionLine.predict(index + 12)[1],
      };
    });
  }, [data]);

  if (isLoading) return <Spinner />;
  const ranges = formattedData.reduce(
    (acc, data) => {
      if (data["Actual profit"] <= acc.min)
        acc.min = floor(data["Actual profit"]);
      if (data["Regression line"] <= acc.min)
        acc.min = floor(data["Regression line"]);
      if (data["Predicted profit"] <= acc.min)
        acc.min = floor(data["Predicted profit"]);
      if (data["Actual profit"] >= acc.max)
        acc.max = ceil(data["Actual profit"]);
      if (data["Regression line"] >= acc.max)
        acc.max = ceil(data["Regression line"]);
      if (data["Predicted profit"] >= acc.max)
        acc.max = ceil(data["Predicted profit"]);
      return acc;
    },
    { min: Infinity, max: -Infinity }
  );

  return (
    <ResponsiveContainer width="99%" height="90%">
      <LineChart
        data={formattedData}
        margin={{
          top: 20,
          right: 20,
          left: 0,
          bottom: 20,
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
          labelStyle={{
            color: palette.grey[400],
          }}
          contentStyle={{
            backgroundColor: palette.grey[800],
            borderRadius: "1rem",
          }}
        />
        <Legend
          verticalAlign="bottom"
          wrapperStyle={{
            fontSize: "0.7em",
            position: "relative",
            bottom: "40px",
            left: "15px",
          }}
        ></Legend>
        <Line
          type="monotone"
          dataKey="Actual profit"
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
          dataKey="Predicted profit"
          stroke={palette.secondary[500]}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProfitPrediction;
