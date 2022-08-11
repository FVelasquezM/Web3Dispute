import Web3 from 'web3'
const evidenceContract = require("../../../Contracts/build/contracts/Evidence.json");
const disputeContract = require("../../../Contracts/build/contracts/Dispute.json");

let selectedAccount;
let evContract;
let dContract;
let networkId;
let isInitialized = false;
let web3

export const init = async () => {

  const providerUrl  = 'http://localhost:7545';
  //let web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
  let provider = window.ethereum;
  if (typeof provider !== 'undefined') {

    //Metamask is installed
    let accounts = await provider.request({method: 'eth_requestAccounts' })
    selectedAccount = accounts[0];
    console.log(accounts);
    web3 = new Web3(provider);
    networkId = await web3.eth.net.getId();
    evContract = new web3.eth.Contract(evidenceContract.abi,evidenceContract.networks[networkId].address);
    dContract = new web3.eth.Contract(disputeContract.abi,disputeContract.networks[networkId].address);

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

export const sendTokenToContract = async (tokenId) => {
  if(!isInitialized){
    await init();
  }

  let response = await evContract.methods.safeTransferFrom(selectedAccount, disputeContract.networks[networkId].address, tokenId).send({from:selectedAccount});
  console.log("sendTokenToContract RESPONSE");
  console.log(response);
  return response;
}

export const getNumberOfElementsInDispute = async (party) => {
  if(!isInitialized){
    await init();
  }
  
  let numElements = await dContract.methods.getNumberOfElementsFromParty(party).call();

  console.log("getNumberOfElementsInDispute RESPONSE " + party);
  console.log(numElements);

  return numElements;

}

export const getEvidenceFrom = async (party, index) => {
  if(!isInitialized){
    await init();
  }

  let evidence = await dContract.methods.getEvidenceFrom(party, index).call();

  console.log("getEvidenceFrom RESPONSE");
  console.log(index);
  console.log(evidence);

  return evidence[1];
}

export const getDisputeState = async () => {
  if(!isInitialized){
    await init();
  }

  return await dContract.methods.getCurrentState().call();
}

export const getDisputeMoney = async () => {
  if(!isInitialized){
    await init();
  }
  
  return web3.eth.getBalance(disputeContract.networks[networkId].address);
}

export const solveDispute = async (_amountFirstParty, _amountSecondParty) => {
  if(!isInitialized){
    await init();
  }

  await dContract.methods.solveDispute(_amountFirstParty, _amountSecondParty).send({from:selectedAccount});
}