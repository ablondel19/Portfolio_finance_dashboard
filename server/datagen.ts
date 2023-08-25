import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import { computerProducts } from "./seedData.ts";
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

// console.log(computerProducts);

/** SALES RECORD **/

const randomSellers = () => {
  let sellers = [];
  for (let i = 0; i < 500; i++) {
    const seller = {
      sellerId: faker.database.mongodbObjectId(),
      sellerName: faker.person.fullName(),
      sellerLocation: `${faker.location.city()} ${faker.location.country()}`,
    };
    sellers.push(seller);
  }
  return sellers;
};

const Sellers = randomSellers();
////////////////////////////////////////////////////////////////////////////////

const randomProducts = () => {
  const products = [];
  for (let i = 0; i < 1000; i++) {
    const seed = faker.helpers.arrayElement(computerProducts);
    const product = {
      productId: faker.database.mongodbObjectId(),
      productName: seed.productName,
      price: seed.price.toFixed(2),
      quantityAvailable: faker.number.int({ min: 0, max: 25 }),
      category: seed.category,
      sellerIds: faker.helpers.arrayElements(
        randomSellers(),
        faker.number.int({ min: 1, max: 10 })
      ),
    };
    products.push(product);
  }
  return products;
};

const Products = randomProducts();
////////////////////////////////////////////////////////////////////////////////

const randomCustomers = () => {
  const customers = [];
  for (let i = 0; i < 2000; i++) {
    const sex = faker.person.sexType();
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName();
    const address = faker.location.streetAddress({ useFullAddress: true });
    const city = faker.location.city();
    const country = faker.location.country();
    const email = faker.internet.email({
      firstName,
      lastName,
      provider: "42.dev",
    });
    const customer = {
      customerId: faker.database.mongodbObjectId(),
      firstName,
      lastName,
      email,
      shippingAdress: `${address} ${city} ${country}`,
      billingAddress: `${address} ${city} ${country}`,
    };
    customers.push(customer);
  }
  return customers;
};

const Customers = randomCustomers();
////////////////////////////////////////////////////////////////////////////////

const randomOrders = () => {
  const orders = [];
  const start = dayjs.utc().subtract(1, "year").startOf("day");
  const end = dayjs.utc().startOf("day");
  let currentDate = start.clone();

  while (currentDate.isBefore(end)) {
    const numberOfOrders = faker.number.int({ min: 0, max: 10 });
    for (let i = 0; i <= numberOfOrders; i++) {
      const products = faker.helpers.arrayElements(Products, {
        min: 1,
        max: faker.number.int({ min: 1, max: 3 }),
      });
      const items = products.map((product) => {
        const quantity = faker.number.int({
          min: 1,
          max: parseFloat(product.price) > 100 ? 1 : 2,
        });
        const item = {
          productId: product.productId,
          quantity: faker.number.int({
            min: 1,
            max: quantity,
          }),
          itemPrice: product.price,
          category: product.category,
        };
        return item;
      });
      const totalAmount = items.reduce((acc, item) => {
        acc += parseFloat(item.itemPrice) * item.quantity;
        return acc;
      }, 0);
      const order = {
        orderId: faker.database.mongodbObjectId(),
        customer: faker.helpers.arrayElement(Customers).customerId,
        status: faker.helpers.arrayElement([
          "delivered",
          "shipped",
          "delivered",
          "pending",
          "delivered",
        ]),
        items: items,
        totalAmount: totalAmount.toFixed(2),
        orderDate: currentDate.toISOString(),
      };
      orders.push(order);
    }
    currentDate = currentDate.add(1, "day");
  }
  return orders;
};

const Orders = randomOrders();
////////////////////////////////////////////////////////////////////////////////

const randomPayments = () => {
  const payments: Array<Object> = [];

  Orders.forEach((order) => {
    const shippingPrice = parseFloat(
      faker.helpers.arrayElement(["5.99", "8.99", "14.99", "19.99", "39.99"])
    );
    const payment = {
      paymentId: faker.database.mongodbObjectId(),
      orderId: order.orderId,
      paymentDate: order.orderDate,
      paymentAmount: (parseFloat(order.totalAmount) + shippingPrice).toFixed(2),
      paymentMethod: faker.helpers.arrayElement([
        "card",
        "paypal",
        "card",
        "google",
        "card",
        "apple",
      ]),
    };
    payments.push(payment);
  });
  return payments;
};

const Payments = randomPayments();
////////////////////////////////////////////////////////////////////////////////

const randomReviews = () => {
  const reviews: Array<Object> = [];
  const orders = Orders.filter((order) => {
    return order.status === "delivered";
  });
  orders.forEach((order) => {
    const customerId = order.customer;
    const product = faker.helpers.arrayElement(order.items);
    const productId = product.productId;
    const rating = faker.number.int({ min: 1, max: 5 });
    const review = {
      reviewId: faker.database.mongodbObjectId(),
      customerId,
      productId,
      rating,
    };
    reviews.push(review);
  });
  return reviews;
};

const Reviews = randomReviews();

export const Sales = {
  Sellers,
  Products,
  Customers,
  Orders,
  Reviews,
  Payments,
};

/** DASHBOARD RECORDS

1. **Financial Record:**
   - `recordId`: Unique identifier for the financial record.
   - `date`: Date of the financial transaction or record.
   - `transactionType`: Type of transaction (revenue, expense, profit, etc.).
   - `amount`: Monetary amount associated with the transaction.
   - `description`: Description or details of the transaction.

2. **Revenue:**
   - `revenueId`: Unique identifier for the revenue entry.
   - `orderId`: Reference to the order generating the revenue.
   - `amount`: Amount of revenue generated from the order.
   - `date`: Date when the revenue was earned.

3. **Expenses:**
   - `expenseId`: Unique identifier for the expense entry.
   - `category`: Category of the expense (e.g., shipping, marketing, operations).
   - `amount`: Amount of the expense.
   - `date`: Date when the expense occurred.

4. **Profit:**
   - `profitId`: Unique identifier for the profit entry.
   - `orderId`: Reference to the order generating the profit.
   - `revenueAmount`: Amount of revenue from the order.
   - `expensesAmount`: Total expenses associated with the order.
   - `profitAmount`: Calculated profit (revenue - expenses).
   - `date`: Date when the profit was calculated.

5. **Shipping Cost:**
   - `shippingCostId`: Unique identifier for the shipping cost entry.
   - `orderId`: Reference to the order for which shipping cost applies.
   - `amount`: Amount of the shipping cost.
   - `date`: Date when the shipping cost was incurred.

6. **Taxes:**
   - `taxId`: Unique identifier for the tax entry.
   - `orderId`: Reference to the order for which taxes apply.
   - `taxType`: Type of tax (e.g., sales tax, VAT).
   - `amount`: Amount of the tax.
   - `date`: Date when the tax was calculated.

7. **Financial Summary:**
   - `summaryId`: Unique identifier for the financial summary.
   - `dateRange`: Range of dates covered by the summary.
   - `totalRevenue`: Total revenue earned within the date range.
   - `totalExpenses`: Total expenses incurred within the date range.
   - `netProfit`: Net profit (total revenue - total expenses) within the date range.
   - `averageProfitMargin`: Average profit margin calculated as (net profit / total revenue).

 */
