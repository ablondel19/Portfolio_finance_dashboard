import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import regression, { DataPoint } from "regression";

const Predictions = () => {
  const { palette } = useTheme();
  const [isPrediction, setIsPrediction] = useState(false);
  const { data: kpiData } = useGetKpisQuery();
  const formattedData = useMemo(() => {
    if (!kpiData) return [];
    const monthData = kpiData[0].monthlyData;
    const formatted: Array<DataPoint> = monthData.map(
      ({ revenue }, index: number) => {
        return [index, parseFloat(revenue.toString())];
      }
    );
    const regressionLine = regression.linear(formatted);
    console.log("formattedData ~ regressionLine:", regressionLine);
    return monthData.map(({ month, revenue }, index: number) => {
      return {
        name: month.substring(0, 3),
        "Actual revenue": revenue,
        "Regression line": regressionLine.points[index][1],
        "Predicted revenue": regressionLine.predict(index + 12)[1],
      };
    });
  }, [kpiData]);

  return (
    <DashboardBox width="100%" height="90%" p="1rem" overflow="hidden">
      <FlexBetween m="1rem">
        <Box>
          <Typography variant="h3">Predictions for the revenue</Typography>
          <Typography variant="h5">
            Predicted revenue based on a linear regression model
          </Typography>
        </Box>
      </FlexBetween>
      <ResponsiveContainer width="99%" height="90%">
        <LineChart
          data={formattedData}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid stroke={palette.grey[800]} strokeDasharray="3 3" />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: ".7em" }}>
            <Label value="Month" offset={-5} position="insideBottom"></Label>
          </XAxis>
          <YAxis
            domain={[12000, 26000]}
            axisLine={{ strokeWidth: "0" }}
            style={{ fontSize: ".6em" }}
            tickFormatter={(v) => `$${v}`}
          >
            <Label
              value="Revenue"
              offset={-5}
              angle={-90}
              position="insideLeft"
            ></Label>
          </YAxis>
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
          <Legend verticalAlign="top"></Legend>
          <Line
            type="monotone"
            dataKey="Actual revenue"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Regression line"
            stroke={palette.tertiary[500]}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Predicted revenue"
            stroke={palette.secondary[500]}
          />
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Predictions;
