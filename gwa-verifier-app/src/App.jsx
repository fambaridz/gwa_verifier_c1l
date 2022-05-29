import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Typography, CssBaseline } from "@mui/material";
import RecordListPage from "Pages/RecordList";
import RecordDetailsPage from "Pages/RecordDetails";
import ManageCommitteeAccountsPage from "Pages/ManageCommitteeAccounts";
import LoginPage from "Pages/LogIn";
import EditStudentRecordPage from "Pages/EditStudentRecord";
import AddStudentRecordPage from "Pages/AddStudentRecord";
import { SnackbarProvider } from "notistack";

import PrivateRoute from "./PrivateRoute.jsx";
import AuthProvider from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <Router>
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
    </AuthProvider>
  );
}

export default App;
