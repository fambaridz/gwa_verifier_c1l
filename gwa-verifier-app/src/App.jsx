import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Button, ButtonGroup, Typography, CssBaseline } from "@mui/material";

import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
}

export default App;
