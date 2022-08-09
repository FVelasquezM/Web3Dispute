const Evidence = artifacts.require("Evidence");
const Dispute = artifacts.require("Dispute");

let mainAcc = "0x5011689E78B58602d32294dB8aC840180389a079";

module.exports = async function (deployer) {
  deployer.deploy(Evidence);
  deployer.deploy(Dispute, mainAcc, "0xc793654A8EA6b9e25264dA74bA6EDe87a3125950");

  //Create Evidence token.
  let evidence = await Evidence.deployed();
  let tokenId = (await evidence.createEvidence(mainAcc, "https://previews.123rf.com/images/arcady31/arcady311108/arcady31110800017/10101139-sample-stamp.jpg")).logs[0].args.tokenId.toNumber();
  //console.log(tokenId);


  let dispute = await Dispute.deployed();
  await evidence.safeTransferFrom(mainAcc, dispute.address, tokenId);

  console.log(await evidence.ownerOf(tokenId) == dispute.address);

  console.log(await dispute.getEvidenceFrom(0,0));
};
