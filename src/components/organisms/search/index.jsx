import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  selectFilteredExpenses,
  selectFilteredUsers,
} from "../../../store/features/searchSlice";
import {
  TextField,
  IconButton,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const dispatch = useDispatch();
  const filteredExpenses = useSelector(selectFilteredExpenses);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const filteredUsers = useSelector(selectFilteredUsers);
  const [localQuery, setLocalQuery] = useState("");

  const handleInputChange = (event) => {
    setLocalQuery(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
      dispatch(setSearchQuery(localQuery));
    }
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <TextField
          variant="outlined"
          fullWidth
          value={localQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            boxShadow: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray",
              },
              "&:hover fieldset": {
                borderColor: "blue",
              },
              "&.Mui-focused fieldset": {
                borderColor: "blue",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <IconButton edge="start" sx={{ color: "gray" }}>
                <SearchIcon />
              </IconButton>
              //   <InputAdornment position="start">
              //     <SearchIcon sx={{ color: "gray" }} />
              //   </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ marginTop: 2 }}>
        {/* Conditional rendering based on the search query */}
        {localQuery ? (
          // Check if there are any filtered expenses
          filteredExpenses.length > 0 ? (
            <List>
              {filteredExpenses
                .filter((expense) => {
                  // Filter based on query and format
                  if (localQuery.trim().split(" ").length === 1) {
                    return expense.name
                      .toLowerCase()
                      .startsWith(localQuery.trim().toLowerCase());
                  }
                  return expense.name
                    .toLowerCase()
                    .includes(localQuery.trim().toLowerCase());
                })
                .map((expense) => (
                  <ListItem
                    key={expense.name}
                    sx={{ borderBottom: "1px solid #ddd", padding: 1 }}
                  >
                    <ListItemText
                      primary={expense.name}
                      secondary={`₹${expense.amount}`}
                    />
                  </ListItem>
                ))}
            </List>
          ) : (
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textAlign: "center" }}
            >
              No expenses found
            </Typography>
          )
        ) : (
          <Typography
            variant="body1"
            color="white"
            sx={{ textAlign: "center", mb: 2 }}
          >
            Search for expenses...
          </Typography>
        )}
      </Box>
    </>
  );
};

export default Search;
