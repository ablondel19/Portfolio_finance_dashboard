import ResizableBox from "@/components/DashboardBox";
import RevenueAndExpensesAreaChart from "@/components/RevenueAndExpenses";
import ProfitAndRevenueLineChart from "@/components/ProfitAndRevenue";
import ExpensesLineChart from "@/components/ExpensesLineChart";

const Row1 = () => {
  return (
    <>
      <ResizableBox gridArea="a">
        <RevenueAndExpensesAreaChart gridArea="a" />
      </ResizableBox>
      <ResizableBox gridArea="b">
        <ProfitAndRevenueLineChart gridArea="b" />
      </ResizableBox>
      <ResizableBox gridArea="c">
        <ExpensesLineChart gridArea="c" />
      </ResizableBox>
    </>
  );
};

export default Row1;
