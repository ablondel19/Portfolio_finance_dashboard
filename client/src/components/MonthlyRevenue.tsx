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
import { ChartMargin } from "./utils";

const MonthlyRevenueBarChart = ({ gridArea }) => {
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

  const min =
    ranges.expenses.min <= ranges.profit.min
      ? ranges.expenses.min - 1000
      : ranges.profit.min - 1000;

  const max =
    ranges.expenses.max >= ranges.revenue.max
      ? ranges.expenses.max
      : ranges.revenue.max;

  return (
    <ResponsiveContainer width="99%" height="65%">
      <BarChart
        barGap={1}
        width={500}
        height={300}
        data={barData}
        margin={ChartMargin}
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
          domain={[min, max]}
        />
        <YAxis
          orientation="left"
          axisLine={false}
          tickLine={false}
          style={{ fontSize: ".6em" }}
          domain={[min, max]}
        />
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
          wrapperStyle={{ fontSize: "0.75em", color: palette.grey[200] }}
        />
        <Bar dataKey="revenue" fill="url(#colorRevenue)" />
        <Bar dataKey="expenses" fill="url(#colorExpenses)" />
        <Bar dataKey="profit" fill="url(#colorProfit)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyRevenueBarChart;
