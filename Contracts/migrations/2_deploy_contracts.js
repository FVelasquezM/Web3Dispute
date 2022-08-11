const Evidence = artifacts.require("Evidence");
const Dispute = artifacts.require("Dispute");

let mainAcc = "0x5011689E78B58602d32294dB8aC840180389a079";
let party2 = "0x4B50b1F33A7798FC8CaEc75A0212dc37BC183b33"; // (await web3.eth.getAccounts())[1]

module.exports = async function (deployer) {
  deployer.deploy(Evidence);
  deployer.deploy(Dispute, "0x64Cef2cDe8C9ecF9F47cC9ECF5E2387C78CCb4C0", party2);

  //Create Evidence token.
  // let evidence = await Evidence.deployed();
  // let tokenId = (await evidence.createEvidence(party2, "https://previews.123rf.com/images/arcady31/arcady311108/arcady31110800017/10101139-sample-stamp.jpg"))
  // console.log(tokenId);
  // tokenId = tokenId.logs[0].args.tokenId.toNumber();
  // console.log(tokenId)


  // let dispute = await Dispute.deployed();
  // let response = await evidence.safeTransferFrom(party2, dispute.address, tokenId, {from: (await web3.eth.getAccounts())[8]});
  // console.log("SF RESPONSE");
  // console.log(response);
  // console.log(await evidence.ownerOf(tokenId) == dispute.address);

  // console.log(await dispute.getEvidenceFrom(1,0));
  // console.log((await dispute.getNumberOfElementsFromParty(1)).toString());
  // console.log((await dispute.getNumberOfElementsFromParty(0)).toString());

};
