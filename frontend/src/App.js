import React, {useEffect, useState} from 'react';
import MintForm from './MintForm/MintForm';
import MintList from './MintList/MintList';
import DisputeList from './DisputeList/DisputeList';
import DisputeState from './DisputeState/DisputeState';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { createStore } from 'redux';


function App() {

  const updateTokens = (state = { mintedList: []}, newToken)  => {
    console.log("MintedList");
    if(newToken.id !== undefined){
      state.mintedList.push(newToken.id)
    }
    console.log(state.mintedList);
    return {mintedList: state.mintedList}
  };
  let store = createStore(updateTokens);


  const updateList = (newTokenId) => {
    console.log("Dispatched id");
    console.log(newTokenId);
    store.dispatch({id: newTokenId, type: "new-token"});
  }



  return (
    <div className='App'>
      <Container fluid="md">
        <Row>
          <Col md ={4}></Col>
          <Col md ={4}>
            <DisputeState></DisputeState>
          </Col>
          <Col md ={4} ></Col>
        </Row>
        <Row>
          <Col md={6}>
            <div style={{padding: 20}}>
            <MintForm updateMintedList={updateList} ></MintForm>
            </div>
          </Col>
          <Col md={6}>
            <MintList store = {store}></MintList>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <DisputeList></DisputeList>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;