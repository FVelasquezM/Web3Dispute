import React from 'react';
import {createEvidence} from '../Web3Client/Web3Client'


class MintForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});  
    }
    handleSubmit(event) {
      console.log("IN HANDLE SUBMIT");
      console.log(this.state.value);
      createEvidence(this.state.value).then(tx => {
        console.log("MINTED:")
        console.log(tx);
        this.props.updateMintedList(tx); 
        this.setState({value: ''});
      }).catch(err => {
        console.log("ERROR MINTING"); 
        console.log(err);
      });
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            EvidenceUrl:
            <input type="text" value={this.state.value} onChange={this.handleChange} />        
          </label>
          <input type="submit" value="Submit"/>
        </form>
      );
    }
  }

export default MintForm;