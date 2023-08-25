import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import React, { useMemo } from "react";
import {
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";
import Spinner from "../../utils/Spinner";
import { ChartMargin, ChartProps } from "../../utils/utils";
import dayjs from "dayjs";
import { formatDataWithConfig } from "@/components/utils/dataTransform/dataFormatting";

const RevenueAndExpenses: React.FC<ChartProps> = ({
  gridArea = "a",
  startDate,
  endDate,
}) => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetKpisQuery();

  const revenueAndExpenses = useMemo(() => {
    if (!isLoading) {
      return formatDataWithConfig({
        data: data[0].monthlyData,
        isLoading: isLoading,
        startDate: startDate,
        endDate: endDate,
        valuesToExtract: ["revenue", "expenses"],
        fieldMappings: {},
      });
    }
  }, [data, startDate, endDate]);

  if (isLoading) return <Spinner />;

  return (
    <ResponsiveContainer width="100%" height="65%" debounce={1250}>
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
        <XAxis dataKey="name" tickLine={true} style={{ fontSize: ".7em" }} />
        <YAxis
          yAxisId="left"
          orientation="left"
          axisLine={true}
          tickLine={true}
          style={{ fontSize: ".6em" }}
          domain={[data[0].ranges.revenue.min, data[0].ranges.revenue.max]}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          axisLine={true}
          tickLine={true}
          style={{ fontSize: ".6em" }}
          domain={[data[0].ranges.expenses.min, data[0].ranges.expenses.max]}
        />
        <Tooltip
          offset={50}
          contentStyle={{
            borderColor: palette.grey[700],
            backgroundColor: palette.grey[800],
            color: palette.grey[300],
          }}
        />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="revenue"
          stroke={palette.primary.main}
          fill="url(#color1)"
        />
        <Area
          yAxisId="right"
          type="monotone"
          dataKey="expenses"
          stroke={palette.tertiary[500]}
          fill="url(#color2)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RevenueAndExpenses;
