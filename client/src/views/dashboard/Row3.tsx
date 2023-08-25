import ResizableBox from "@/components/utils/ResizableBox";
import ExpensePrediction from "@/components/dashboardBoxes/row3/ExpensePrediction";
import ProfitPrediction from "@/components/dashboardBoxes/row3/ProfitPrediction";
import RevenuePrediction from "@/components/dashboardBoxes/row3/RevenuePrediction";

const Row3 = ({ isAboveMediumScreens }) => {
  return (
    <>
      <ResizableBox gridArea="g" isAboveMediumScreens={isAboveMediumScreens}>
        <RevenuePrediction gridArea="g" />
      </ResizableBox>
      <ResizableBox gridArea="h" isAboveMediumScreens={isAboveMediumScreens}>
        <ProfitPrediction gridArea="h" />
      </ResizableBox>
      <ResizableBox gridArea="i" isAboveMediumScreens={isAboveMediumScreens}>
        <ExpensePrediction gridArea="i" />
      </ResizableBox>
    </>
  );
};

export default Row3;
