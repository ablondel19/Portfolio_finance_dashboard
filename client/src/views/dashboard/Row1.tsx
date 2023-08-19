import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import RevenueAndExpensesAreaChart from "@/components/RevenueAndExpensesAreaChart";
import ProfitAndRevenueLineChart from "@/components/ProfitAndRevenueLineChart";
import ExpensesLineChart from "@/components/ExpensesLineChart";

const Row1 = () => {
  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader title="Revenue and expenses"></BoxHeader>
        <RevenueAndExpensesAreaChart />
      </DashboardBox>
      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}
      <DashboardBox gridArea="b">
        <BoxHeader title="Profit and revenue"></BoxHeader>
        <ProfitAndRevenueLineChart />
      </DashboardBox>
      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}
      <DashboardBox gridArea="c">
        <BoxHeader title="Operational and non Operational expenses"></BoxHeader>
        <ExpensesLineChart />
      </DashboardBox>
    </>
  );
};

export default Row1;
