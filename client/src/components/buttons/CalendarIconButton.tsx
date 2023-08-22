import { IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import { DateRangeOutlined } from "@mui/icons-material";

export const CalendarIconButton = ({ onCalendarClick }) => {
  const { palette } = useTheme();
  const [calendarBtnColor, setCalendarbtnColor] = useState(palette.grey[700]);

  return (
    <IconButton
      onClick={onCalendarClick}
      sx={{
        display: "flex",
        color: palette.grey[300],
        scale: "0.8",
        margin: "1em",
        border: `2px solid ${calendarBtnColor}`,
      }}
    >
      <DateRangeOutlined
        onMouseEnter={() => setCalendarbtnColor(palette.grey[200])}
        onMouseLeave={() => setCalendarbtnColor(palette.grey[700])}
        style={{ color: palette.grey[200], scale: "1.4" }}
      />
    </IconButton>
  );
};
