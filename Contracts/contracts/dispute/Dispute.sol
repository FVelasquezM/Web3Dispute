//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Dispute is Ownable, AccessControl, IERC721Receiver{ 

    bytes32 public constant PARTY_ROLE = keccak256("PARTY_ROLE");

    struct Evidence {
        address contractAddress;
        uint256 tokenId;
    }

    struct Party {
        address payable add;
        mapping(uint => Evidence) evidence;
        uint evidenceSize;
    }

    string state;

    //TODO, esto debería ser público?
    Party[] public parties;


    modifier assertTwoParties(){
        assert(parties.length == 2);
        _;
    }

    constructor(address _firstParty, address _secondParty){
        _setupRole(PARTY_ROLE, _firstParty);
        _setupRole(PARTY_ROLE, _secondParty);
        
        _createNewParty(_firstParty);
        _createNewParty(_secondParty);

        state = 'OPEN';
    }

    function _createNewParty(address _add) private{
        Party storage p = parties.push();
        p.add = payable(_add);
        p.evidenceSize = 0;
        p.evidence[0] = Evidence(0x0000000000000000000000000000000000000000, 1);
    }


    /*
    Recibir un token ERC721 de evidencia y agregarlo a índice de evidencia provista por el party que lo llamó.
    */
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) public returns(bytes4) {

        //TODO Sólo debe permitir recibir el token si fue minteado por el mismo address que lo envía.
        require(hasRole(PARTY_ROLE, from), "Caller is not a party involved in the dispute");
        
        Party storage party;
        if(from == parties[0].add){
            party = parties[0];
            require(hasRole(PARTY_ROLE, from), "Party 0");
        } else if(from == parties[1].add){
            party = parties[1];
            require(hasRole(PARTY_ROLE, from), "Party 1");
        } else {
            require(false, "Expected 'from' to be the address of the first or second party");
            return bytes4(0x0);
        }
        
        party.evidence[party.evidenceSize] = Evidence(operator, tokenId);
        party.evidenceSize++;

        return this.onERC721Received.selector;
    }

    function getCurrentState() public view returns(string memory){
        return state;
    }

    function getNumberOfElementsFromParty(uint party) public view returns(uint) {
        return parties[party].evidenceSize;
    }

    function getEvidenceFrom(uint party, uint evidenceIndex) public view returns(Evidence memory){
        return parties[party].evidence[evidenceIndex];
    }

    function solveDispute(uint64 _amountFirstParty, uint64 _amountSecondParty) public onlyOwner {

        //TODO, sólo se debería resovler la disputa si las dos partes han puesto dinero en el contrato.

        disperseMoney(_amountFirstParty, _amountSecondParty);

        state = 'CLOSED';

    }

    function disperseMoney(uint64 _amountFirstParty, uint64 _amountSecondParty) private onlyOwner {
        //1. Debe recibir addresses y cantidad de dinero a enviar a cada address.
        
        //2. Debe verificar si balance que tiene es suficiente para realizar los pagos.

        //TODO, qué pasa si amountFirstParty + amountSecondParty > max uint64?
        require(address(this).balance >= _amountFirstParty + _amountSecondParty, "Insufficient balance to perform the operation");

        //3. Debe realizar los pagos.
        parties[0].add.transfer(_amountFirstParty);
        parties[1].add.transfer(_amountSecondParty);
    }

    // @notice Will receive any eth sent to the contract
    receive () external payable {
        
    }


}