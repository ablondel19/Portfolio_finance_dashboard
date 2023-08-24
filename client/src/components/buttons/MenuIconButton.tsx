import { IconButton, useTheme, Box, Theme } from "@mui/material";
import { useState } from "react";
import { MenuOutlined } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import { MenuProps } from "@mui/material/Menu";
import { themeSettings } from "@/theme";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(() => {
  return {
    "& .MuiPaper-root": {
      borderRadius: 6,
      minWidth: 100,
      backgroundColor: themeSettings.palette.grey[500],
      color: themeSettings.palette.grey[300],
      "& .MuiMenu-list": {
        padding: "4px 0",
        backgroundColor: themeSettings.palette.background.light,
        border: `0.5px solid ${themeSettings.palette.grey[900]}`,
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          backgroundColor: themeSettings.palette.grey[500],
          fontSize: 18,
        },
        "&:active": {
          backgroundColor: themeSettings.palette.grey[100],
        },
      },
    },
  };
});

export const MenuIconButton = () => {
  const { palette } = useTheme();
  const [menuBtnColor, setMenubtnColor] = useState(palette.grey[700]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
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
      <Box>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Monthly</MenuItem>
          <MenuItem onClick={handleClose}>Weekly</MenuItem>
          <MenuItem onClick={handleClose}>Daily</MenuItem>
        </StyledMenu>
      </Box>
    </Box>
  );
};
