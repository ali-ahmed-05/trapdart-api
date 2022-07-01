const {ethers} = require("ethers");
const {addresses , contracts} = require("../package/index")

module.exports = async function owner(userAddress) {
    

    let abi = contracts.token;
    userAddress = ethers.utils.getAddress(userAddress)
    const node = "https://rinkeby.infura.io/v3/fac3159c48024d38ab778a0bbceace2b";
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

