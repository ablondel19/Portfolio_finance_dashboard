import ResizableBox from "@/components/utils/ResizableBox";
import MonthlyRevenueBarChart from "@/components/dashboardBoxes/row2/MonthlyRevenue";
import ExpenseByCategory from "@/components/dashboardBoxes/row2/ExpensesByCategory";
import Averages from "@/components/dashboardBoxes/row2/Averages";

const Row2 = ({ isAboveMediumScreens }) => {
  return (
    <>
      <ResizableBox gridArea="d" isAboveMediumScreens={isAboveMediumScreens}>
        <ExpenseByCategory gridArea="d" />
      </ResizableBox>
      <ResizableBox gridArea="e" isAboveMediumScreens={isAboveMediumScreens}>
        <MonthlyRevenueBarChart gridArea="e" />
      </ResizableBox>
      <ResizableBox gridArea="f" isAboveMediumScreens={isAboveMediumScreens}>
        <Averages gridArea="f" />
      </ResizableBox>
    </>
  );
};

export default Row2;
