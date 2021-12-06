import { Container, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {},
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={9}>
          NOT FOUND!
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;
