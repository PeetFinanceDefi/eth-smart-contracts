var Web3 = require("web3");
var fs = require('fs') ;


async function increaseAllowance(amount, web3, swapContract, tx)
{
    const jsonToken = JSON.parse(fs.readFileSync("../build/contracts/PETToken.json"));
    const abi = jsonToken.abi;
    const petToken = new web3.eth.Contract(abi, "0xDf4b6c5b72FceCD0c675d83D00Ce9c31da507175");

    const allow = await petToken.methods.increaseAllowance(swapContract, amount).send(tx);
    console.log(allow)
    return true
}

async function transferTokenProcess(amount, web3, contract, petSwap, tx)
{
    decimalAmount = amount * (10 ** 18)
     // increase allowance for transaction
    await increaseAllowance("10000000000000000000000", web3, contract, tx)

    // transfer token funds from erc20 to swap contract
    const transfer = await petSwap.methods.transferToken(amount).send(tx)
    console.log(transfer)
}

async function main()
{
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

    const contract = "0x45B7DC520714fFF64a00C62818FE0148c33A3265"
    const jsonToken = JSON.parse(fs.readFileSync("../build/contracts/PETSwap.json"));
    const abi = jsonToken.abi;

    const petSwap = new web3.eth.Contract(abi, contract);
    const tx = {from: "0x862e71D87856fB83f393f342F853e40b3132F3ea"}
	

    transfer token to swap contract
    await transferTokenProcess(100, web3, contract, petSwap, tx)

    fetch token balance
     const balance = await petSwap.methods.fetchTokenBalance("0x15bEF3cDAa46efD6FF3ff46C528FaFba3fF08E9A").call()
     console.log(balance / (10 ** 18))


    await increaseAllowance("10000000000000000000000", web3, contract, tx)
    do token swap for nep-5
    const swapHash = await petSwap.methods.swapToken(1, "neo", "AP126McTRiRpRTDgKTdKku5rhursFbAt7A").send(tx);
    console.log(swapHash)

    const lastSwapID = await petSwap.methods.getLastSwapHash("neo").call(tx)
    console.log(lastSwapID)

    const amount = await petSwap.methods.getHashAmount("0x862e71D87856fB83f393f342F853e40b3132F3ea", "neo",
        "0xea6d83cc3e57191eb950e6581e5f0d96e803d978047f9c39707d5f6ca7f47f40").call()
    console.log(amount)

}

main()