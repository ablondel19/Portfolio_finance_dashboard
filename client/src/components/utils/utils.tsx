export type ChartProps = {
  gridArea?: string;
  startDate?: Date;
  endDate?: Date;
};

export const ChartMargin = {
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
};

export const CustomDot = (color: string) => {
  return {
    stroke: color,
    strokeWidth: 3,
    r: 2.25,
  };
};
