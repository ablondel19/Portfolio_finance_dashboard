import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import PixIcon from "@mui/icons-material/Pix";

const Navbar = () => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  return (
    <FlexBetween mb=".75rem" p="0.5rem 0rem" color={palette.grey[300]}>
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
            to="/predictions"
            onClick={() => setSelected("predictions")}
            style={{
              color: selected === "predictions" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Predictions
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
