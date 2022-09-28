const {ethers} = require("ethers");
const {addresses , contracts} = require("../package/index")

module.exports = async function owner(userAddress) {
    //https://eth-goerli.alchemyapi.io/v2/GKcZh-E7o6PB3gEz0M9fUHPwG4_xHbbj

    let abi = contracts.token;
    userAddress = ethers.utils.getAddress(userAddress)
    const node = "https://eth-goerli.alchemyapi.io/v2/GKcZh-E7o6PB3gEz0M9fUHPwG4_xHbbj";
    const provider =new ethers.providers.JsonRpcProvider(node);

    
    let contractaddress = addresses[4].token;
    console.log(contractaddress)
    contractaddress = ethers.utils.getAddress(addresses[4].token);
    console.log(contractaddress)
    
    let contract = new ethers.Contract(contractaddress, abi, provider);
    let tx = await contract.balanceOf(userAddress)
    console.log(tx)
    return await tx.toString()
}

