import BoxHeader from "@/components/BoxHeader";
import ResizableBox from "@/components/DashboardBox";
import ExpensePrediction from "@/components/ExpensePrediction";
import ProfitPrediction from "@/components/ProfitPrediction";
import RevenuePrediction from "@/components/RevenuePrediction";

const Row3 = () => {
  return (
    <>
      <ResizableBox gridArea="g">{/* <RevenuePrediction /> */}</ResizableBox>
      <ResizableBox gridArea="h">{/* <ProfitPrediction /> */}</ResizableBox>
      <ResizableBox gridArea="i">{/* <ExpensePrediction /> */}</ResizableBox>
    </>
  );
};

export default Row3;
