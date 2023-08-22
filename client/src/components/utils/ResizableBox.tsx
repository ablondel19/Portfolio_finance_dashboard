import { Box } from "@mui/material";
import { styled } from "@mui/system";
import Spinner from "./Spinner";
import { ReactNode, useEffect, useState } from "react";
// import { ToggleOffOutlined, ToggleOnOutlined } from "@mui/icons-material";
import BoxHeader from "./BoxHeader";
import { MenuIconButton } from "../buttons/MenuIconButton";
import { ExpandIconButton } from "../buttons/ExpandIconButton";
import { CalendarIconButton } from "../buttons/CalendarIconButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
import React from "react";

const titles = {
  a: "Revenue and expenses",
  b: "Profit and revenue",
  c: "Expenses",
  d: "Percentages",
  e: "Overview",
  f: "Averages",
  g: "Revenue prediction",
  h: "Profit prediction",
  i: "Expenses prediction",
};

const DashboardBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.background.light,
  borderRadius: "1rem",
  boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, 0.8)",
  minHeight: "16rem",
}));

interface ResizableBoxProps {
  children: ReactNode;
  gridArea: string;
  isAboveMediumScreens: boolean;
}

/*
() => {
  const [startDate, setStartDate] = useState(new Date("2022/01/01"));
  const [endDate, setEndDate] = useState(null);

  const handleChange = ([newStartDate, newEndDate]) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      selectsRange
      startDate={startDate}
      endDate={endDate}
      dateFormat="MM/yyyy"
      showMonthYearPicker
    />
  );
};
*/

const ResizableBox: React.FC<ResizableBoxProps> = ({
  children,
  gridArea,
  isAboveMediumScreens,
}) => {
  let resizeTimeout: number;
  const [isResizing, setIsResizing] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date("2022-01-01"));
  const [endDate, setEndDate] = useState(new Date("2022-12-31"));

  const handleChange = ([newStartDate, newEndDate]) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    if (newStartDate && newEndDate) toggleDatePicker();
  };

  const toggleDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };

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

  type ChildProps = {
    startDate: Date;
    endDate: Date | null;
  };

  const modifiedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<ChildProps>(child)) {
      return React.cloneElement(child, {
        startDate: startDate,
        endDate: endDate,
      });
    }
    return child;
  });

  return (
    <DashboardBox gridArea={gridArea} sx={{ width: "100%", height: "100%" }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="5rem"
      >
        <Box position="relative" left="1rem">
          <BoxHeader title={`${titles[gridArea]}`} />
        </Box>
        <Box height="100%" display="flex">
          <Box height="100%" display="flex" alignItems="flex-end">
            <CalendarIconButton onCalendarClick={toggleDatePicker} />
            <MenuIconButton />
          </Box>
          {isAboveMediumScreens && (
            <ExpandIconButton
              gridArea={gridArea}
              isAboveMediumScreens={isAboveMediumScreens}
            />
          )}
        </Box>
      </Box>
      {isDatePickerVisible ? (
        <Box
          maxHeight="15rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <DatePicker
            // selected={startDate}
            onChange={handleChange}
            selectsRange
            startDate={startDate}
            endDate={endDate}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            shouldCloseOnSelect={true}
            inline
          />
        </Box>
      ) : (
        <>{isResizing ? <Spinner /> : modifiedChildren}</>
      )}
    </DashboardBox>
  );
};

export default ResizableBox;
