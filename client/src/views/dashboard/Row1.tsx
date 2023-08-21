import ResizableBox from "@/components/ResizableBox";
import RevenueAndExpensesAreaChart from "@/components/RevenueAndExpenses";
import ProfitAndRevenueLineChart from "@/components/ProfitAndRevenue";
import ExpensesLineChart from "@/components/ExpensesLineChart";

const Row1 = ({ isAboveMediumScreens }) => {
  return (
    <>
      <ResizableBox gridArea="a" isAboveMediumScreens={isAboveMediumScreens}>
        <RevenueAndExpensesAreaChart gridArea="a" />
      </ResizableBox>
      <ResizableBox gridArea="b" isAboveMediumScreens={isAboveMediumScreens}>
        <ProfitAndRevenueLineChart gridArea="b" />
      </ResizableBox>
      <ResizableBox gridArea="c" isAboveMediumScreens={isAboveMediumScreens}>
        <ExpensesLineChart gridArea="c" />
      </ResizableBox>
    </>
  );
};

export default Row1;
