import React, {useEffect, useState} from 'react';
import MintForm from './MintForm/MintForm';
import MintList from './MintList/MintList';
import DisputeList from './DisputeList/DisputeList';

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
      <MintForm updateMintedList={updateList}></MintForm>
      <MintList store = {store}></MintList>
      <DisputeList></DisputeList>
    </div>
  );
}

export default App;