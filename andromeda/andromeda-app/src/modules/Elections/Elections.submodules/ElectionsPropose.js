import {
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';

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
  },
  myBtnContainer: {
    marginTop: '1%',
  },
  myBtn: {
    color: 'white',
    background: '#3f51b5',
    width: '20%',
    height: '40px',
    border: 'none',
    '&:hover': {
      background: '#5566c3',
      cursor: 'pointer',
    },
    margin: '1%',
    marginBottom: '5%',
    padding: '2%',
    fontSize: '100%',
  },
  inputAddPropose: {
    width: '70%',
    margin: '5%',
  },
  subTitle: {
    marginLeft: '5%',
  },
  voteContainer: {
    marginLeft: '1%',
  },
}));

const ElectionsPropose = props => {
  const classes = useStyles();

  return (
    <Container>
      <Grid item xs={12} md={8} lg={10}>
        <Paper>
          <Typography className={classes.subTitle} variant="h6" gutterBottom>
            Propose an Account to become a Sealer
          </Typography>
          <TextField
            onChange={props.handleTextFieldAddNodeToProposeChange}
            value={props.textFieldAddNodeToPropose}
            className={classes.inputAddPropose}
            id="standard-basic"
            label="Insert Account Here"
          />
          <Container className={classes.myBtnContainer}>
            <button
              className={classes.myBtn}
              onClick={props.handleClickAddNodeToProposedNodes}
            >
              ADD
            </button>
          </Container>
          {/*<Container className={classes.voteContainer}>
                            <p className={classes.littleTitle}>You actually have voted this accounts to become Sealers</p>
                            <ul className={classes.myUl}>
                                {props.actualProposeVotes.map((vote) => (
                                    <li className={classes.myLi} key={vote}>{vote}</li>
                                ))}
                            </ul>
                        </Container>*/}
        </Paper>
      </Grid>
    </Container>
  );
};

export default ElectionsPropose;
