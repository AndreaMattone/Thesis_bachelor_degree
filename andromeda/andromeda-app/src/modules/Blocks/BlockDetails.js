import {
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const useStyles = makeStyles(theme => ({
  container: {},
  mainInfo: {
    fontSize: '110%',
  },
  infoTitles: {
    color: '#c0c0c0',
  },
  transactionCounter: {
    fontSize: '160%',
    background: '#3f51b5',
    color: 'white',
    padding: '1%',
  },
  blockInfoLine: {
    marginBottom: '1%',
  },
}));

export default function BlocksDetails(props) {
  const classes = useStyles();
  const location = useLocation();

  const blockHash = location.pathname.substring(8, 74);
  const blockNumber = location.pathname.substring(75);
  const [myBlock, setMyBlock] = useState();

  async function getBlocksData() {
    try {
      /*
      console.log(blockNumber);
      const response = await fetch(
        `https://app.pinin-project.eu/andromeda-services/indexer/blocks?limit=1&offset=1`
      );
      const data = await response.json();
      //Get the blockNumber block 
      const res = await fetch(
        `https://app.pinin-project.eu/andromeda-services/indexer/blocks?limit=1&offset=${
          data.totalResults - blockNumber
        }`
      );
      const block = await res.json();
      const myBlock = block.items[0];
      setMyBlock(myBlock);
      */

      console.log(blockHash);
      const blockByHash = await fetch(
        `https://app.pinin-project.eu/andromeda-services/indexer/blocks?hash=${blockHash}`
      );
      var r = await blockByHash.json();
      console.log('r: ', r);
      const myBlock = r.items[0];
      setMyBlock(myBlock);
    } catch (error) {}
  }
  useEffect(() => {
    getBlocksData();
  }, []);

  const [additionalDetailsVisualize, setAdditionalDetailsVisualize] =
    useState(false);
  function handleClickAdditionalDetails() {
    const newVal = !additionalDetailsVisualize;
    setAdditionalDetailsVisualize(newVal);
  }

  return (
    <main>
      <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h5" gutterBottom>
          Block Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7} lg={9}>
            <Paper style={{ overflow: 'auto', padding: '1%' }}>
              <div className={classes.mainInfo}>
                <p style={{ fontSize: '160%' }}>{blockNumber}</p>
                <div className={classes.blockInfoLine}>
                  <span className={classes.infoTitles}>
                    Hash:{' '}
                    <span style={{ color: 'black' }}>
                      {typeof myBlock !== 'undefined' && myBlock.hash}
                    </span>
                  </span>
                  <br />
                </div>
                <div className={classes.blockInfoLine}>
                  <span className={classes.infoTitles}>
                    Parent Hash:{' '}
                    <span style={{ color: 'black' }}>
                      {typeof myBlock !== 'undefined' && myBlock.parentHash}
                    </span>
                  </span>
                  <br />
                </div>
                <div className={classes.blockInfoLine}>
                  <span className={classes.infoTitles}>
                    Time Stamp:{' '}
                    <span style={{ color: 'black' }}>
                      {typeof myBlock !== 'undefined' && myBlock.timestamp}
                    </span>
                  </span>
                  <br />
                </div>
                <div className={classes.blockInfoLine}>
                  <span className={classes.infoTitles}>
                    Miner Addres:{' '}
                    <span style={{ color: 'black' }}>
                      {typeof myBlock !== 'undefined' && myBlock.minerAddress}
                    </span>
                  </span>
                  <br />
                </div>
                <div className={classes.blockInfoLine}>
                  <span className={classes.infoTitles}>
                    Size:{' '}
                    <span style={{ color: 'black' }}>
                      {typeof myBlock !== 'undefined' && myBlock.size}
                    </span>
                  </span>
                  <br />
                </div>
              </div>

              <div
                onClick={handleClickAdditionalDetails}
                style={{
                  cursor: 'pointer',
                  paddingTop: '4%',
                  paddingBottom: '2%',
                }}
              >
                Additional Details{' '}
                {!additionalDetailsVisualize ? (
                  <ExpandMoreIcon style={{ paddingTop: '2%' }} />
                ) : (
                  <ExpandLessIcon style={{ paddingTop: '2%' }} />
                )}
              </div>
              {additionalDetailsVisualize && (
                <div>
                  <Divider />
                  <div style={{ paddingBottom: '2%' }} />
                  <div className={classes.blockInfoLine}>
                    <span className={classes.infoTitles}>
                      Average Fee:{' '}
                      <span style={{ color: 'black' }}>
                        {typeof myBlock !== 'undefined' && myBlock.averageFee}
                      </span>
                    </span>
                    <br />
                  </div>
                  <div className={classes.blockInfoLine}>
                    <span className={classes.infoTitles}>
                      Average Gas:{' '}
                      <span style={{ color: 'black' }}>
                        {typeof myBlock !== 'undefined' && myBlock.averageGas}
                      </span>
                    </span>
                    <br />
                  </div>
                  <div className={classes.blockInfoLine}>
                    <span className={classes.infoTitles}>
                      Average Gas Price:{' '}
                      <span style={{ color: 'black' }}>
                        {typeof myBlock !== 'undefined' &&
                          myBlock.averageGasPrice}
                      </span>
                    </span>
                    <br />
                  </div>
                  <div className={classes.blockInfoLine}>
                    <span className={classes.infoTitles}>
                      Average Value:{' '}
                      <span style={{ color: 'black' }}>
                        {typeof myBlock !== 'undefined' && myBlock.averageValue}
                      </span>
                    </span>
                    <br />
                  </div>
                  <div className={classes.blockInfoLine}>
                    <span className={classes.infoTitles}>
                      Difficulty:{' '}
                      <span style={{ color: 'black' }}>
                        {typeof myBlock !== 'undefined' && myBlock.difficulty}
                      </span>
                    </span>
                    <br />
                  </div>
                  <div className={classes.blockInfoLine}>
                    <span className={classes.infoTitles}>
                      Gas Limit:{' '}
                      <span style={{ color: 'black' }}>
                        {typeof myBlock !== 'undefined' && myBlock.gasLimit}
                      </span>
                    </span>
                    <br />
                  </div>
                  <div className={classes.blockInfoLine}>
                    <span className={classes.infoTitles}>
                      Gas Used:{' '}
                      <span style={{ color: 'black' }}>
                        {typeof myBlock !== 'undefined' && myBlock.gasUsed}
                      </span>
                    </span>
                    <br />
                  </div>
                  <div className={classes.blockInfoLine}>
                    <span className={classes.infoTitles}>
                      Indexed:{' '}
                      <span style={{ color: 'black' }}>
                        {typeof myBlock !== 'undefined' && myBlock.indexed}
                      </span>
                    </span>
                    <br />
                  </div>
                  <div className={classes.blockInfoLine}>
                    <span className={classes.infoTitles}>
                      Nonce:{' '}
                      <span style={{ color: 'black' }}>
                        {typeof myBlock !== 'undefined' && myBlock.nonce}
                      </span>
                    </span>
                    <br />
                  </div>
                  <div className={classes.blockInfoLine}>
                    <span className={classes.infoTitles}>
                      Total Difficulty:{' '}
                      <span style={{ color: 'black' }}>
                        {typeof myBlock !== 'undefined' &&
                          myBlock.totalDifficulty}
                      </span>
                    </span>
                    <br />
                  </div>
                  <div className={classes.blockInfoLine}>
                    <span className={classes.infoTitles}>
                      Total Fee:{' '}
                      <span style={{ color: 'black' }}>
                        {typeof myBlock !== 'undefined' && myBlock.totalFee}
                      </span>
                    </span>
                    <br />
                  </div>
                  <div className={classes.blockInfoLine}>
                    <span className={classes.infoTitles}>
                      Total Value:{' '}
                      <span style={{ color: 'black' }}>
                        {typeof myBlock !== 'undefined' && myBlock.totalValue}
                      </span>
                    </span>
                    <br />
                  </div>
                </div>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={3} lg={3}>
            <Paper>
              <div className={classes.transactionCounter}>
                Transaction Count
                <p style={{ paddingLeft: '2%' }}>
                  {typeof myBlock !== 'undefined' && myBlock.transactionsCount}
                </p>
                <Divider />
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8} lg={12}>
            <Paper>
              <div>Transactions</div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
