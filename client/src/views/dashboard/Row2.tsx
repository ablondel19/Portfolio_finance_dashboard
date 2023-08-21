import BoxHeader from "@/components/BoxHeader";
import ResizableBox from "@/components/ResizableBox";
import MonthlyRevenueBarChart from "@/components/MonthlyRevenue";
import Percentages from "@/components/Percentages";
import Averages from "@/components/Averages";

const Row2 = ({ isAboveMediumScreens }) => {
  return (
    <>
      <ResizableBox gridArea="d" isAboveMediumScreens={isAboveMediumScreens}>
        <Percentages gridArea="d" />
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
