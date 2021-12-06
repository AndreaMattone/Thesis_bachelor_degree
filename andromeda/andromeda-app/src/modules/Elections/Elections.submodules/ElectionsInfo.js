import { Container, Grid, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {},
  note: {
    marginLeft: '5%',
    color: 'red',
    fontSize: '100%',
  },
  myUl: {
    listStyleType: 'none',
  },
  myLi: {},
  littleTitle: {
    color: '#3f51b5',
    fontWeight: 'bold',
  },
}));

const ElectionsInfo = props => {
  const classes = useStyles();
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8} lg={10}>
          <Paper>
            <p className={classes.littleTitle}>LOGGED AS</p>
            <ul className={classes.myUl}>
              <li>
                {' '}
                <div style={{ float: 'left', color: '#3f51b5' }}>
                  {props.getNodeNameFromAddress(props.MY_ACCOUNT)}
                </div>{' '}
                <div style={{ float: 'left' }}>&emsp;</div>{' '}
                <div>{props.MY_ACCOUNT}</div>
              </li>
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={10}>
          <Paper>
            <p className={classes.littleTitle}>NODE LIST</p>
            <ul className={classes.myUl}>
              {props.allNodes.map(node => (
                <li className={classes.myLi} key={node.address}>
                  {' '}
                  <div style={{ float: 'left', color: '#3f51b5' }}>
                    {props.getNodeNameFromAddress(node.address)}
                  </div>{' '}
                  <div style={{ float: 'left' }}>&emsp;</div>{' '}
                  <div>{node.address}</div>
                </li>
              ))}
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={10}>
          <Paper>
            <p className={classes.littleTitle}>SIGNERS LIST</p>
            <ul className={classes.myUl}>
              {props.signers.map(signer => (
                <li className={classes.myLi} key={signer}>
                  <div style={{ float: 'left', color: '#3f51b5' }}>
                    {props.getNodeNameFromAddress(signer)}
                  </div>{' '}
                  <div style={{ float: 'left' }}>&emsp;</div>{' '}
                  <div>{signer}</div>
                </li>
              ))}
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={10}>
          <Paper>
            <p className={classes.littleTitle}>CANDIDATE LIST</p>
            <ul className={classes.myUl}>
              {props.notSigners.map(notSigner => (
                <li className={classes.myLi} key={notSigner}>
                  <div style={{ float: 'left', color: '#3f51b5' }}>
                    {props.getNodeNameFromAddress(notSigner)}
                  </div>{' '}
                  <div style={{ float: 'left' }}>&emsp;</div>{' '}
                  <div>{notSigner}</div>
                </li>
              ))}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ElectionsInfo;
