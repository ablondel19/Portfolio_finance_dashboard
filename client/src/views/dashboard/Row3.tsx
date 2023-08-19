import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import ExpensePrediction from "@/components/ExpensePrediction";
import ProfitPrediction from "@/components/ProfitPrediction";
import RevenuePrediction from "@/components/RevenuePrediction";

const Row3 = () => {
  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader title="Revenue linear prediction"></BoxHeader>
        <RevenuePrediction />
      </DashboardBox>
      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}
      <DashboardBox gridArea="h">
        <BoxHeader title="Profit linear prediction"></BoxHeader>
        <ProfitPrediction />
      </DashboardBox>
      {/* /////////////////////////////////////////////////////////////////////////////////////////// */}
      <DashboardBox gridArea="i">
        <BoxHeader title="Expenses linear prediction"></BoxHeader>
        <ExpensePrediction />
      </DashboardBox>
    </>
  );
};

export default Row3;
