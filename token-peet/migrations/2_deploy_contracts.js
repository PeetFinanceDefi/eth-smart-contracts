var bookDexToken = artifacts.require("./token.sol");
module.exports = function(deployer) {
   deployer.deploy(, "Peet", "PTE", 100000, "0x4Aaa4f920b9cd7A171E665846B0F35bEA777D3B1");
};