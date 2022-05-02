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
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

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
    to: "/login",
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* replace this list component with the navbar */}
        <List>
          {routes.map((route, idx) => (
            <ListItem key={idx}>
              <Link to={route.to}>{route.name}</Link>
            </ListItem>
          ))}
        </List>
        <Routes>
          <Route path="/records" element={<RecordListPage />} />
          <Route path="/records/:id" element={<RecordDetailsPage />} />
          <Route
            path="/manage-committee"
            element={<ManageCommitteeAccountsPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/records/add" element={<AddStudentRecordPage />} />
          <Route path="/records/:id/edit" element={<EditStudentRecordPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
