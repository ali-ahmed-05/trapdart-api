const {ethers} = require("ethers");
const {trapDart_addr}  = require("../package/addresses")
const TrapDart  = require("../package/TrapDart.json")

module.exports = async function balance(userAddress) {
    

    let abi = TrapDart;
    userAddress = ethers.utils.getAddress(userAddress)
    const node = "https://eth-goerli.alchemyapi.io/v2/GKcZh-E7o6PB3gEz0M9fUHPwG4_xHbbj";
    //const node = "http://127.0.0.1:8545/";

    const provider =new ethers.providers.JsonRpcProvider(node);

    
    let contractaddress = trapDart_addr;
    
    console.log(contractaddress)
    // contractaddress = ethers.utils.getAddress(contractaddress);
    // console.log(contractaddress)
    
    let contract = new ethers.Contract(contractaddress, abi, provider);
    let tx = await contract.balanceOf(userAddress)
    console.log(tx)
    return await tx.toString()
}

