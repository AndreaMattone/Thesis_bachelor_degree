import { Grid, makeStyles, Tab, Tabs } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root:{
        flexGrow: 1,
    },
    container:{
    },
    tabs:{
        marginTop:'2%'
    },
    elements:{
        marginTop:'1%'
    },
}));

export default function TabsSwitch(props) {
    const classes = useStyles();

    return(
        <Grid item xs={12} md={8} lg={10} className={classes.tabs}>
            <Tabs
                value={props.actualValue}
                indicatorColor="primary"
                textColor="primary"
                centered
                onChange={props.handleTabClick}
            >
                {props.valuesArray.map((value) => (
                    <Tab key={value} style={{}} label={value} />
                ))}
            </Tabs>
        </Grid>
    );
}