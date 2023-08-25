import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/utils/FlexBetween";
import PixIcon from "@mui/icons-material/Pix";

const Navbar = () => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  return (
    <Box m=".75rem">
      <FlexBetween mb="1.75rem" color={palette.grey[300]}>
        {/* LEFT SIDE => LOGO + TITLE */}
        <FlexBetween gap="0.75rem">
          <PixIcon sx={{ fontSize: "36px" }} />
          <Typography variant="h3">Overseer</Typography>
        </FlexBetween>

        {/* RIGHT SIDE => LINKS */}
        <FlexBetween gap=".5rem">
          <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
            <Link
              to="/"
              onClick={() => setSelected("dashboard")}
              style={{
                color: selected === "dashboard" ? "inherit" : palette.grey[700],
                textDecoration: "inherit",
              }}
            >
              Dashboard
            </Link>
          </Box>
          <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
            <Link
              to="/sales"
              onClick={() => setSelected("sales")}
              style={{
                color: selected === "sales" ? "inherit" : palette.grey[700],
                textDecoration: "inherit",
              }}
            >
              Sales
            </Link>
          </Box>
        </FlexBetween>
      </FlexBetween>
    </Box>
  );
};

export default Navbar;
