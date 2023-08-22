import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useEffect, useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Spinner from "../../utils/Spinner";
import { ChartMargin } from "../../utils/utils";

const Percentages = ({ gridArea }) => {
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
    <></>
    // <ResponsiveContainer width="100%" height="65%">
    //   <LineChart data={revenueAndExpenses} margin={ChartMargin}>
    //     <CartesianGrid vertical={false} stroke={palette.grey[800]} />
    //     <XAxis dataKey="name" tickLine={false} style={{ fontSize: ".7em" }} />
    //     <YAxis
    //       yAxisId="left"
    //       orientation="left"
    //       axisLine={false}
    //       tickLine={false}
    //       style={{ fontSize: ".6em" }}
    //       domain={[ranges.revenue.min, ranges.revenue.max]}
    //     />
    //     <YAxis
    //       yAxisId="right"
    //       orientation="right"
    //       axisLine={false}
    //       tickLine={false}
    //       style={{ fontSize: ".6em" }}
    //       domain={[ranges.expenses.min, ranges.expenses.max]}
    //     />
    //     <Tooltip
    //       offset={50}
    //       contentStyle={{
    //         borderColor: palette.grey[700],
    //         backgroundColor: palette.grey[800],
    //         color: palette.grey[300],
    //         borderRadius: "0.25rem",
    //       }}
    //     />
    //     <Line
    //       yAxisId="left"
    //       type="monotone"
    //       dataKey="revenue"
    //       stroke={palette.primary.main}
    //     />
    //     <Line
    //       yAxisId="right"
    //       type="monotone"
    //       dataKey="expenses"
    //       stroke={palette.tertiary[500]}
    //     />
    //   </LineChart>
    // </ResponsiveContainer>
  );
};

export default Percentages;
