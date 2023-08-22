import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import {
  ArrowUpwardOutlined,
  ArrowDownwardOutlined,
} from "@mui/icons-material";

type Props = {
  title?: string;
  icon?: React.ReactNode;
  subtitle?: string;
  sidetext?: string;
  revenue?: string;
  expenses?: string;
};

const TrendBox = ({ revenue, expenses }: Props) => {
  const { palette } = useTheme();
  if (!revenue && !expenses) return;
  return (
    <Box
      height="0rem"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        sx={{
          color: revenue.startsWith("-")
            ? palette.secondary[500]
            : palette.primary[500],
        }}
        variant="h6"
      >
        {revenue && `R: ${revenue}%`}
        {revenue && revenue.startsWith("-") ? (
          <ArrowDownwardOutlined
            sx={{
              fontSize: "1.4em",
              position: "relative",
              top: "3px",
              color: palette.secondary[500],
            }}
          ></ArrowDownwardOutlined>
        ) : (
          <ArrowUpwardOutlined
            sx={{
              fontSize: "1.4em",
              position: "relative",
              top: "3px",
              color: palette.primary[500],
            }}
          ></ArrowUpwardOutlined>
        )}
      </Typography>
      <Box width="0.5rem"></Box>
      <Typography
        sx={{
          color: expenses.startsWith("-")
            ? palette.secondary[500]
            : palette.primary[500],
        }}
        variant="h6"
      >
        {expenses && `E: ${expenses}%`}
        {expenses && expenses.startsWith("-") ? (
          <ArrowDownwardOutlined
            sx={{
              fontSize: "1.4em",
              position: "relative",
              top: "3px",
              color: palette.secondary[500],
            }}
          ></ArrowDownwardOutlined>
        ) : (
          <ArrowUpwardOutlined
            sx={{
              fontSize: "1.4em",
              position: "relative",
              top: "3px",
              color: palette.primary[500],
            }}
          ></ArrowUpwardOutlined>
        )}
      </Typography>
    </Box>
  );
};

export default TrendBox;
