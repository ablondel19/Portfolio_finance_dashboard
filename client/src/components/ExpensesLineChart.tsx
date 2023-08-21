import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import Spinner from "./Spinner";
import { LayoutState } from "@/main";
import { useSelector } from "react-redux";
import { ChartMargin, CustomDot } from "./utils";

const ExpensesLineChart = ({ gridArea }) => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetKpisQuery();

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

  if (isLoading) return <Spinner />;
  const minLeft = data[0].ranges.nonOpExp.min;
  const maxLeft = data[0].ranges.nonOpExp.max;
  const minRight = data[0].ranges.opExp.min;
  const maxRight = data[0].ranges.opExp.max;

  return (
    <ResponsiveContainer width="100%" height="65%">
      <AreaChart data={operationalExpenses} margin={ChartMargin}>
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
          tickLine={true}
          axisLine={true}
          style={{ fontSize: ".6em" }}
          domain={[minLeft, maxLeft]}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickLine={true}
          axisLine={true}
          style={{ fontSize: ".6em" }}
          domain={[minRight, maxRight]}
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
          dataKey="Non operational expenses"
          stroke={palette.tertiary[500]}
          dot={CustomDot}
          fill="url(#color2)"
        />
        <Area
          yAxisId="right"
          type="monotone"
          dataKey="Operational expenses"
          stroke={palette.primary.main}
          dot={CustomDot}
          fill="url(#color1)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ExpensesLineChart;
