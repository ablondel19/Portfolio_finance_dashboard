import { Box, useTheme } from "@mui/material";
import PixIcon from "@mui/icons-material/Pix";

const Spinner = () => {
  const { palette } = useTheme();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="65%"
    >
      <style>
        {`
          @keyframes spin-grow-shrink {
            0% {
              transform: scale(1);
              animation-timing-function: ease-in;
							color: ${palette.grey[600]}
            }
						25% {
							transform: scale(1.1);
							animation-timing-function: ease-in;
							color: ${palette.grey[700]}
						}
						50% {
							transform: scale(1.2);
              animation-timing-function: ease-in;
							color: ${palette.grey[800]}
						}
						75% {
							transform: scale(1.3);
							animation-timing-function: ease-in;
							color: ${palette.grey[700]}
						}
						100% {
              transform: scale(1.2);
              animation-timing-function: ease-out;
							color: ${palette.grey[500]}
            }
          }
        `}
      </style>
      <PixIcon
        sx={{
          color: palette.grey[500],
          fontSize: "5rem",
          animation: "spin-grow-shrink 0.5s linear infinite",
        }}
      />
    </Box>
  );
};

export default Spinner;
