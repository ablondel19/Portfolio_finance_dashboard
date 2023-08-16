import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  Tooltip,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Cell,
  Pie,
  PieChart,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

const Row2 = () => {
  const { palette } = useTheme();
  const { data } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  console.log("Row2 ~ data:", productData);
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

  const productExpenseData = useMemo(() => {
    return (
      productData !== undefined &&
      productData.map(({ _id, price, expense }) => {
        return {
          _id: _id,
          price: price,
          expense: expense,
        };
      })
    );
  }, [productData]);

  const pieColors = [palette.primary[800], palette.primary[300]];
  const pieData = [
    { name: "Group A", value: 600 },
    { name: "Group B", value: 400 },
  ];
  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Operational vs Non-operational expenses"
          subtitle="Analyze yearly financial trends"
        ></BoxHeader>
        <FlexBetween marginLeft="1rem">
          {/* <TrendBox revenue={yearlyRevenueDiff} expenses={yearlyExpensesDiff} /> */}
        </FlexBetween>

        <ResponsiveContainer width="99%" height="100%">
          <LineChart
            data={operationalExpenses}
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
              orientation="left"
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
              dataKey="Non operational expenses"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="e">
        <BoxHeader
          title="Campaigns and targets"
          subtitle="Analyze yearly financial trends"
        ></BoxHeader>
        <FlexBetween mt="0.25rem" ml="0.25rem" gap="1.5rem" pr="1rem">
          <Box flexBasis="30%" alignItems="center">
            <PieChart
              width={110}
              height={110}
              margin={{
                top: 0,
                right: 10,
                left: 35,
                bottom: 0,
              }}
            >
              <Pie
                data={pieData}
                strokeOpacity={0.1}
                innerRadius={18}
                outerRadius={38}
                paddingAngle={1}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${entry}`} fill={pieColors[index]} />
                ))}
              </Pie>
            </PieChart>
          </Box>
          <Box ml="-0.7rem" flexBasis="30%">
            <Typography variant="h5">Target sales</Typography>
            <Typography variant="h3" m="0.3rem 0" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">
              Desired finance goals of the campaign
            </Typography>
          </Box>
          <Box flexBasis="30%">
            <Typography variant="h5">Losses in revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography variant="h5" mt="0.4rem">
              Profit margins
            </Typography>
            <Typography variant="h6">
              Margins are up 12% compared to last month
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="f">
        <BoxHeader
          title="Product prices vs expenses"
          subtitle="Analyze yearly financial trends"
        ></BoxHeader>
        <ResponsiveContainer width="99%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              domain={[0, 200]}
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[25]} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
