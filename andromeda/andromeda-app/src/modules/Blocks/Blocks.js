import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 1000,
  },
  btnNextPage: {
    padding: '2%',
    float: 'right',
  },
  arrowBack: {
    marginRight: '20px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  arrowNext: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default function Blocks() {
  const classes = useStyles();

  /**
   * When the module is opened for the first time i get the blocks data
   */
  useEffect(() => {
    getBlocksData();
  }, []);

  /**
   * BLOCKS STATE
   */
  /** Blocks list */
  const [blocksList, setBlocksList] = useState([]);
  /** This is the numbers of blocks to get from the server */
  const [howManyBlocks, setHowManyBlocks] = useState(0);
  /** Actual block selected (used to get the block details from the server */
  let actualBlockNumber = null;

  /** List of the rows containing the block data */
  const rows = [];

  /** State of the rows visualzation*/
  const [page, setPage] = React.useState(0);
  const [actualOffset, setActualOffset] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  /** Columns structure */
  const columns = [
    { id: 'number', label: 'Block Number', minWidth: 50 },
    { id: 'hash', label: 'Hash', minWidth: 100 },
    { id: 'transactionCount', label: 'Transaction Count', minWidth: 50 },
    { id: 'time', label: 'Time ', minWidth: 100 },
  ];

  /**
   * This functions return the object row
   * @param {*} number
   * @param {*} hash
   * @param {*} transactionCount
   * @param {*} time
   * @returns
   */
  function createData(number, hash, transactionCount, time) {
    return { number, hash, transactionCount, time };
  }

  /**
   * Validates the rows array with the blocks data
   */
  const validateRows = () => {
    for (let counter = 0; counter < blocksList.length; counter++) {
      rows.push(
        createData(
          blocksList[counter].number,
          blocksList[counter].hash,
          blocksList[counter].transactionsCount,
          blocksList[counter].timestamp
        )
      );
    }
  };

  /**
   * Functions that get the blocks data from the server
   */
  async function getBlocksData() {
    try {
      const response = await fetch(
        `https://app.pinin-project.eu/andromeda-services/indexer/blocks?limit=1&offset=1`
      );
      const data = await response.json();
      setHowManyBlocks(data.totalResults);
      const res = await fetch(
        `https://app.pinin-project.eu/andromeda-services/indexer/blocks?limit=25&offset=${actualOffset}`
      );
      const blocks = await res.json();
      setBlocksList(blocks.items);
    } catch (error) {}
  }

  /**
   * Handle the blick on the button to get the previous page of the blocks list
   */
  async function handlePreviousPageClick() {
    if (actualOffset !== 0) {
      const response = await fetch(
        `https://app.pinin-project.eu/andromeda-services/indexer/blocks?limit=1&offset=1`
      );
      const data = await response.json();
      setHowManyBlocks(data.totalResults);
      const newOffset = actualOffset - 25;
      setActualOffset(newOffset);
      const res = await fetch(
        `https://app.pinin-project.eu/andromeda-services/indexer/blocks?limit=25&offset=${newOffset}`
      );
      const blocks = await res.json();
      setBlocksList(blocks.items);
    }
  }

  /**
   * Handle the blick on the button to get the next page of the blocks list
   */
  async function handleNextPageClick() {
    if (actualOffset + 25 <= howManyBlocks) {
      const response = await fetch(
        `https://app.pinin-project.eu/andromeda-services/indexer/blocks?limit=1&offset=1`
      );
      const data = await response.json();
      setHowManyBlocks(data.totalResults);
      const newOffset = actualOffset + 25;
      setActualOffset(newOffset);
      const res = await fetch(
        `https://app.pinin-project.eu/andromeda-services/indexer/blocks?limit=25&offset=${newOffset}`
      );
      const blocks = await res.json();
      setBlocksList(blocks.items);
    }
  }

  return (
    <main>
      {validateRows()}
      <Container maxWidth="lg" className={classes.container}>
        <Typography style={{ marginBottom: '5%' }} variant="h5" gutterBottom>
          Blocks
        </Typography>

        <Grid container spacing={3}>
          {/*list of blocks*/}
          <Grid item xs={12} md={10} lg={12}>
            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map(column => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(row => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.hash}
                          >
                            {columns.map(column => {
                              const value = row[column.id];
                              if (column.id === 'number') {
                                actualBlockNumber = value;
                              }
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.id !== 'hash' && value}
                                  {column.id === 'hash' && (
                                    <NavLink
                                      to={`/Blocks/${value}&${actualBlockNumber}`}
                                      key={column.id}
                                      style={{ color: '#5773ff' }}
                                    >
                                      {value}
                                    </NavLink>
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>

              <div
                className={classes.btnNextPage}
                style={{ borderBottom: 'solid 1px #cccccc' }}
              >
                <NavigateBeforeIcon
                  className={classes.arrowBack}
                  onClick={handlePreviousPageClick}
                />
                <NavigateNextIcon
                  className={classes.arrowNext}
                  onClick={handleNextPageClick}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
