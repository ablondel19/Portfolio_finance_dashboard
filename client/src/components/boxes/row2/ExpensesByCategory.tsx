import { useGetKpisQuery } from "@/state/api";
import { useTheme, Box, Typography } from "@mui/material";
import { useMemo } from "react";
import Spinner from "../../utils/Spinner";
import { ChartProps } from "../../utils/utils";
import { formatDataWithConfig } from "@/components/utils/dataTransform/dataFormatting";
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ceil, floor } from "@/utils/utils";

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
          sx={{ color: palette.tertiary[500] }}
        >{`${name[0]} : ${payload[0].value}`}</Typography>
        <Typography
          sx={{ color: palette.tertiary[500] }}
        >{`${name[1]} : ${payload[1].value}`}</Typography>
        <Typography
          sx={{ color: palette.tertiary[500] }}
        >{`${name[2]} : ${payload[2].value}`}</Typography>
        <Typography
          sx={{ color: palette.tertiary[500] }}
        >{`${name[3]} : ${payload[3].value}`}</Typography>
        <Typography
          sx={{ color: palette.tertiary[500] }}
        >{`${name[4]} : ${payload[4].value}`}</Typography>
      </Box>
    );
  }

  return null;
};

const ExpenseByCategory: React.FC<ChartProps> = ({
  gridArea = "d",
  startDate,
  endDate,
}) => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetKpisQuery();
  const expenses = useMemo(() => {
    if (!isLoading) {
      return formatDataWithConfig({
        data: data[0].monthlyData,
        isLoading: isLoading,
        startDate: startDate,
        endDate: endDate,
        valuesToExtract: [
          "salaries",
          "supplies",
          "marketing",
          "events",
          "other",
        ],
        fieldMappings: {
          nonOperationalExpenses: "Non operational expenses",
          operationalExpenses: "Operational expenses",
        },
      });
    }
  }, [data]);

  if (isLoading) return <Spinner />;

  let minValue = Number.POSITIVE_INFINITY;
  let maxValue = Number.NEGATIVE_INFINITY;
  const fieldsToCheck = [
    "events",
    "marketing",
    "salaries",
    "supplies",
    "other",
  ];

  expenses.forEach((data) => {
    fieldsToCheck.forEach((field) => {
      const numericValue = parseFloat(data[field]);
      if (!isNaN(numericValue)) {
        minValue = Math.min(minValue, numericValue);
        maxValue = Math.max(maxValue, numericValue);
      }
    });
  });

  const domain = [floor(minValue), ceil(maxValue)];

  return (
    <ResponsiveContainer width="99%" height="65%" debounce={1250}>
      <BarChart barGap={1} width={500} height={300} data={expenses}>
        <defs>
          <linearGradient id="color4" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="35%"
              stopColor={palette.tertiary[500]}
              stopOpacity={0.7}
            />
            <stop
              offset="95%"
              stopColor={palette.tertiary[500]}
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
          domain={domain}
        />
        <YAxis
          orientation="left"
          axisLine={false}
          tickLine={false}
          style={{ fontSize: ".6em" }}
          domain={domain}
        />
        <Tooltip
          cursor={{
            fill: palette.grey[700],
          }}
          offset={50}
          content={
            <CustomTooltip
              name={["salaries", "supplies", "marketing", "events", "other"]}
              active={undefined}
              payload={undefined}
              label={undefined}
            />
          }
        />
        <Bar dataKey="salaries" fill="url(#color4)" />
        <Bar dataKey="supplies" fill="url(#color4)" />
        <Bar dataKey="marketing" fill="url(#color4)" />
        <Bar dataKey="events" fill="url(#color4)" />
        <Bar dataKey="other" fill="url(#color4)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpenseByCategory;
