/** elections.js ############################################################################################################# */



/** 
 
    //Chiamata contratto da react

     * Add a node to the proposedList (whiteList), the list of the nodes that are waiting to be voted
     * @param {*} _address address of the node to add
     * @param {*} _description description of the node to add
     */
    //const [progressAddingNodeToProposed, setProgressAddingNodeToProposed] = useState(false);
    /*async function addNode(_address,_description){
        setProgressAddingNodeToProposed(true);
        console.log('start addnode');
        //let to = '0x1720Eb752D802D95c309954Bd43af2F6069c5B01'.toLocaleLowerCase();
        await ElectionsContract.methods.addNode(_address,_description).send({
            from: MY_ACCOUNT,
        });
        console.log('end addnode');
        setProgressAddingNodeToProposed(false);
    }
*/


/**
* 
* MY_ACCOUNT
* allNodes
* signers
* notSigners
* 
*/                            
/*
   <Grid container spacing={1}>
       <p className={classes.note}>[ Remember that if you commit a transaction on the blockchain it may be necessary some time to see the result]</p>
       <Grid item xs={12} md={8} lg={10}> 
           <Paper>
               <p className={classes.littleTitle}>LOGGED AS</p>
               <ul className={classes.myUl}>
                   <li>{MY_ACCOUNT}</li>
               </ul>
           </Paper>
       </Grid>
       <Grid item xs={12} md={8} lg={10}>
           <Paper>
               <p className={classes.littleTitle}>NODE LIST</p>
               <ul className={classes.myUl}>
                   {allNodes.map((node) => (
                       <li className={classes.myLi} key={node}>{node}</li>
                   ))}
               </ul>
           </Paper>
       </Grid>
       <Grid item xs={12} md={8} lg={10}>
           <Paper>
               <p className={classes.littleTitle}>SIGNERS LIST</p>
               <ul className={classes.myUl}>
                   {signers.map((signer) => (
                       <li className={classes.myLi} key={signer}>{signer}</li>
                   ))}
               </ul>
           </Paper>
       </Grid>
       <Grid item xs={12} md={8} lg={10}>
           <Paper>
               <p className={classes.littleTitle}>NOT SIGNERS LIST</p>
               <ul className={classes.myUl}>
                   {notSigners.map((notSigner) => (
                       <li className={classes.myLi} key={notSigner}>{notSigner}</li>
                   ))}
               </ul>
           </Paper>
       </Grid>                            
   </Grid>
*/
     



/** 
* onChange={handleTextFieldAddNodeToProposeChange} value={textFieldAddNodeToPropose}
* onClick={handleClickAddNodeToProposedNodes}
* actualProposeVotes
* 
*/
/*
    <Grid item xs={12} md={8} lg={10}>
        <Paper>
            <p className={classes.note}>[ Remember that if you commit a transaction on the blockchain it may be necessary some time to see the result]</p>
            <Typography className={classes.subTitle} variant="h6" gutterBottom >
                Propose an Account to become a Sealer
            </Typography>
            <TextField onChange={handleTextFieldAddNodeToProposeChange} value={textFieldAddNodeToPropose} className={classes.inputAddPropose} id="standard-basic" label="Insert Account Here" />
            <Container className={classes.myBtnContainer}>
                <button className={classes.myBtn} onClick={handleClickAddNodeToProposedNodes}>ADD</button>
            </Container>
            <Container className={classes.voteContainer}>
                <p className={classes.littleTitle}>You actually have voted this accounts to become Sealers</p>
                <ul className={classes.myUl}>
                    {actualProposeVotes.map((vote) => (
                        <li className={classes.myLi} key={vote}>{vote}</li>
                    ))}
                </ul>
            </Container>
            
        </Paper>
    </Grid>
*/

/**
* onChange={handleTextFieldDiscardNode} value={textFieldDiscardNode}
* onClick={handleClickDiscardNode}
* actualDiscardVotes
* 
*/
/*
    <Grid item xs={12} md={8} lg={10}>
        <Paper>
            <p className={classes.note}>[ Remember that if you commit a transaction on the blockchain it may be necessary some time to see the result]</p>
            <Typography className={classes.subTitle} variant="h6" gutterBottom >
                Propose to Discard a Sealer Account
            </Typography>
            <TextField onChange={handleTextFieldDiscardNode} value={textFieldDiscardNode} className={classes.inputAddPropose} id="standard-basic" label="Insert Account Here" />
            <Container className={classes.myBtnContainer}>
                <button className={classes.myBtn} onClick={handleClickDiscardNode}>REMOVE</button>
            </Container>
            <Container className={classes.voteContainer}>
                <p className={classes.littleTitle}>You actually have voted this accounts to be removed from Signers</p>
                <ul className={classes.myUl}>
                    {actualDiscardVotes.map((vote) => (
                        <li className={classes.myLi} key={vote}>{vote}</li>
                    ))}
                </ul>
            </Container>
        </Paper>
    </Grid>
*/