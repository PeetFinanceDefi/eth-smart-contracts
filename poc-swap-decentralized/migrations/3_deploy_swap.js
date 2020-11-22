var petSwap = artifacts.require("./petSwap.sol");

module.exports = function(deployer) {
   deployer.deploy(petSwap, "0x03a2c6731A70611ffC486207129DD3f8DECb0a65", "0xDf4b6c5b72FceCD0c675d83D00Ce9c31da507175");
};