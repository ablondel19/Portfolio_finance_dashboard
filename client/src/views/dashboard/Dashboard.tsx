import { Box, makeStyles, useMediaQuery } from "@mui/material";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import Spinner from "@/components/Spinner";
import { LayoutState } from "@/main";
import { useSelector } from "react-redux";
import RevenueAndExpensesAreaChart from "@/components/RevenueAndExpenses";
import ResizableBox from "@/components/ResizableBox";
import { styled } from "@mui/system";
import ProfitAndRevenueLineChart from "@/components/ProfitAndRevenue";
import Percentages from "@/components/Percentages";
import MonthlyRevenueBarChart from "@/components/MonthlyRevenue";
import Averages from "@/components/Averages";
import ProfitPrediction from "@/components/ProfitPrediction";
import RevenuePrediction from "@/components/RevenuePrediction";
import ExpensePrediction from "@/components/ExpensePrediction";

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

const MyKeyframesAnimation = styled("div")(({ theme }) => ({
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

  if (isAboveMediumScreens && selectedGridArea !== "") {
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
        <MyKeyframesAnimation>
          {selectedGridArea === "a" && (
            <ResizableBox
              gridArea="a"
              isAboveMediumScreens={isAboveMediumScreens}
            >
              <RevenueAndExpensesAreaChart gridArea="a" />
            </ResizableBox>
          )}
          {selectedGridArea === "b" && (
            <ResizableBox
              gridArea="b"
              isAboveMediumScreens={isAboveMediumScreens}
            >
              <ProfitAndRevenueLineChart gridArea="b" />
            </ResizableBox>
          )}
          {selectedGridArea === "c" && (
            <ResizableBox
              gridArea="c"
              isAboveMediumScreens={isAboveMediumScreens}
            >
              <ProfitAndRevenueLineChart gridArea="c" />
            </ResizableBox>
          )}
          {selectedGridArea === "d" && (
            <ResizableBox
              gridArea="d"
              isAboveMediumScreens={isAboveMediumScreens}
            >
              <Percentages gridArea="d" />
            </ResizableBox>
          )}
          {selectedGridArea === "e" && (
            <ResizableBox
              gridArea="e"
              isAboveMediumScreens={isAboveMediumScreens}
            >
              <MonthlyRevenueBarChart gridArea="e" />
            </ResizableBox>
          )}
          {selectedGridArea === "f" && (
            <ResizableBox
              gridArea="f"
              isAboveMediumScreens={isAboveMediumScreens}
            >
              <Averages gridArea="f" />
            </ResizableBox>
          )}
          {selectedGridArea === "g" && (
            <ResizableBox
              gridArea="g"
              isAboveMediumScreens={isAboveMediumScreens}
            >
              <RevenuePrediction gridArea="g" />
            </ResizableBox>
          )}
          {selectedGridArea === "h" && (
            <ResizableBox
              gridArea="h"
              isAboveMediumScreens={isAboveMediumScreens}
            >
              <ProfitPrediction gridArea="h" />
            </ResizableBox>
          )}
          {selectedGridArea === "i" && (
            <ResizableBox
              gridArea="i"
              isAboveMediumScreens={isAboveMediumScreens}
            >
              <ExpensePrediction gridArea="i" />
            </ResizableBox>
          )}
        </MyKeyframesAnimation>
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
              gridAutoRows: "300px",
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
