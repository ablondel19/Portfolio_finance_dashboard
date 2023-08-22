import { IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import { MenuOutlined } from "@mui/icons-material";

export const MenuIconButton = () => {
  const { palette } = useTheme();
  const [menuBtnColor, setMenubtnColor] = useState(palette.grey[700]);

  return (
    <IconButton
      sx={{
        display: "flex",
        color: palette.grey[300],
        scale: "0.8",
        margin: "1em",
        border: `2px solid ${menuBtnColor}`,
      }}
    >
      <MenuOutlined
        onMouseEnter={() => setMenubtnColor(palette.grey[200])}
        onMouseLeave={() => setMenubtnColor(palette.grey[700])}
        style={{ color: palette.grey[200], scale: "1.4" }}
      />
    </IconButton>
  );
};
