import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  Tooltip,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Cell,
  Pie,
  PieChart,
  ScatterChart,
  Scatter,
  ZAxis,
  Legend,
  Label,
} from "recharts";
import regression, { DataPoint } from "regression";

const Row2 = () => {
  const { palette } = useTheme();
  const { data } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
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

  const productExpenseData = useMemo(() => {
    return (
      productData !== undefined &&
      productData.map(({ _id, price, expense }) => {
        return {
          _id: _id,
          price: price,
          expense: expense,
        };
      })
    );
  }, [productData]);

  const formattedData = useMemo(() => {
    if (!data) return [];
    const monthData = data[0].monthlyData;
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
  }, [data]);

  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Operational vs Non-operational expenses"
          subtitle="Analyze yearly financial trends"
        ></BoxHeader>
        <FlexBetween marginLeft="1rem">
          {/* <TrendBox revenue={yearlyRevenueDiff} expenses={yearlyExpensesDiff} /> */}
        </FlexBetween>

        <ResponsiveContainer width="99%" height="100%">
          <LineChart
            data={operationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: ".7em" }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: ".6em" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
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
      </DashboardBox>

      <DashboardBox gridArea="e">
        <BoxHeader
          title="THIS COMPONENT HAS TO GO AWAY"
          subtitle="replace with an overview of percentages UP/DOWN"
        ></BoxHeader>
      </DashboardBox>
      <DashboardBox gridArea="f">
        <BoxHeader
          title="Next year revenue predictions"
          subtitle="Predicted revenue for the next year based on a linear regression model"
        ></BoxHeader>
        <ResponsiveContainer width="99%" height="90%">
          <LineChart
            data={formattedData}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 50,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: ".7em" }}
            ></XAxis>
            <YAxis
              domain={[12000, 26000]}
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
                // offset: 50,
              }}
            />
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{
                fontSize: "9px",
                position: "relative",
                bottom: "75px",
                left: "10px",
              }}
            ></Legend>
            <Line
              type="monotone"
              dataKey="Actual revenue"
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
              dataKey="Predicted revenue"
              stroke={palette.secondary[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
