import { AppBar, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import SearchAppBar from "./SearchAppBar";

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },

}));

const Header = () => {
    const classes = useStyles();
    return (
            <AppBar className={classes.appBar}>
                <Toolbar>
                  <SearchAppBar />
                </Toolbar >
            </AppBar>
    );
}

export default Header;