import React, { useEffect, useState } from 'react';
import { Container, Grid, makeStyles, Snackbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { RequestManager, HTTPTransport, Client } from '@open-rpc/client-js';
import Web3 from 'web3';
import TabsSwitch from '../../UI/TabsSwitch';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import ElectionsPropose from './Elections.submodules/ElectionsPropose';
import ElectionsInfo from './Elections.submodules/ElectionsInfo';
import ElectionsDiscard from './Elections.submodules/ElectionsDiscard';
import ElectionsVotes from './Elections.submodules/ElectionsVotes';
import { useLocation } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
const contractAbis = require('../../ContractsUtilities/abis/AndromedaElectionsAbi.json');
const contractAddresses = require('../../ContractsUtilities/ContractAddresses.json');

/**
 * CONNECTED TO THE LOCALHOST
 * ip:port of the node MY_ACCOUNT that you want to connect to
 *
 */
const transport = new HTTPTransport('http://127.0.0.1:8501');
//const requestManager = new RequestManager([transport]);
const client = new Client(new RequestManager([transport]));
const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8501');

/**
 * CONNECTED TO THE LOCALHOST
 * This array contains all the nodes of the blockchain network that you are connected
 * This is now working statically so you have to set manually here the address of the nodes of your blockchain
 */
const allNodes = [
  {
    id: 0,
    name: 'NODO_CONSOFT',
    address: '0x9B0FF28f3Cb75C1f76F0Afc7Da82ab6217c31c34'.toLocaleLowerCase(),
  },
  {
    id: 1,
    name: 'NODO_CSI',
    address: '0x74739340fA4B0E8c1cA7D4D1E0c46F3653780A41'.toLocaleLowerCase(),
  },
  {
    id: 2,
    name: 'NODO_UNITO',
    address: '0xC6593fB4480aC6ea18Cd8c37298529BD1D177100'.toLocaleLowerCase(),
  },
  {
    id: 3,
    name: 'Nodo_FREE_1',
    address: '0x304C5dE61bAb13d83bD895B4129564fc1A9ea7D5'.toLocaleLowerCase(),
  },
  {
    id: 4,
    name: 'NODO_FREE_2',
    address: '0x61ab3F0b70652DaA82F3B2F1Da527976914D38B5'.toLocaleLowerCase(),
  },
  {
    id: 5,
    name: 'NODO_FREE_3',
    address: '0x875925290B4AE7cD85b6A6FEAA78df0BEA46b776'.toLocaleLowerCase(),
  },
];

/**
 * CONNECTED TO LOCALHOST
 * Account of the connected node
 * This is now working statically so you have to insert here manually the account of the node that you are connected on (make sure it is the same accout of the ip:port of const transport = new HTTPTransport('http://127.0.0.1:8501');)
 */
const MY_ACCOUNT =
  '0x9B0FF28f3Cb75C1f76F0Afc7Da82ab6217c31c34'.toLocaleLowerCase();
/**
 *  Address of the contract that you want to connect
 *  This is now working statically so you have to insert here manually the address of the contract that you have deployed on your blockain
 */
const contractAddr = contractAddresses.AndromedaElections;
const ElectionsContract = new web3.eth.Contract(contractAbis.abi, contractAddr);

const useStyles = makeStyles(theme => ({
  elements: {
    marginTop: '1%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 2,
    color: '#fff',
  },
}));

export default function Elections() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  /** List of the Signers in the network (dinamic) */
  const [signers, setSigners] = useState([]);
  /** List of the NOT Signers in the network  */
  const [notSigners, setNotSigners] = useState([]);
  /** MyVotesToProposeAccount */
  const [actualProposeVotes, setActualProposeVotes] = useState([]);
  /** MyVotesToDiscardAccount */
  const [actualDiscardVotes, setActualDiscardVotes] = useState([]);

  /**
   * Function that associate the name of the node with his address
   */
  function getNodeAddressFromName(nodeName) {
    var ret = 'null';
    for (const index in allNodes) {
      if (!nodeName.localeCompare(allNodes[index].name)) {
        ret = allNodes[index].address;
      }
    }
    return ret;
  }

  /**
   * Function that associate the address of the node with his name
   */
  function getNodeNameFromAddress(nodeAddress) {
    var ret = 'null';
    for (const index in allNodes) {
      if (!nodeAddress.localeCompare(allNodes[index].address)) {
        ret = allNodes[index].name;
      }
    }
    return ret;
  }

  /** ################ FIRST RENDER OF THE MODULE ######################################
   *  ###################################################################################
   *  PreCondition: We have the allNodes list
   *  @ Get the signers list  - FROM THE BLOCKCHAIN
   *  @ Calculate the NOT signers nodes  - LOCALLY
   *  @ Get the votes that I actually have - FROM THE BLOCKCHAIN
   */
  useEffect(() => {
    async function initializate() {
      /**  Get actual signers */
      const signers = await client.request({
        mode: 'no-cors',
        method: 'clique_getSigners',
        params: [],
      });
      setSigners(signers);
      //console.log(signers);
      /** Calculate the NOT signers nodes */
      computeNotSignersNodesLocally(signers);

      /**  Get MyVotesToProposeAccount */
      /*const votes = await client.request({
        mode: 'no-cors',
        method: 'clique_proposals',
        params: [],
      });
      computeVotes(votes);*/
      //console.log(votes);
    }
    initializate();

    /*
        {// If you want to get the nodes data (allNodes datas) from the server}
        async function getNodesData(){
            try{
                const response = await fetch(`https://app.pinin-project.eu/andromeda-services/registry/contacts`);
                const data = await response.json();
                console.log(data);
           } catch (error){
           }
        }
        getNodesData();
    */

    const actualPath = location.pathname.substring(11);
    if (!actualPath.localeCompare('Info')) {
      setTabValue(0);
      setVisualizeTab(0);
    }
    if (!actualPath.localeCompare('Propose')) {
      setTabValue(1);
      setVisualizeTab(1);
    }
    if (!actualPath.localeCompare('Discard')) {
      setTabValue(2);
      setVisualizeTab(2);
    }
    if (!actualPath.localeCompare('Votes')) {
      setTabValue(3);
      setVisualizeTab(3);
    }
  }, []);

  /**
   * Calculate the NOT signers nodes LOCALLY
   * @param {*} signers
   */
  function computeNotSignersNodesLocally(signers) {
    const notSigners = [];
    //console.log(allNodes);
    //console.log(allNodes.length);

    for (let i = 0; i < allNodes.length; i++) {
      let same = false;
      for (let j = 0; j < signers.length; j++) {
        if (allNodes[i].address.localeCompare(signers[j]) === 0) {
          same = true;
        }
      }
      if (same === false) {
        notSigners.push(allNodes[i].address);
      }
    }
    setNotSigners(notSigners);
    /*
        for(let i=0;i<allNodes.length;i++){
            let same = false;
            for(let j=0;j<signers.length;j++){
                if(allNodes[i].localeCompare(signers[j]) === 0){
                    same= true;
                }
            }
            if(same===false){
                notSigners.push(allNodes[i]);
            }
        }
        setNotSigners(notSigners);
    */
  }

  /**
   * //TODO spiegare l'hash map ecc.
   * @param {*} votes
   */
  /*function computeVotes(votes) {
    const allActualVotedAccounts = Object.keys(votes);
    const actualProposed = [];
    const actualDiscarded = [];
    for (let i = 0; i < allActualVotedAccounts.length; i++) {
      let vote = votes[allActualVotedAccounts[i]];
      if (vote === true) {
        actualProposed.push(allActualVotedAccounts[i]);
      }
      if (vote === false) {
        actualDiscarded.push(allActualVotedAccounts[i]);
      }
    }
    setActualDiscardVotes(actualDiscarded);
    setActualProposeVotes(actualProposed);
  }*/

  /**
   * #####################################################################################
   * ##################### PROPOSE A NODE TO BECOME A SEALER #############################
   * #####################################################################################
   */
  const [textFieldAddNodeToPropose, setTextFieldAddNodeToPropose] =
    useState('');
  function handleTextFieldAddNodeToProposeChange(e) {
    //console.log(e.target.value);
    setTextFieldAddNodeToPropose(e.target.value);
  }

  async function handleClickAddNodeToProposedNodes(event) {
    event.preventDefault();
    handleToggle();
    setBackDropMsg('Voting in progress...');
    if (textFieldAddNodeToPropose.localeCompare('')) {
      /** Add the node in blockchain */
      console.log(textFieldAddNodeToPropose);
      var nodeAddr = getNodeAddressFromName(textFieldAddNodeToPropose);
      console.log(nodeAddr);
      if (nodeAddr.localeCompare(null)) {
        console.log('voted to propose started');
        await client.request({
          mode: 'no-cors',
          method: 'clique_propose',
          params: [nodeAddr, true],
        });
        console.log('voted to propose ended');

        /** Add the vote to the history */

        var today = new Date();
        var todayBuono = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        ).getTime();
        console.log(todayBuono);

        console.log('voted to propose save in blockchain cronology started');
        setBackDropMsg('Saving vote history...');
        const result = await ElectionsContract.methods
          .voteCommitted(nodeAddr, 'true', todayBuono / 1000)
          .send({
            from: MY_ACCOUNT,
          });
        console.log('voted to propose save in blockchain cronology ended');
        console.log('result: ', result);

        handleClose();
        giveFeedback('Account voted to become a Sealer!', 'success');
      } else {
        console.log('errore');
        handleClose();
        giveFeedback('Error, the given account does not match!', 'error');
      }
    } else {
      handleClose();
      giveFeedback('Error!', 'error');
    }
  }

  /**
   * #####################################################################################
   * #################### PROPOSE TO DISCARD A SEALER ACCOUNT ############################
   * #####################################################################################
   */
  const [textFieldDiscardNode, setTextFieldDiscardNode] = useState('');
  function handleTextFieldDiscardNode(e) {
    setTextFieldDiscardNode(e.target.value);
  }
  async function handleClickDiscardNode(event) {
    event.preventDefault();
    handleToggle();
    setBackDropMsg('Voting in progress...');
    if (textFieldDiscardNode.localeCompare('')) {
      var nodeAddr = getNodeAddressFromName(textFieldDiscardNode);
      console.log(nodeAddr);
      if (nodeAddr.localeCompare(null)) {
        console.log('voted to discard started');
        await client.request({
          mode: 'no-cors',
          method: 'clique_propose',
          params: [nodeAddr, false],
        });
        console.log('voted to discard ended');

        /** Add the vote to the history */
        var today = new Date();
        var todayBuono = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        ).getTime();
        console.log(todayBuono);
        console.log('voted to discard written in blockchain cronology started');
        setBackDropMsg('Saving vote history...');
        const result = await ElectionsContract.methods
          .voteCommitted(nodeAddr, 'false', todayBuono / 1000)
          .send({
            from: MY_ACCOUNT,
          });
        console.log('voted to discard written in blockchain cronology ended');
        console.log('result: ', result);

        handleClose();
        giveFeedback('Account voted to be removed from Signers!', 'success');
      } else {
        console.log('errore');
        handleClose();
        giveFeedback('Error, the given account does not match!', 'error');
      }
    } else {
      handleClose();
      giveFeedback('Error!', 'error');
    }
  }

  /**
   * #####################################################################################
   * ############################### MENU TAB LOGIC ######################################
   * #####################################################################################
   */
  const [tabValue, setTabValue] = React.useState(0);
  const [visualizeTab, setVisualizeTab] = React.useState(0);
  /**
   * Handle click on item of the Menu tab on top of the page
   * @param {*} event
   */
  const handleMenClick = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) {
      history.push('/Elections/Info');
      setVisualizeTab(0);
    }
    if (newValue === 1) {
      history.push('/Elections/Propose');
      setVisualizeTab(1);
    }
    if (newValue === 2) {
      history.push('/Elections/Discard');
      setVisualizeTab(2);
    }
    if (newValue === 3) {
      history.push('/Elections/Votes');
      setVisualizeTab(3);
    }
  };

  /**
   * #####################################################################################
   * ############################ ALERT LOGIC FEEDBACK  ##################################
   * #####################################################################################
   */
  function giveFeedback(msg, severity) {
    setAlertMsg(msg);
    setAlertSeverity(severity);
    setOpenAlert(true);
  }
  const [alertMsg, setAlertMsg] = React.useState('');
  const [alertSeverity, setAlertSeverity] = React.useState('error');
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  /**
   * #####################################################################################
   * ############################ BACKDROP LOGIC   ##################################
   * #####################################################################################
   */
  /** Backdrop */
  const [open, setOpen] = React.useState(false);
  const [backDropMsg, setBackDropMsg] = React.useState('');
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <main>
      <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h5" gutterBottom>
          Elections
        </Typography>

        <Grid container spacing={3} className={classes.elements}>
          {/** ############################ SWITCH TAB ############################################################# */}
          {/** NB Se voglio aggiungere una tab devo modificare anche il path in  Content.js*/}
          <TabsSwitch
            valuesArray={['Info', 'Propose Sealer', 'Discard Sealer', 'Votes']}
            handleTabClick={handleMenClick}
            actualValue={tabValue}
          />

          {/** ######################################### INFO TAB ##################################################*/}
          {visualizeTab === 0 && (
            <Container>
              <p></p>
              <ElectionsInfo
                MY_ACCOUNT={MY_ACCOUNT}
                allNodes={allNodes}
                signers={signers}
                notSigners={notSigners}
                getNodeAddressFromName={getNodeAddressFromName}
                getNodeNameFromAddress={getNodeNameFromAddress}
              />
            </Container>
          )}

          {/** ############################ VOTE TO ADD A SEALER ########################################## */}
          {visualizeTab === 1 && (
            <Container>
              <ElectionsPropose
                handleTextFieldAddNodeToProposeChange={
                  handleTextFieldAddNodeToProposeChange
                }
                textFieldAddNodeToPropose={textFieldAddNodeToPropose}
                handleClickAddNodeToProposedNodes={
                  handleClickAddNodeToProposedNodes
                }
                actualProposeVotes={actualProposeVotes}
              />
            </Container>
          )}
          {/** ############################ VOTE TO REMOVE A SEALER ########################################## */}
          {visualizeTab === 2 && (
            <Container>
              <ElectionsDiscard
                handleTextFieldDiscardNode={handleTextFieldDiscardNode}
                textFieldDiscardNode={textFieldDiscardNode}
                handleClickDiscardNode={handleClickDiscardNode}
                actualDiscardVotes={actualDiscardVotes}
              />
            </Container>
          )}

          {/** ############################ MY VOTES ########################################## 
                     * 
                            <Button onClick={testGetVotes}>test</Button>
                    */}
          {visualizeTab === 3 && (
            <Container>
              <ElectionsVotes
                MY_ACCOUNT={MY_ACCOUNT}
                ElectionsContract={ElectionsContract}
                getNodeAddressFromName={getNodeAddressFromName}
                getNodeNameFromAddress={getNodeNameFromAddress}
              />
            </Container>
          )}
        </Grid>
      </Container>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={alertSeverity}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <Backdrop className={classes.backdrop} open={open}>
        <div>
          <p style={{ marginLeft: '40%' }}>{backDropMsg}</p>
          <CircularProgress style={{ marginLeft: '40%' }} color="inherit" />
        </div>
      </Backdrop>
    </main>
  );
}
