pragma solidity >=0.4.22;
pragma experimental ABIEncoderV2;

contract AndromedaElections{
    
    event VoteEvent(address indexed votingAccountIndexer, uint32 indexed myDateIndexer, address votedAccount, string myVote);
    
    /**
     * Per ogni account ho una struttura contenente due array "collegati" tra loro
     * per lo stesso indice i, ho l'account votato e il voto effettuato da msg.sender
     */
    function voteCommitted(address votedAccount, string memory myVote, uint32 myDate) public{
        emit VoteEvent(msg.sender, myDate, votedAccount, myVote);
    }

    
}