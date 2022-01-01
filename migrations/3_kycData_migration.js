var KycData = artifacts.require("./KycData.sol");

module.exports = function(deployer) {
  deployer.deploy(KycData);
};
