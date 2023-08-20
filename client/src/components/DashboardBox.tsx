import { Box, IconButton, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { ZoomOutMapOutlined } from "@mui/icons-material";
import BoxHeader from "./BoxHeader";
import { useSelector, useDispatch } from "react-redux";
import { resetVisibility, setVisibility } from "@/state/slices.ts";
import { LayoutState } from "@/main";

const DashboardBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  borderRadius: "1rem",
  boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, 0.8)",
}));

const ResizableBox = ({ children, gridArea }) => {
  let resizeTimeout: number;
  const { palette } = useTheme();
  const [isResizing, setIsResizing] = useState(false);
  const [buttonColor, setButtonColor] = useState(palette.grey[700]);
  const layoutState = useSelector((state: LayoutState) => state.layout);
  const dispatch = useDispatch();

  const handleResizeStart = () => {
    clearTimeout(resizeTimeout);
    setIsResizing(!isResizing);
  };

  const handleResizeEnd = () => {
    resizeTimeout = setTimeout(() => {
      setIsResizing(false);
    }, 150);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResizeStart);
    window.addEventListener("resize", handleResizeEnd);

    return () => {
      window.removeEventListener("resize", handleResizeStart);
      window.removeEventListener("resize", handleResizeEnd);
    };
  }, []);

  const titles = {
    a: "Revenue and expenses",
    b: "Profit and revenue",
    c: "Operational and non Operational expenses",
    d: "Percentages",
    e: "Overview month by month",
    f: "Averages",
    g: "Revenue linear prediction",
    h: "Profit linear prediction",
    i: "Expenses linear prediction",
  };

  return (
    <DashboardBox gridArea={gridArea}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <BoxHeader title={`${titles[gridArea]}`} />
        <IconButton
          sx={{
            color: palette.grey[300],
            scale: "0.8",
            margin: "1em",
            border: `2px solid ${buttonColor}`,
          }}
          onClick={() => {
            dispatch(setVisibility(gridArea));
          }}
          onMouseEnter={() => setButtonColor(palette.grey[200])}
          onMouseLeave={() => setButtonColor(palette.grey[700])}
        >
          <ZoomOutMapOutlined
            style={{ color: palette.grey[200], scale: "1.4" }}
          />
        </IconButton>
      </Box>
      {isResizing ? <Spinner /> : children}
    </DashboardBox>
  );
};

export default ResizableBox;
