import ResizableBox from "@/components/utils/ResizableBox";
import RevenueAndExpensesAreaChart from "@/components/boxes/row1/RevenueAndExpenses";
import ProfitAndRevenueLineChart from "@/components/boxes/row1/ProfitAndRevenue";
import ExpensesLineChart from "@/components/boxes/row1/ExpensesLineChart";

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
