import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
} from "recharts";
import Spinner from "./Spinner";

const MonthlyRevenueBarChart = () => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetKpisQuery();

  const barData = useMemo(() => {
    return (
      data !== undefined &&
      data[0].monthlyData.map(({ month, revenue, profit, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: profit,
          expenses: expenses,
        };
      })
    );
  }, [data]);

  if (isLoading) return <Spinner />;
  const { ranges } = data[0];
  const minRight = ranges.revenue.min;
  const maxRight = ranges.revenue.max;

  const minLeft =
    ranges.expenses.min <= ranges.profit.min
      ? ranges.expenses.min - 1000
      : ranges.profit.min - 1000;

  const maxLeft =
    ranges.expenses.max >= ranges.profit.max
      ? ranges.expenses.max
      : ranges.profit.max;

  return (
    <ResponsiveContainer width="99%" height="100%">
      <BarChart
        barGap={1}
        width={500}
        height={300}
        data={barData}
        margin={{
          top: 30,
          right: -10,
          left: -10,
          bottom: 40,
        }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="35%"
              stopColor={palette.primary[500]}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={palette.primary[500]}
              stopOpacity={0.2}
            />
          </linearGradient>
          <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="35%"
              stopColor={palette.tertiary[500]}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={palette.tertiary[500]}
              stopOpacity={0.2}
            />
          </linearGradient>
          <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="35%"
              stopColor={palette.secondary[500]}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={palette.secondary[500]}
              stopOpacity={0.2}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          style={{ fontSize: ".6em" }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          axisLine={false}
          tickLine={false}
          style={{ fontSize: ".6em" }}
          domain={[minRight, maxRight]}
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          axisLine={false}
          tickLine={false}
          style={{ fontSize: ".6em" }}
          domain={[minLeft, maxLeft]}
        />
        <Tooltip
          labelStyle={{
            color: palette.grey[300],
          }}
          contentStyle={{
            borderColor: palette.grey[700],
            backgroundColor: palette.grey[800],
            color: palette.grey[300],
            borderRadius: ".5rem",
          }}
        />
        <Legend
          verticalAlign="bottom"
          wrapperStyle={{
            color: palette.grey[300],
            alignItems: "left",
            fontSize: "0.7em",
            bottom: "45px",
            left: "-15px",
          }}
        ></Legend>
        <Bar yAxisId="right" dataKey="revenue" fill="url(#colorRevenue)" />
        <Bar yAxisId="left" dataKey="expenses" fill="url(#colorExpenses)" />
        <Bar yAxisId="left" dataKey="profit" fill="url(#colorProfit)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyRevenueBarChart;
