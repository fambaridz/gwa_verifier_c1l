import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import {
  Button,
  ButtonGroup,
  Typography,
  CssBaseline,
  List,
  ListItem,
} from "@mui/material";
import RecordListPage from "Pages/RecordList";
import RecordDetailsPage from "Pages/RecordDetails";
import ManageCommitteeAccountsPage from "Pages/ManageCommitteeAccounts";
import LoginPage from "Pages/LogIn";
import EditStudentRecordPage from "Pages/EditStudentRecord";
import AddStudentRecordPage from "Pages/AddStudentRecord";
import { SnackbarProvider } from "notistack";

import PrivateRoute from "./PrivateRoute.jsx";
// example usage of cookies
import Cookies from "universal-cookie";

const cookies = new Cookies();
// a placeholder component to test if the material ui components are being rendered
// you can delete this TL anytime

const routes = [
  {
    to: "/records",
    name: "Student Records",
  },
  {
    to: "/records/user_id",
    name: "Student Record Details page",
  },
  {
    to: "/manage-committee",
    name: "Manage committee accounts page",
  },
  {
    to: "/",
    name: "Login page",
  },
  {
    to: "/records/add",
    name: "Add student records",
  },
  {
    to: "/records/user_id/edit",
    name: "Edit student records",
  },
];

function App() {
  React.useEffect(() => {
    console.log(window);
    // logs all cookies, remove this in production
    console.log(cookies.getAll());
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <Router>
          {/* <List>
            {routes.map((route, idx) => (
              <ListItem key={idx}>
                <Link to={route.to}>{route.name}</Link>
              </ListItem>
            ))}
          </List> */}
          <Routes>
            <Route
              path="/records"
              element={
                <PrivateRoute>
                  <RecordListPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/records/:id"
              element={
                <PrivateRoute>
                  <RecordDetailsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage-committee"
              element={
                <PrivateRoute>
                  <ManageCommitteeAccountsPage />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/records/add"
              element={
                <PrivateRoute>
                  <AddStudentRecordPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/records/:id/edit"
              element={
                <PrivateRoute>
                  <EditStudentRecordPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
