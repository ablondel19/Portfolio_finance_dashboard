import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";
import Spinner from "./Spinner";
import { ChartMargin, CustomDot } from "./utils";

const RevenueAndExpensesAreaChart = ({ gridArea }) => {
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
  const { ranges } = data[0];

  return (
    <ResponsiveContainer width="100%" height="65%">
      <AreaChart data={revenueAndExpenses} margin={ChartMargin}>
        <defs>
          <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="15%"
              stopColor={palette.primary[500]}
              stopOpacity={0.1}
            />
            <stop
              offset="95%"
              stopColor={palette.primary[500]}
              stopOpacity={0.2}
            />
          </linearGradient>
          <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="15%"
              stopColor={palette.tertiary[500]}
              stopOpacity={0.1}
            />
            <stop
              offset="95%"
              stopColor={palette.tertiary[500]}
              stopOpacity={0.2}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
        <XAxis dataKey="name" tickLine={false} style={{ fontSize: ".7em" }} />
        <YAxis
          yAxisId="left"
          orientation="left"
          axisLine={true}
          tickLine={true}
          style={{ fontSize: ".6em" }}
          domain={[ranges.revenue.min, ranges.revenue.max]}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          axisLine={true}
          tickLine={true}
          style={{ fontSize: ".6em" }}
          domain={[ranges.expenses.min, ranges.expenses.max]}
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
        <Legend wrapperStyle={{ fontSize: "0.75em" }} />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="revenue"
          stroke={palette.primary.main}
          dot={CustomDot}
          fill="url(#color1)"
        />
        <Area
          yAxisId="right"
          type="monotone"
          dataKey="expenses"
          stroke={palette.tertiary[500]}
          dot={CustomDot}
          fill="url(#color2)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RevenueAndExpensesAreaChart;
