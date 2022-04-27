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
import PrivateRoute from "./PrivateRoute.jsx";

// a placeholder component to test if the material ui components are being rendered
// you can delete this TL anytime
function Placeholder() {
  return (
    <>
      <Typography variant="h1" component="div" gutterBottom>
        h1. Heading
      </Typography>
      <Typography variant="h2" gutterBottom component="div">
        h2. Heading
      </Typography>
      <Typography variant="h3" gutterBottom component="div">
        h3. Heading
      </Typography>
      <Typography variant="h4" gutterBottom component="div">
        h4. Heading
      </Typography>
      <Typography variant="h5" gutterBottom component="div">
        h5. Heading
      </Typography>
      <Typography variant="h6" gutterBottom component="div">
        h6. Heading
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div">
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur
      </Typography>
      <Typography variant="subtitle2" gutterBottom component="div">
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur
      </Typography>
      <Typography variant="body1" gutterBottom>
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Typography variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        button text
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        caption text
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
        overline text
      </Typography>
      <ButtonGroup variant="contained">
        <Button>Primary button</Button>
        <Button color="secondary">Secondary button</Button>
        <Button color="success">Success button</Button>
        <Button color="error">Error / failure button</Button>
        <Button color="info">Info button</Button>
        <Button color="warning">Warning button</Button>
        <Button color="default">Default button</Button>
      </ButtonGroup>
      <ButtonGroup variant="outlined">
        <Button>Primary button</Button>
        <Button color="secondary">Secondary button</Button>
        <Button color="success">Success button</Button>
        <Button color="error">Error / failure button</Button>
        <Button color="info">Info button</Button>
        <Button color="warning">Warning button</Button>
        <Button color="default">Default button</Button>
      </ButtonGroup>
      <Button variant="contained" startIcon={<AccessAlarmIcon />}>
        I am button with icon, bitch
      </Button>
    </>
  );
}

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
        <List>
          {routes.map((route, idx) => (
            <ListItem>
              <Link to={route.to} key={idx}>
                {route.name}
              </Link>
            </ListItem>
          ))}
        </List>
        <Routes>
          <Route path="/records" element={
            <PrivateRoute>
              <RecordListPage />
            </PrivateRoute>
          } />
          <Route path="/records/:id" element={
            <PrivateRoute>
              <RecordDetailsPage />
            </PrivateRoute>
            } />
          <Route
            path="/manage-committee"
            element={
              <PrivateRoute>
                <ManageCommitteeAccountsPage />
              </PrivateRoute> 
          }/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/records/add" element={
            <PrivateRoute>
               <AddStudentRecordPage />
            </PrivateRoute>
            } />
          <Route path="/records/:id/edit" element={
            <PrivateRoute>
              <EditStudentRecordPage />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
