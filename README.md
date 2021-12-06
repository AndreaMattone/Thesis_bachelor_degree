# Thesis
A project called "andromeda" for my thesis with Università degli Studi di Torino

* **[Pre-requisites](#pre-requisites)**


## Getting started
This project is my Thesis project with Università degli Studi di Torino made with Consoft Sistemi S.p.A.
Is a DAPP created for an Ethereum Blockchain Proof Of Authority made with
* React.js for the front-end, with the front end I'm interacting with the blockchain and with the Solidity contracts
* Solidity/Truffle for the deploy of a contract (written in Solidity) on the poa blockchain
* Geth/puppeth to create the blockchain proof of authority to test all the work


This is the organization of the project
* EthereumDappInfrastructure/media 
Contains all the simulation of the working product
* EthereumDappInfrastructure/mypoatest
Contains the blockchain made with geth (and the genesis.json file made with puppeth) where I've tested the project, you can use this blockchain without making a new one by using the commands in andromedaDappInfrastructure/mypoatest/accounts.txt or you can make a new one following https://github.com/AndreaMattone/Blockchain_Ethereum_PoA but make sure to correctly modify the andromeda project (more instructions later)
* EthereumDappInfrastructure/mypoatest/andromeda-app/andromeda-contracts 
Contains the truffle folder to deploy the contracts on the blockchain, If you use the blockchain on this repo the contract is deployed, if you have create a new blockchain you have to deploy the contract again (https://github.com/AndreaMattone/Blockchain_TruffleContractDeployOnPrivateBlockchain)
* EthereumDappInfrastructure/mypoatest/andromeda-app/gasLimit.txt
Make shure that if you create a new genesis.json file to use this gas limit or you will not be able to deploy contracts
* EthereumDappInfrastructure/mypoatest/andromeda-app/andromeda
Contains the React.js DAPP, open it with VSCode and run "npm install", "npm start"

is necessary to run even
 * npm install react-router
 * npm install @material-ui/core
 * npm install @material-ui/icons
 * npm i @open-rpc/client-js
 * npm install cors
 * npm install --save-dev @types/cors
 * npm install @fontsource/roboto
 * npm install @material-ui/lab

The module that I've developed is the "Election" module, you can find an example of usage in EthereumDappInfrastructure/media


## [Pre-requisites]
* Launch the blockchain o
