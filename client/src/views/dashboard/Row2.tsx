import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import ExpensesPieChart from "@/components/ExpensesPieChart";
import MonthlyRevenueBarChart from "@/components/MonthlyRevenueBarChart";

const Row2 = () => {
  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader title="Expenses overview"></BoxHeader>
        <ExpensesPieChart />
      </DashboardBox>
      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}
      <DashboardBox gridArea="e">
        <BoxHeader title="Revenue month by month"></BoxHeader>
        <MonthlyRevenueBarChart />
      </DashboardBox>
      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}
      <DashboardBox gridArea="f">
        <BoxHeader title="REPLACE"></BoxHeader>
      </DashboardBox>
    </>
  );
};

export default Row2;
