import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const getButtonStyles = (isActive) => ({
  marginLeft: 1,
  marginRight: 1,
  color: isActive ? "#1e88e5" : "white",
  backgroundColor: isActive ? "#ffffff" : "black",
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
  const location = useLocation();
  const isActive = location.pathname === "/Expense_tracker";
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
          <Button
            color="inherit"
            component={Link}
            to="/Expense_tracker"
            sx={getButtonStyles(isActive)}
          >
            Expenses
          </Button>
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
