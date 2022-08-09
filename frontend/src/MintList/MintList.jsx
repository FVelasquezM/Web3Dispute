import React from 'react';
import {getTokenUrl} from '../Web3Client/Web3Client';
import ListElement from './ListElement';

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

    sendToDispute(){
        console.log("TODO");
    }


    render(){
        return (
            <div>
                <h3>Evidence Minted: </h3>
                {this.state.mintList.map((x, i) =>
                <ListElement key={i} loadFunction={getTokenUrl} args={[x]}></ListElement>
            )}
            <form onSubmit={this.sendToDispute}>
                <input type="submit" value="Send All Evidence to Dispute"/>
            </form>
            </div>
        )
    }
}

export default MintList;