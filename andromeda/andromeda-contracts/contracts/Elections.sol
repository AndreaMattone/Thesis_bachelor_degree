pragma solidity >=0.4.22 <0.8.0;


contract Elections {
    
    address owner;

    struct WhiteNode {
        address node;
        string description;
    }

    struct Signer {
        address signer;
        address[] whiteNodesVoted;
        string[] vote;
    }

    mapping(address => WhiteNode) whitenodes;
	/**
     * I WhiteNode sono i nodi che hanno richiesto di diventare dei Signers 
     */
    WhiteNode[] public whitelist;
    
    mapping(address => Signer) signers;
    /**
     * I signers sono gli attuali signer 
     */
    Signer[] public signersList;
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    modifier onlySigner {
        require(signers[msg.sender].signer == msg.sender || msg.sender == owner);
        _;
    }
    
    constructor() public {
        owner = msg.sender;
    }
    
    event newRequestAdded(address nodeAddress, string description);
    
    /** Questa funzione aggiunge un account alla lista degli account che stanno
     * richiedendo di diventare dei Signers, solo l'owner puo aggiungerli ( in questo caso
     * l'owner è chi deploya il contratto) 
     */
    /** 
     * @dev Add a node in pending
     * @param _address of node to add into whitelist
     */ 
    function addNode(address _address, string memory _description) public onlySigner {
        whitenodes[_address].node = _address;
        whitenodes[_address].description = _description;
        whitelist.push(whitenodes[_address]);
        emit newRequestAdded(_address, _description);
    }

    /** 
     * @dev Return whitelist's length
     */
    function getWhiteListLength() public view returns (uint){
        return whitelist.length;
    }
    
    /** 
     * @dev Return white node in position i
     */
    function getWhiteNode(uint i) public onlySigner view returns (address, string memory) {
        return (whitelist[i].node, whitelist[i].description);
    }
    


     /** //CREDO -> che si inserisca l'account nella lista dei nodi votati signer del signer attuale
     * @dev Add a signer into contract
     * @param _address of node to add into signers
     */ 
    function addSigner(address _address) public onlySigner {
        signers[_address].signer = _address;
        signersList.push(signers[_address]);
    }
    


    /** 
     * @dev Add the node that the signer voted
     * @param _address of node to add into vote list of signer
     * @param _vote description of the whitenode
     */ 
    function vote(address _address, string memory _vote) public onlySigner {
        signers[msg.sender].whiteNodesVoted.push(_address);
        signers[msg.sender].vote.push(_vote);
    }
    
    /** 
     * @dev Return a signer vote in index i
     */ 
    function getVotedNode(uint i) public onlySigner view returns (address, string memory) {
        return (signers[msg.sender].whiteNodesVoted[i], signers[msg.sender].vote[i]);
    }
    
    /** 
     * @dev Return length of signer's vote list
     */ 
    function getVotedListLength() public onlySigner view returns (uint) {
        return signers[msg.sender].whiteNodesVoted.length;
    }
    
    
}