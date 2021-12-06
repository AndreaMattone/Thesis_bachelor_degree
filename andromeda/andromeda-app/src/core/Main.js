import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LeftDrawer from './LeftDrawer';
import Header from './Header/Header';
import Content from './Content';

/**
 * npm install react-router
 * npm install @material-ui/core
 * npm install @material-ui/icons
 * npm i @open-rpc/client-js
 * npm install cors
 * npm install --save-dev @types/cors
 * npm install @fontsource/roboto
 * npm install @material-ui/lab
 */

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function Main() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <LeftDrawer />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Content />
          </Grid>
        </Container>
      </main>
    </div>
  );
}
