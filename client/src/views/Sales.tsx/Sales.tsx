import ResizableBox, { DashboardBox } from "@/components/utils/ResizableBox";
import { Box } from "@mui/material";
import { ScaleAnimation } from "../dashboard/Dashboard";

export const Sales = ({ gridArea }) => {
  return (
    <ScaleAnimation sx={{ height: "90%" }}>
      <DashboardBox></DashboardBox>
    </ScaleAnimation>
  );
};

export default Sales;
