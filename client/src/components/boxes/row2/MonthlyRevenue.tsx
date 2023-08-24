import { useGetKpisQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import Spinner from "../../utils/Spinner";
import { ChartMargin, ChartProps } from "../../utils/utils";
import { formatDataWithConfig } from "@/components/utils/dataTransform/dataFormatting";

const CustomTooltip = ({ active, payload, label, name }) => {
  const { palette } = useTheme();
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          padding: "1rem",
          border: `1px solid ${palette.grey[700]}`,
          backgroundColor: palette.grey[800],
          color: palette.grey[300],
          borderRadius: "0.25rem",
        }}
      >
        <Typography sx={{ color: palette.grey[300] }}>{`${label}`}</Typography>
        <Typography
          sx={{ color: palette.primary.main }}
        >{`${name[0]} : ${payload[0].value}`}</Typography>
        <Typography
          sx={{ color: palette.tertiary[500] }}
        >{`${name[1]} : ${payload[1].value}`}</Typography>
        <Typography
          sx={{ color: palette.secondary.main }}
        >{`${name[2]} : ${payload[2].value}`}</Typography>
      </Box>
    );
  }

  return null;
};

const MonthlyRevenueBarChart: React.FC<ChartProps> = ({
  gridArea = "e",
  startDate,
  endDate,
}) => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetKpisQuery();

  const barData = useMemo(() => {
    if (!isLoading) {
      return formatDataWithConfig({
        data: data[0].monthlyData,
        isLoading: isLoading,
        startDate: startDate,
        endDate: endDate,
        valuesToExtract: ["revenue", "expenses", "profit"],
        fieldMappings: {},
      });
    }
  }, [data, startDate, endDate]);

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
    <ResponsiveContainer width="99%" height="65%" debounce={1250}>
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
              stopOpacity={0.6}
            />
            <stop
              offset="95%"
              stopColor={palette.primary[500]}
              stopOpacity={0.3}
            />
          </linearGradient>
          <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="35%"
              stopColor={palette.tertiary[500]}
              stopOpacity={0.6}
            />
            <stop
              offset="95%"
              stopColor={palette.tertiary[500]}
              stopOpacity={0.3}
            />
          </linearGradient>
          <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="35%"
              stopColor={palette.secondary[500]}
              stopOpacity={0.6}
            />
            <stop
              offset="95%"
              stopColor={palette.secondary[500]}
              stopOpacity={0.3}
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
          cursor={{
            fill: palette.grey[700],
          }}
          offset={50}
          content={
            <CustomTooltip
              name={["Revenue", "Expenses", "Profit"]}
              active={undefined}
              payload={undefined}
              label={undefined}
            />
          }
        />
        <Bar dataKey="revenue" fill="url(#colorRevenue)" />
        <Bar dataKey="expenses" fill="url(#colorExpenses)" />
        <Bar dataKey="profit" fill="url(#colorProfit)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyRevenueBarChart;
