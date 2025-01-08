import React from "react";
import { Typography, Box } from "@mui/material";

const groupTotal = ({ date, total }) => {
  return (
    <Typography
      variant="h6"
      sx={{
        marginBottom: 1,
        backgroundColor: "#f44336",
        width: "100%",
        padding: "8px",
        borderRadius: "8px",
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {date}
      <Box
        sx={{
          display: "inline-block",
          marginLeft: 2,
          padding: "5px 15px",
          backgroundColor: "#ff7043",
          color: "white",
          borderRadius: "20px",
          border: "2px solid white",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        Expense : <span style={{ fontWeight: "bold", fontSize: 18 }}>₹{total}</span>
      </Box>
    </Typography>
  );
};

export default groupTotal;
