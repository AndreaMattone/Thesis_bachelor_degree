import { makeStyles, Toolbar } from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router';
import Blocks from '../modules/Blocks/Blocks';
import BlockDetails from '../modules/Blocks/BlockDetails';
import Contracts from '../modules/Contracts/Contracts';
import Dashboard from '../modules/Dashboard/Dashboard';
import Elections from '../modules/Elections/Elections';
import Network from '../modules/Network/Network';
import NotFound from '../modules/NotFound/NotFound';
import Transactions from '../modules/Transactions/Transactions';
import Disbursement from '../modules/Disbursement/Disbursement';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Content = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Toolbar />
      <div>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/Dashboard" />
          </Route>

          <Route path="/Dashboard">
            <Dashboard />
          </Route>

          <Route path="/Contracts">
            <Contracts />
          </Route>

          <Route path="/Transactions">
            <Transactions />
          </Route>

          <Route path="/Blocks/*">
            <BlockDetails />
          </Route>

          <Route path="/Blocks">
            <Blocks />
          </Route>

          <Route path="/Network">
            <Network />
          </Route>

          <Route path="/Disbursement">
            <Disbursement />
          </Route>

          <Route path="/Elections/Votes">
            <Elections />
          </Route>
          <Route path="/Elections/Discard">
            <Elections />
          </Route>
          <Route path="/Elections/Propose">
            <Elections />
          </Route>
          <Route path="/Elections/Info">
            <Elections />
          </Route>
          <Route path="/Elections">
            <Redirect to="/Elections/Info" />
          </Route>

          <Route path="*">
            {/*<Redirect exact from="/" to="/Welcome" />*/}
            <NotFound />
          </Route>
        </Switch>
      </div>
    </main>
  );
};

export default Content;
