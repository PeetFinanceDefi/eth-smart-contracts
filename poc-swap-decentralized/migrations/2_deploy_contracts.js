var pet = artifacts.require("./petToken.sol");

module.exports = function(deployer) {
   deployer.deploy(pet, "PeetDecentralizedFinance", "PET", 100000, "0x862e71D87856fB83f393f342F853e40b3132F3ea");
};