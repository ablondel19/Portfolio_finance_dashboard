import { useGetKpisQuery } from "@/state/api";
import { Palette, useTheme } from "@mui/material";
import { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import Spinner from "./Spinner";

const renderActiveShape = (props, palette: Palette) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={0} textAnchor="middle" fill={palette.grey[300]}>
        {payload.name} {payload.value}
      </text>
      <text x={cx} y={cy} dy={28} textAnchor="middle" fill={palette.grey[400]}>
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={palette.primary[500]}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

const ExpensesPieChart = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { palette } = useTheme();
  const { data, isLoading } = useGetKpisQuery();

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  if (isLoading) return <Spinner />;

  const mydata = [
    { name: "Salaries", value: 400 },
    { name: "Supplies", value: 300 },
    { name: "Marketing", value: 300 },
    { name: "Events", value: 200 },
    { name: "Other", value: 200 },
  ];

  return (
    <ResponsiveContainer width="99%" height="100%">
      <PieChart margin={{ top: -50, left: 0 }}>
        <Pie
          activeIndex={activeIndex}
          activeShape={(props) => renderActiveShape(props, palette)}
          data={mydata}
          cx="30%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill={palette.primary[600]}
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpensesPieChart;
