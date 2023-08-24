import { FormatConfig } from "@/state/types";
import dayjs from "dayjs";

export const formatDataWithConfig = (config: FormatConfig) => {
  const {
    data,
    isLoading,
    startDate,
    endDate,
    valuesToExtract,
    fieldMappings,
  } = config;

  if (!isLoading) {
    return (
      data !== undefined &&
      data
        .filter(({ date }) => {
          if (!startDate || !endDate) return true;
          const currentDate = dayjs(date);
          return (
            (currentDate.isAfter(startDate) || currentDate.isSame(startDate)) &&
            (currentDate.isBefore(endDate) || currentDate.isSame(endDate))
          );
        })
        .map(({ month, date, ...rest }) => {
          const formattedData = {
            name: `${month} ${date.split("-")[0]}`,
          };
          valuesToExtract.forEach((field) => {
            if (Boolean(rest[field])) {
              const mappedKey = fieldMappings[field] || field;
              formattedData[mappedKey] = rest[field];
            }
          });
          return formattedData;
        })
    );
  }
};
