import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ComposedChart,
  Area,
} from "recharts";
import regression, { DataPoint } from "regression";
import Spinner from "../../utils/Spinner";
import { floor, ceil } from "@/utils/utils";
import { ChartProps } from "@/components/utils/utils";
import { formatDataWithConfig } from "@/components/utils/dataTransform/dataFormatting";

const ExpensePrediction: React.FC<ChartProps> = ({
  gridArea = "i",
  startDate,
  endDate,
}) => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    if (!isLoading) {
      const formattedData = formatDataWithConfig({
        data: data[0].monthlyData,
        isLoading: isLoading,
        startDate: startDate,
        endDate: endDate,
        valuesToExtract: ["expenses"],
        fieldMappings: {},
      });
      const line: Array<DataPoint> = formattedData.map(
        (data: { name: string; expenses: string }, index: number) => {
          return [index, parseFloat(data.expenses.toString())];
        }
      );
      const regressionLine = regression.linear(line);
      const future =
        (endDate.get("year") - startDate.get("year")) * 12 +
        endDate.get("month") +
        1 -
        startDate.get("month");
      const finalData = formattedData.map(
        (
          { name, expenses }: { name: string; expenses: string },
          index: number
        ) => {
          return {
            name: name.substring(0, 3),
            "Actual expenses": expenses,
            "Regression line": regressionLine.points[index][1],
            "Predicted expenses": regressionLine.predict(index + future)[1],
          };
        }
      );
      return finalData;
    }
  }, [data, startDate, endDate]);

  if (isLoading) return <Spinner />;

  const ranges = formattedData.reduce(
    (acc, data) => {
      if (parseFloat(data["Actual expenses"]) <= acc.min)
        acc.min = floor(parseFloat(data["Actual expenses"]));
      if (data["Regression line"] <= acc.min)
        acc.min = floor(data["Regression line"]);
      if (data["Predicted expenses"] <= acc.min)
        acc.min = floor(data["Predicted expenses"]);
      if (parseFloat(data["Actual expenses"]) >= acc.max)
        acc.max = ceil(parseFloat(data["Actual expenses"]));
      if (data["Regression line"] >= acc.max)
        acc.max = ceil(data["Regression line"]);
      if (data["Predicted expenses"] >= acc.max)
        acc.max = ceil(data["Predicted expenses"]);
      return acc;
    },
    { min: Infinity, max: -Infinity }
  );

  return (
    <ResponsiveContainer width="99%" height="65%" debounce={1250}>
      <ComposedChart
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
        <Area
          type="monotone"
          dataKey="Actual expenses"
          stroke={palette.primary.main}
          fill="url(#color1)"
        />
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="Regression line"
          stroke={palette.tertiary[500]}
          dot={false}
        />
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="Predicted expenses"
          stroke={palette.secondary[500]}
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ExpensePrediction;
