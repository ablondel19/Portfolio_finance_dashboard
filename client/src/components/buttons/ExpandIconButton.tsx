import { Box, IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import { ZoomOutMapOutlined, ZoomInMapOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { setVisibility } from "@/state/slices.ts";
import { LayoutState } from "@/main";

interface ExpandIconProps {
  gridArea: string;
  isAboveMediumScreens: boolean;
}

export const ExpandIconButton: React.FC<ExpandIconProps> = ({ gridArea }) => {
  const { palette } = useTheme();
  const [zoomBtnColor, setZoomBtnColor] = useState(palette.grey[700]);
  const layoutState = useSelector((state: LayoutState) => state.layout);
  const dispatch = useDispatch();
  const visible = layoutState[gridArea];

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="space-around"
    >
      <IconButton
        sx={{
          display: "flex",
          color: palette.grey[300],
          scale: "0.8",
          margin: "1em",
          border: `2px solid ${zoomBtnColor}`,
        }}
        onClick={() => {
          dispatch(setVisibility({ gridArea, visible: visible }));
        }}
        onMouseEnter={() => setZoomBtnColor(palette.grey[200])}
        onMouseLeave={() => setZoomBtnColor(palette.grey[700])}
      >
        {layoutState.selected !== gridArea ? (
          <ZoomOutMapOutlined
            style={{ color: palette.grey[200], scale: "1.4" }}
          />
        ) : (
          <ZoomInMapOutlined
            style={{ color: palette.grey[200], scale: "1.4" }}
          />
        )}
      </IconButton>
    </Box>
  );
};
