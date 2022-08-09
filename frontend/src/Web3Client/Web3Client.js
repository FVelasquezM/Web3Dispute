import Web3 from 'web3'
const evidenceContract = require("../../../Contracts/build/contracts/Evidence.json");


let selectedAccount;
let evContract;
let isInitialized = false;

export const init = async () => {

  const providerUrl  = 'http://localhost:7545';
  //let web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
  let provider = window.ethereum;
  if (typeof provider !== 'undefined') {

    //Metamask is installed
    let accounts = await provider.request({method: 'eth_requestAccounts' })
    selectedAccount = accounts[0];
    console.log(accounts);
    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    evContract = new web3.eth.Contract(evidenceContract.abi,evidenceContract.networks[networkId].address);

    console.log("CONTRACT");
    console.log(evContract);

    isInitialized = true;

  }
  
};

//Returns the created TokenId.
export const createEvidence = async (imageUrl) => {

    if(!isInitialized){
        await init()
    }
    let response = await evContract.methods.createEvidence(selectedAccount, imageUrl).send({from:selectedAccount});
    console.log("CONTRACT RESPONSE");
    console.log(response);

    return response.events.Transfer.returnValues.tokenId;
}

export const getTokenUrl = async (tokenId) => {
  if(!isInitialized){
    await init();
  }
  console.log("tokenId");
  console.log(tokenId);

  console.log(evContract);
  let response = await evContract.methods.tokenURI(tokenId).call();
  console.log("getTokenUrl RESPONSE");
  console.log(response);
  
  return response;
}

