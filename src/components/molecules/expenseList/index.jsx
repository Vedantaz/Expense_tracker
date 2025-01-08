import React from "react";
import { ListItem, IconButton, Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";

const expenseList = ({
  expense,
  onEdit,
  onRemove,
  onMarkImportant,
}) => {
  return (
    <ListItem
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        margin: 1,
        border: "2px solid #ddd",
        borderRadius: "8px",
      }}
    >
      {/* Expense Name and Date */}
      <Box sx={{ flex: 1, display: "flex", alignItems: "left", flexDirection: "column" }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {expense.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "gray" }}>
          (Last updated: {expense.date})
        </Typography>
      </Box>

      {/* Expense Amount */}
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", flexDirection: "column" }}>
        <Typography variant="h7" sx={{ color: "black", fontWeight: "bold" }}>
          ₹{expense.amount}
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <IconButton onClick={onEdit} color="primary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={onRemove} color="error">
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={onMarkImportant} color={expense.isImp ? "warning" : "default"}>
          <StarIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
};

export default expenseList;
