const {ethers} = require("ethers");
const {trapDart_addr}  = require("../package/addresses")
const TrapDart  = require("../package/TrapDart.json")

module.exports = async function balance(userAddress) {
    

    let abi = TrapDart;
    userAddress = ethers.utils.getAddress(userAddress)
    const node = "https://rinkeby.infura.io/v3/fac3159c48024d38ab778a0bbceace2b";
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

