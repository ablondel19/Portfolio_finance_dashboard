import ResizableBox from "@/components/utils/ResizableBox";
import MonthlyRevenueBarChart from "@/components/boxes/row2/MonthlyRevenue";
import Percentages from "@/components/boxes/row2/Percentages";
import Averages from "@/components/boxes/row2/Averages";

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
