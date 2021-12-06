const AndromedaElections = artifacts.require("./AndromedaElections.sol");

module.exports = function(deployer) {
	deployer.deploy(AndromedaElections);
};
