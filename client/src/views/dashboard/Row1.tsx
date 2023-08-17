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
  LineChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";
import { TrendState } from "@/main";
import TrendBox from "@/components/TrendBox";
import FlexBetween from "@/components/FlexBetween";

const Row1 = () => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetKpisQuery();
  // const dispatch = useDispatch();
  // const { yearlyRevenueDiff, yearlyExpensesDiff } = useSelector(
  //   (state: TrendState) => state.statistics
  // );

  // useEffect(() => {
  //   if (!isLoading) {
  //     dispatch(
  //       yearlyRevenueTrend({
  //         oldValue: data[0].monthlyData[0].revenue,
  //         newValue: data[0].monthlyData[11].revenue,
  //       })
  //     );
  //     dispatch(
  //       yearlyExpensesTrend({
  //         oldValue: data[0].monthlyData[0].expenses,
  //         newValue: data[0].monthlyData[11].expenses,
  //       })
  //     );
  //   }
  // }, [isLoading]);

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

  const revenueAndProfit = useMemo(() => {
    return (
      data !== undefined &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: (revenue - expenses).toFixed(2),
        };
      })
    );
  }, [data]);

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

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Revenue and expenses"
          subtitle="Analyze yearly financial trends"
        ></BoxHeader>
        <FlexBetween marginLeft="1rem">
          {/* <TrendBox revenue={yearlyRevenueDiff} expenses={yearlyExpensesDiff} /> */}
        </FlexBetween>

        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
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
                  stopOpacity={0.1}
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
              stroke={palette.primary.main}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Profit and revenue"
          subtitle="Analyze yearly financial trends"
        ></BoxHeader>
        <FlexBetween marginLeft="1rem">
          {/* <TrendBox revenue={yearlyRevenueDiff} expenses={yearlyExpensesDiff} /> */}
        </FlexBetween>

        <ResponsiveContainer width="99%" height="100%">
          <LineChart
            data={revenueAndProfit}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: ".7em" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: ".6em" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: ".6em" }}
            />
            <Tooltip
              labelStyle={{
                color: palette.grey[400],
              }}
              contentStyle={{
                backgroundColor: palette.grey[800],
                borderRadius: "1rem",
                offset: 50,
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Revenue month by month"
          subtitle="Analyze yearly financial trends"
        ></BoxHeader>
        <FlexBetween marginLeft="1rem">
          {/* <TrendBox revenue={yearlyRevenueDiff} expenses={yearlyExpensesDiff} /> */}
        </FlexBetween>
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
      </DashboardBox>
    </>
  );
};

export default Row1;
