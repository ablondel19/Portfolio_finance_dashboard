import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Spinner from "./Spinner";

const RevenueAndExpensesAreaChart = () => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetKpisQuery();

  const revenueAndExpenses = useMemo(() => {
    return (
      data !== undefined &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        };
      })
    );
  }, [data]);

  if (isLoading) return <Spinner />;
  const min =
    data[0].ranges.revenue.min <= data[0].ranges.expenses.min
      ? data[0].ranges.revenue.min
      : data[0].ranges.expenses.min;

  const max =
    data[0].ranges.revenue.max >= data[0].ranges.expenses.max
      ? data[0].ranges.revenue.max
      : data[0].ranges.expenses.max;

  return (
    <ResponsiveContainer width="99%" height="100%">
      <AreaChart
        data={revenueAndExpenses}
        margin={{
          top: 20,
          right: 50,
          left: -10,
          bottom: 60,
        }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={palette.primary[400]}
              stopOpacity={0.7}
            />
            <stop
              offset="95%"
              stopColor={palette.primary[400]}
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={palette.primary[400]}
              stopOpacity={0.7}
            />
            <stop
              offset="95%"
              stopColor={palette.primary[400]}
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" tickLine={false} style={{ fontSize: ".7em" }} />
        <YAxis
          tickLine={false}
          style={{ fontSize: ".6em" }}
          domain={[min, max]}
        />
        <Tooltip
          labelStyle={{
            color: palette.grey[400],
          }}
          contentStyle={{
            backgroundColor: palette.grey[800],
            borderRadius: "1rem",
          }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          dot={true}
          stroke={palette.primary.main}
          fill="url(#colorRevenue)"
        />
        <Area
          type="monotone"
          dataKey="expenses"
          dot={true}
          stroke={palette.primary[500]}
          fill="url(#colorExpenses)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RevenueAndExpensesAreaChart;
