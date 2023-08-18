import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetTransactionsQuery,
  useGetProductsQuery,
  useGetKpisQuery,
} from "@/state/api";
import { useTheme, Box, Typography } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

const Row3 = () => {
  const { palette } = useTheme();
  const { data: transactionData } = useGetTransactionsQuery();
  console.log("Row3 ~ transactionData:", transactionData);
  const { data: productData } = useGetProductsQuery();
  const { data: kpiData } = useGetKpisQuery();

  const productColumns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.45,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionColumns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.5,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of products"
          subtitle={`${productData?.length} products`}
        ></BoxHeader>
        <Box
          position="relative"
          top="-10px"
          m="0 0.5rem 0 0rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={50}
            rowHeight={35}
            hideFooter={true}
            sx={{ height: "95%" }}
            rows={productData || []}
            columns={productColumns}
          ></DataGrid>
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent transactions"
          subtitle={`${transactionData?.length} latest transactions`}
        ></BoxHeader>
        <Box
          position="relative"
          top="-10px"
          m="0 0.5rem 0 0rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={50}
            rowHeight={35}
            hideFooter={true}
            sx={{ height: "100%" }}
            rows={transactionData || []}
            columns={transactionColumns}
          ></DataGrid>
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i">
        <BoxHeader
          title="Percentages of expense by Category"
          subtitle={`Replace with a bar of total expenses`}
        ></BoxHeader>
      </DashboardBox>
    </>
  );
};

export default Row3;
