import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import React from 'react';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import SwapHorizOutlinedIcon from '@material-ui/icons/SwapHorizOutlined';
import CropFreeOutlinedIcon from '@material-ui/icons/CropFreeOutlined';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import PaymentIcon from '@material-ui/icons/Payment';
import { NavLink } from 'react-router-dom';

/** Left navigation menu width */
const drawerWidth = 240;

/**
 * Modules
 * NB to add a module:
 * * Add the module in modules array
 * * Add the icon matching the index
 * * Add the routing in core/Content
 */
const modules = [
  'Dashboard',
  'Contracts',
  'Transactions',
  'Blocks',
  'Network',
  'Elections',
  'Disbursement',
];

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
}));

const LeftDrawer = props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* Left nav bar */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {modules.map((text, index) => (
              <NavLink
                to={`/${text}`}
                key={text}
                style={{ textDecoration: 'none', color: '#757575' }}
              >
                <ListItem button key={text}>
                  {/** Insert here icons, make sure that you match the index of the "modules" array */}
                  <ListItemIcon>
                    {index === 0 ? (
                      <HomeOutlinedIcon />
                    ) : index === 1 ? (
                      <InsertDriveFileOutlinedIcon />
                    ) : index === 2 ? (
                      <SwapHorizOutlinedIcon />
                    ) : index === 3 ? (
                      <CropFreeOutlinedIcon />
                    ) : index === 4 ? (
                      <AccountTreeOutlinedIcon />
                    ) : index === 5 ? (
                      <VerifiedUserOutlinedIcon />
                    ) : (
                      <PaymentIcon />
                    )}{' '}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </NavLink>
            ))}
          </List>

          <Divider />
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default LeftDrawer;
