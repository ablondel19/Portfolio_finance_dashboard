import { Box } from "@mui/material";
import { styled } from "@mui/system";
import Spinner from "./Spinner";
import { ReactNode, useEffect, useState } from "react";
import BoxHeader from "./BoxHeader";
import { MenuIconButton } from "../buttons/MenuIconButton";
import { ExpandIconButton } from "../buttons/ExpandIconButton";
import { CalendarIconButton } from "../buttons/CalendarIconButton";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
import React from "react";
import enGB from "date-fns/locale/en-GB";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc.js";
import { addMonths } from "date-fns";
import { ScaleAnimation } from "@/views/dashboard/Dashboard";
dayjs.extend(utc);

const titles = {
  a: "Revenue and Expenses",
  b: "Profit and Revenue",
  c: "OpEx and Non-OpEx",
  d: "Expenses by category",
  e: "Profit Revenue and Expenses ",
  f: "Averages",
  g: "Revenue prediction",
  h: "Profit prediction",
  i: "Expenses prediction",
  j: "Category Distribution",
};

export const DashboardBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.background.light,
  borderRadius: "1rem",
  boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, 0.8)",
  minHeight: "16rem",
}));

interface ResizableBoxProps {
  children?: ReactNode;
  gridArea?: string;
  isAboveMediumScreens?: boolean;
}

const ResizableBox: React.FC<ResizableBoxProps> = ({
  children,
  gridArea,
  isAboveMediumScreens,
}) => {
  registerLocale("enGB", enGB);
  setDefaultLocale("enGB");
  let resizeTimeout: number;
  const [isResizing, setIsResizing] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [endDateJs, setEndDateJs] = useState(dayjs.utc().subtract(1, "month"));
  const [startDateJs, setStartDateJs] = useState(
    endDateJs.subtract(1, "year").subtract(1, "month")
  );

  const handleChange = ([newStartDate, newEndDate]) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    if (newStartDate && newEndDate) {
      setStartDateJs(dayjs.utc(newStartDate.toString()));
      setEndDateJs(dayjs.utc(newEndDate.toString()));
      toggleDatePicker();
    }
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
    gridArea: string;
    startDate: Dayjs;
    endDate: Dayjs;
  };

  const modifiedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<ChildProps>(child)) {
      if (child.props.gridArea === gridArea) {
        return React.cloneElement(child, {
          gridArea: gridArea,
          startDate: startDateJs,
          endDate: endDateJs,
        });
      }
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
        <ScaleAnimation>
          <Box
            maxHeight="15rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <DatePicker
              // locale="enGB"
              onChange={handleChange}
              selectsRange
              startDate={startDate}
              minDate={new Date("2021-01-01")}
              maxDate={addMonths(new Date(), -1)}
              endDate={endDate}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              shouldCloseOnSelect={true}
              showDisabledMonthNavigation
              inline
            />
          </Box>
        </ScaleAnimation>
      ) : (
        <>{isResizing ? <Spinner /> : modifiedChildren}</>
      )}
    </DashboardBox>
  );
};

export default ResizableBox;
