import React from 'react';
import {getTokenUrl, sendTokenToContract} from '../Web3Client/Web3Client';
import ListElement from './ListElement';
import Button from 'react-bootstrap/Button';


class MintList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {mintList: []}
        this.updateMintList = this.updateMintList.bind(this);
        this.sendToDispute = this.sendToDispute.bind(this);
    }

    componentWillMount(){
        this.props.store.subscribe(this.updateMintList);
    }

    updateMintList(){
        console.log("in list update");
        console.log(this.props.store.getState().mintedList);
        this.state.mintList = this.props.store.getState().mintedList;
        this.setState({mintList: this.props.store.getState().mintedList})
        console.log(this.state.mintList);
    }

    sendToDispute(event){
        let promises = [];
        for(let elem of this.state.mintList){
            promises.push(sendTokenToContract(elem))
        }
        Promise.all(promises).then( (res) => {
            console.log("Done sending to contract");
            console.log(res);
            this.setState({mintList: []});
        });
        event.preventDefault();
    }


    render(){
        return (
            <div>
                <h3>Evidence Minted: </h3>
                {this.state.mintList.map((x, i) =>
                <ListElement key={i} loadFunction={getTokenUrl} args={[x]}></ListElement>
            )}
            <Button variant="primary" type="submit" onClick={this.sendToDispute}>
                Send Minted Evidence to Dispute
            </Button>
            </div>
        )
    }
}

export default MintList;