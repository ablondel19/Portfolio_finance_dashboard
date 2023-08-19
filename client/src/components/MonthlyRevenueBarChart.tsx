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
} from "recharts";
import Spinner from "./Spinner";

const MonthlyRevenueBarChart = () => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetKpisQuery();
  const revenue = useMemo(() => {
    return (
      data !== undefined &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
        };
      })
    );
  }, [data]);

  if (isLoading) return <Spinner />;
  const min = data[0].ranges.revenue.min;
  const max = data[0].ranges.revenue.max;

  return (
    <ResponsiveContainer width="99%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={revenue}
        margin={{
          top: 20,
          right: 20,
          left: -10,
          bottom: 55,
        }}
      >
        <defs>
          <linearGradient id="colorRevenue2" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="35%"
              stopColor={palette.primary[600]}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={palette.primary[600]}
              stopOpacity={0}
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
          axisLine={false}
          tickLine={false}
          style={{ fontSize: ".6em" }}
          domain={[min, max]}
        />
        <Tooltip
          labelStyle={{
            color: palette.grey[400],
          }}
          contentStyle={{
            borderColor: palette.grey[700],
            backgroundColor: palette.grey[800],
            color: palette.primary.main,
            borderRadius: "1rem",
          }}
        />
        <Bar dataKey="revenue" fill="url(#colorRevenue2)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyRevenueBarChart;
