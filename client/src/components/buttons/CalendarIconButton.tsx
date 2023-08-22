import { IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import { DateRangeOutlined } from "@mui/icons-material";

export const CalendarIconButton = (props) => {
  const { palette } = useTheme();
  const [calBtnColor, setCalbtnColor] = useState(palette.grey[700]);

  return (
    <IconButton
      sx={{
        display: "flex",
        color: palette.grey[300],
        scale: "0.8",
        margin: "1em",
        border: `2px solid ${calBtnColor}`,
      }}
    >
      <DateRangeOutlined
        onMouseEnter={() => setCalbtnColor(palette.grey[200])}
        onMouseLeave={() => setCalbtnColor(palette.grey[700])}
        style={{ color: palette.grey[200], scale: "1.4" }}
      />
    </IconButton>
  );
};
