import React from 'react';
import {getDisputeState} from '../Web3Client/Web3Client';

class DisputeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {disputeState: 'Loading Dispute State...'}
    }
    
    componentWillMount(){
        this.getCurrentDisputeState();
    }
    
    getCurrentDisputeState(){
        getDisputeState().then((state) => {
            this.setState({disputeState: state});
        });
    }

    componentDidMount() {
        this.interval = setInterval(this.getCurrentDisputeState, 10000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }  


    render(){
        return (
            <div>
                <h4>Dispute State: {this.state.disputeState}</h4>
            </div>
        )
    }
}

export default DisputeList;