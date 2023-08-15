import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { yearlyExpensesTrend, yearlyRevenueTrend } from "@/state/slices";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendState } from "@/main";
import TrendBox from "@/components/TrendBox";
import FlexBetween from "@/components/FlexBetween";

const Row1 = () => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetKpisQuery();
  const dispatch = useDispatch();
  const { yearlyRevenueDiff, yearlyExpensesDiff } = useSelector(
    (state: TrendState) => state.statistics
  );
  console.log("--->", yearlyRevenueDiff, yearlyExpensesDiff);

  useEffect(() => {
    if (!isLoading) {
      dispatch(
        yearlyRevenueTrend({
          oldValue: data[0].monthlyData[0].revenue,
          newValue: data[0].monthlyData[11].revenue,
        })
      );
      dispatch(
        yearlyExpensesTrend({
          oldValue: data[0].monthlyData[0].expenses,
          newValue: data[0].monthlyData[11].expenses,
        })
      );
    }
  }, [isLoading]);

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

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Revenue and expenses"
          subtitle="Analyze yearly financial trends"
        ></BoxHeader>
        <FlexBetween marginLeft="1rem">
          <TrendBox revenue={yearlyRevenueDiff} expenses={yearlyExpensesDiff} />
        </FlexBetween>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueAndExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[400]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[400]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[400]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[400]}
                  stopOpacity={0.3}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: ".7em" }}
            />
            <YAxis
              tickLine={false}
              style={{ fontSize: ".6em" }}
              domain={[8000, 23000]}
            />
            <Tooltip />
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
              stroke={palette.primary.main}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="b"></DashboardBox>
      <DashboardBox gridArea="c"></DashboardBox>
    </>
  );
};

export default Row1;
