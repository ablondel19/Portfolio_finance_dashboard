import BoxHeader from "@/components/BoxHeader";
import ResizableBox from "@/components/ResizableBox";
import ExpensePrediction from "@/components/ExpensePrediction";
import ProfitPrediction from "@/components/ProfitPrediction";
import RevenuePrediction from "@/components/RevenuePrediction";

const Row3 = (isAboveMediumScreens) => {
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
