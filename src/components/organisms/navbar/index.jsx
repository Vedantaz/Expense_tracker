import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../../store/features/searchSlice";

const getButtonStyles = () => ({
  marginLeft: 1,
  marginRight: 1,
  color: "white",
  backgroundColor: "black",
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
  width: 90,
  height: 35,
  "&:hover": {
    color: "#1e88e5",
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
});
const buttonStyles = getButtonStyles();

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontFamily: "Roboto, sans-serif",
            fontWeight: "bold",
            color: "#ffffff",
            justifyContent: "flex-start",
            display: "flex",
          }}
        >
          Dashboard
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button color="inherit" component={Link} to="/" sx={buttonStyles}>
            Expenses
          </Button>
          {/* <Button color="inherit" component={Link} to="/employee-table" sx={buttonStyles}>
                        Table
                    </Button>
                    <Button color="inherit" component={Link} to="/employee-allocation-chart" sx={buttonStyles}>
                        Chart
                    </Button> */}
          <Button
            color="inherit"
            component={Link}
            to="/categories"
            sx={buttonStyles}
          >
            Category
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
