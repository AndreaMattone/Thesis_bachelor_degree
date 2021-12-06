import { Container, Grid, makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container:{
    },
}));
export default function Network() {
    const classes = useStyles();
    return(
        <main>
            <Container maxWidth="lg" className={classes.container}>
                <Typography variant="h5" gutterBottom>
                    Network
                </Typography>

                <Grid container spacing={3}>
                    {/**/}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper>
                            Something
                        </Paper>
                    </Grid>

                    {/**/}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper>
                        Something
                        </Paper>
                    </Grid>

                    {/**/}
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                        Something
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </main>
    );
}