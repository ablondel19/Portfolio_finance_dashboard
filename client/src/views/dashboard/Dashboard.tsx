import { Box, useMediaQuery } from "@mui/material";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import { LayoutState } from "@/main";
import { useSelector } from "react-redux";
import RevenueAndExpenses from "@/components/dashboardBoxes/row1/RevenueAndExpenses";
import ResizableBox from "@/components/utils/ResizableBox";
import { styled } from "@mui/system";
import ProfitAndRevenueLineChart from "@/components/dashboardBoxes/row1/ProfitAndRevenue";
import ExpenseByCategory from "@/components/dashboardBoxes/row2/ExpensesByCategory";
import MonthlyRevenueBarChart from "@/components/dashboardBoxes/row2/MonthlyRevenue";
import Averages from "@/components/dashboardBoxes/row2/Averages";
import ProfitPrediction from "@/components/dashboardBoxes/row3/ProfitPrediction";
import RevenuePrediction from "@/components/dashboardBoxes/row3/RevenuePrediction";
import ExpensePrediction from "@/components/dashboardBoxes/row3/ExpensePrediction";
import ExpensesLineChart from "@/components/dashboardBoxes/row1/ExpensesLineChart";

const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "d e f"
  "d e f"
  "d e f"
  "g h i"
  "g h i"
  "g h i"
`;

const gridTemplateSmallScreens = `
  "a"
  "b"
  "c"
  "d"
  "e"
  "f"
  "g"
  "h"
  "i"
`;

export const ScaleAnimation = styled("div")(() => ({
  "@keyframes myAnimation": {
    "0%": {
      opacity: 0.75,
      transform: "scale(0.75)",
    },
    "100%": {
      opacity: 1,
      transform: "scale(1)",
    },
  },
  animation: "myAnimation 0.15s ease-out",
}));

const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const selectedGridArea = useSelector(
    (state: LayoutState) => state.layout.selected
  );

  const components = {
    a: <RevenueAndExpenses gridArea="a" />,
    b: <ProfitAndRevenueLineChart gridArea="b" />,
    c: <ExpensesLineChart gridArea="c" />,
    d: <ExpenseByCategory gridArea="d" />,
    e: <MonthlyRevenueBarChart gridArea="e" />,
    f: <Averages gridArea="f" />,
    g: <RevenuePrediction gridArea="g" />,
    h: <ProfitPrediction gridArea="h" />,
    i: <ExpensePrediction gridArea="i" />,
  };

  if (isAboveMediumScreens && selectedGridArea) {
    const gridTemplateAreas = `
      "${selectedGridArea}"
    `;
    return (
      <Box
        width="100%"
        height="90%"
        display="grid"
        gap="1rem"
        sx={{
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr",
          gridTemplateAreas: gridTemplateAreas,
        }}
      >
        <ScaleAnimation>
          {selectedGridArea && (
            <ResizableBox
              gridArea={selectedGridArea}
              isAboveMediumScreens={isAboveMediumScreens}
            >
              {components[selectedGridArea]}
            </ResizableBox>
          )}
        </ScaleAnimation>
      </Box>
    );
  }

  return (
    <Box
      width="100%"
      height="90%"
      display="grid"
      gap="1rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(3, minmax(auto, 1fr))",
              gridTemplateRows: "repeat(9, minmax(40px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "16.5rem",
              gridTemplateAreas: gridTemplateSmallScreens,
            }
      }
    >
      <Row1 isAboveMediumScreens={isAboveMediumScreens} />
      <Row2 isAboveMediumScreens={isAboveMediumScreens} />
      <Row3 isAboveMediumScreens={isAboveMediumScreens} />
    </Box>
  );
};

export default Dashboard;
