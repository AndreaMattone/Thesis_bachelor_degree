import { Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

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
  myBtnContainer: {
    marginTop: '1%',
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

const ElectionsVotes = props => {
  const classes = useStyles();

  useEffect(() => {
    getVotes();
  }, []);

  const [allVotes, setAllVotes] = useState([]);
  const [filterAccount, setFilterAccount] = useState('');
  const [filterDate, setFilterDate] = useState('');

  async function getVotes() {
    /*
    let result = await props.ElectionsContract.methods.getVotes().call({
      from: props.MY_ACCOUNT,
    });
    /*console.log(result);
        console.log(result.vote.length);
        console.log(result.date);
        console.log(result.nodeVoted);
        console.log(result.vote);
    
    //myVotes = result;

    let votedAccounts = [];
    let votes = [];
    let dates = [];
    for (let counter = 0; counter < result.vote.length; counter++) {
      votedAccounts.push(result.nodeVoted[counter]);
      votes.push(result.vote[counter]);
      dates.push(result.date[counter]);
    }
    //console.log(votedAccounts);
    //console.log(votes);
    //console.log(dates);
    setMyVotedAccounts(votedAccounts);
    setMyVotes(votes);
    setMyDates(dates);
    //console.log("called");
    */

    const myRes = await props.ElectionsContract.getPastEvents('VoteEvent', {
      filter: {
        votingAccountIndexer: filterAccount,
        myDateIndexer: filterDate,
      },
      fromBlock: 1,
      toBlock: 'latest',
    });

    //console.log(myRes);
    setAllVotes(myRes);
  }

  function createDate(epoch) {
    var d = new Date(0);
    d.setUTCSeconds(epoch);
    var ret = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    return ret;
  }
  return (
    <Container>
      <Grid item xs={12} md={8} lg={10}>
        <Paper>
          <p className={classes.littleTitle}>VOTES</p>
          <ul className={classes.myUl}>
            {allVotes.map((Vote, index) => (
              <li className={classes.myLi} key={index}>
                <div style={{ float: 'left', color: '#3f51b5' }}>
                  {props.getNodeNameFromAddress(
                    Vote.returnValues[0].toLocaleLowerCase()
                  )}
                </div>
                <div style={{ float: 'left' }}>&nbsp;</div>
                <div style={{ float: 'left' }}> voted </div>
                <div style={{ float: 'left' }}>&nbsp;</div>
                <div style={{ float: 'left', color: '#3f51b5' }}>
                  {props.getNodeNameFromAddress(
                    Vote.returnValues[2].toLocaleLowerCase()
                  )}
                </div>
                <div style={{ float: 'left' }}>&nbsp;</div>
                <div style={{ float: 'left' }}> with vote </div>
                <div style={{ float: 'left' }}>&nbsp;</div>
                <div style={{ float: 'left', color: '#3f51b5' }}>
                  {Vote.returnValues[3]}
                </div>
                <div style={{ float: 'left' }}>&nbsp;</div>
                <div style={{ float: 'left' }}> in date </div>
                <div style={{ float: 'left' }}>&nbsp;</div>
                <div style={{ color: '#3f51b5' }}>
                  {createDate(Vote.returnValues[1])}
                </div>
              </li>
            ))}
          </ul>
        </Paper>
      </Grid>
    </Container>
  );
};
export default ElectionsVotes;
