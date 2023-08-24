import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
dayjs.extend(utc);

const start = dayjs.utc("2021-01-01");
const end = dayjs.utc().subtract(1, "month").endOf("month");

const genDailyData = () => {
  const dailyData = [];
  let currentDate = start.clone();

  while (currentDate.isBefore(end)) {
    const date = currentDate.toISOString();
    const revenue = `$${parseFloat(
      faker.commerce.price({ min: 150, max: 750 })
    )}`;
    const expenses = `$${parseFloat(
      faker.commerce.price({ min: 150, max: 350 })
    )}`;
    dailyData.push({ date, revenue, expenses });
    currentDate = currentDate.add(1, "day");
  }
  return dailyData;
};

const generatedDailyData = genDailyData();

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthlyData = [];

for (let year = start.year(); year <= end.year(); year++) {
  const startMonth = year === start.year() ? start.month() : 0;
  const endMonth = year === end.year() ? end.month() : 11;

  for (let monthIndex = startMonth; monthIndex <= endMonth; monthIndex++) {
    const monthName = months[monthIndex];
    const monthStartDate = dayjs()
      .year(year)
      .month(monthIndex)
      .date(1)
      .startOf("day");
    const monthEndDate = dayjs()
      .year(year)
      .month(monthIndex)
      .endOf("month")
      .endOf("day");

    const monthlyRevenueAndExpenses = generatedDailyData
      .filter(({ date }) => {
        const currentDate = dayjs(date);
        return (
          (currentDate.isAfter(monthStartDate, "day") ||
            currentDate.isSame(monthStartDate, "day")) &&
          (currentDate.isBefore(monthEndDate, "day") ||
            currentDate.isSame(monthEndDate, "day"))
        );
      })
      .reduce(
        (acc, data) => {
          acc.revenue += parseFloat(data.revenue.replace("$", ""));
          acc.expenses += parseFloat(data.expenses.replace("$", ""));
          return acc;
        },
        { revenue: 0, expenses: 0 }
      );

    let r1 = "";
    let r2 = "";

    while (true) {
      r1 = Math.random().toFixed(1);
      r2 = Math.random().toFixed(1);
      if (r1 !== "0.0" && r2 !== "0.0") {
        if (
          parseFloat(r1) > parseFloat(r2) &&
          parseFloat(r1) + parseFloat(r2) === 1
        )
          break;
      }
    }

    monthlyData.push({
      date: monthStartDate.format(),
      month: monthName,
      year: year.toString(),
      revenue: `$${monthlyRevenueAndExpenses.revenue.toFixed(2)}`,
      expenses: `$${monthlyRevenueAndExpenses.expenses.toFixed(2)}`,
      profit: `$${(
        monthlyRevenueAndExpenses.revenue - monthlyRevenueAndExpenses.expenses
      ).toFixed(2)}`,
      operationalExpenses:
        "$" + (monthlyRevenueAndExpenses.expenses * parseFloat(r1)).toFixed(2),
      nonOperationalExpenses:
        "$" + (monthlyRevenueAndExpenses.expenses * parseFloat(r2)).toFixed(2),
      salaries: "",
      supplies: "",
      marketing: "",
      events: "",
      other: "",
    });
  }
}

monthlyData.forEach((data) => {
  const op = parseFloat(data.operationalExpenses.replace("$", ""));

  while (true) {
    const salaries = parseFloat(faker.commerce.price({ min: 0, max: op }));
    const supplies = parseFloat(faker.commerce.price({ min: 0, max: op / 5 }));
    const marketing = parseFloat(faker.commerce.price({ min: 0, max: op / 4 }));
    const total = salaries + supplies + marketing;
    if (Math.abs(op - total) <= 1) {
      data.salaries = `$${salaries.toFixed(2)}`;
      data.supplies = `$${supplies.toFixed(2)}`;
      data.marketing = `$${marketing.toFixed(2)}`;
      return;
    }
  }
});

monthlyData.forEach((data) => {
  const nonOp = parseFloat(data.nonOperationalExpenses.replace("$", ""));

  while (true) {
    const events = parseFloat(faker.commerce.price({ min: 0, max: nonOp / 2 }));
    const other = parseFloat(faker.commerce.price({ min: 0, max: nonOp }));
    const total = events + other;
    if (Math.abs(nonOp - total) <= 1) {
      data.events = `$${events.toFixed(2)}`;
      data.other = `$${other.toFixed(2)}`;
      return;
    }
  }
});

const kpiData = monthlyData.reduce(
  (total, monthdata) => {
    total.revenue += parseFloat(monthdata.revenue.replace("$", ""));
    total.expenses += parseFloat(monthdata.expenses.replace("$", ""));
    total.operationalExpenses += parseFloat(
      monthdata.operationalExpenses.replace("$", "")
    );
    total.nonOperationalExpenses += parseFloat(
      monthdata.nonOperationalExpenses.replace("$", "")
    );
    return total;
  },
  { revenue: 0, expenses: 0, operationalExpenses: 0, nonOperationalExpenses: 0 }
);

function roundUp(value: number) {
  return Math.ceil(value / 1000) * 1000;
}

function roundDown(value: number) {
  return Math.floor(value / 1000) * 1000;
}

const format = (value: string) => {
  return parseInt(value.replace("$", ""));
};

const ranges = monthlyData.reduce(
  (acc, data) => {
    ///////////////////////////////////////////////////////////
    // REVENUE
    acc.revenue.min =
      acc.revenue.min >= format(data.revenue)
        ? roundDown(format(data.revenue))
        : acc.revenue.min;
    acc.revenue.max =
      acc.revenue.max <= format(data.revenue)
        ? roundUp(format(data.revenue))
        : acc.revenue.max;
    ///////////////////////////////////////////////////////////
    // EXPENSES
    acc.expenses.min =
      acc.expenses.min >= format(data.expenses)
        ? roundDown(format(data.expenses))
        : acc.expenses.min;
    acc.expenses.max =
      acc.expenses.max <= format(data.expenses)
        ? roundUp(format(data.expenses))
        : acc.expenses.max;
    ///////////////////////////////////////////////////////////
    // PROFIT
    acc.profit.min =
      acc.profit.min >= format(data.profit)
        ? roundDown(format(data.profit))
        : acc.profit.min;
    acc.profit.max =
      acc.profit.max <= format(data.profit)
        ? roundUp(format(data.profit))
        : acc.profit.max;
    ///////////////////////////////////////////////////////////
    // OPERATIONAL EXPENSES
    acc.opExp.min =
      acc.opExp.min >= format(data.operationalExpenses)
        ? roundDown(format(data.operationalExpenses))
        : acc.opExp.min;
    acc.opExp.max =
      acc.opExp.max <= format(data.operationalExpenses)
        ? roundUp(format(data.operationalExpenses))
        : acc.opExp.max;
    ///////////////////////////////////////////////////////////
    // NON OPERATIONAL EXPENSES
    acc.nonOpExp.min =
      acc.nonOpExp.min >= format(data.nonOperationalExpenses)
        ? roundDown(format(data.nonOperationalExpenses))
        : acc.nonOpExp.min;
    acc.nonOpExp.max =
      acc.nonOpExp.max <= format(data.nonOperationalExpenses)
        ? roundUp(format(data.nonOperationalExpenses))
        : acc.nonOpExp.max;

    return acc;
  },
  {
    revenue: { min: Infinity, max: -Infinity },
    expenses: { min: Infinity, max: -Infinity },
    profit: { min: Infinity, max: -Infinity },
    opExp: { min: Infinity, max: -Infinity },
    nonOpExp: { min: Infinity, max: -Infinity },
  }
);

const kpis = [
  {
    profit: (kpiData.revenue - kpiData.expenses).toFixed(2),
    revenue: kpiData.revenue.toFixed(2),
    expenses: kpiData.expenses.toFixed(2),
    operationalExpenses: kpiData.operationalExpenses.toFixed(2),
    nonOperationalExpenses: kpiData.nonOperationalExpenses.toFixed(2),
    monthlyData: monthlyData,
    dailyData: generatedDailyData,
    ranges: ranges,
  },
];

export default kpis;
