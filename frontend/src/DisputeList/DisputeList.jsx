import React from 'react';
import {getNumberOfElementsInDispute, getEvidenceFrom, getTokenUrl, getDisputeState} from '../Web3Client/Web3Client';
import ListElement from './ListElement';

class DisputeList extends React.Component {

    partyNumber = 0; 

    constructor(props) {
        super(props);
        this.state = {numberOfEvidences: 0, sentEvidence: [], disputeState: 'Loading Dispute State...'}
        this.getNumberOfEvidences = this.getNumberOfEvidences.bind(this);
        this.getEvidences = this.getEvidences.bind(this);
    }
    
    componentWillMount(){
        this.getNumberOfEvidences();
    }
    
    getEvidences(){
        let promises = []
        for(let i = 0; i < this.state.numberOfEvidences; i++){
            promises.push(getEvidenceFrom(this.partyNumber, i))
        }
        Promise.all(promises).then((evidencesIds) => {
            this.setState({numberOfEvidences: this.state.numberOfEvidences, sentEvidence: evidencesIds, disputeState: this.state.disputeState})
            console.log("evidences ids");
            console.log(this.state.sentEvidence);
        })
    }

    getCurrentDisputeState(){
        getDisputeState().then((state) => {
            this.setState({numberOfEvidences: this.state.numberOfEvidences, sentEvidence: this.state.sentEvidence, disputeState: state});
        });
    }

    getNumberOfEvidences(){
        getNumberOfElementsInDispute(this.partyNumber).then((number) => {
            this.setState({numberOfEvidences: number, sentEvidence: this.state.sentEvidence, disputeState: this.state.disputeState})
        });
        this.getEvidences();
        this.getCurrentDisputeState();
    }
    
    updateSentEvidenceList(){
        console.log("in list update");
        console.log(this.props.store.getState().mintedList);
        this.state.mintList = this.props.store.getState().mintedList;
        this.setState({mintList: this.props.store.getState().mintedList})
        console.log(this.state.mintList);
    }

    componentDidMount() {
        this.interval = setInterval(this.getNumberOfEvidences, 10000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }  


    render(){
        return (
            <div>
                <h3>Evidence Submitted by you: </h3>
                {this.state.sentEvidence.map((x, i) =>
                <ListElement key={i} loadFunction={getTokenUrl} args={[x]}></ListElement>
                )}
                <h4>Dispute State: {this.state.disputeState}</h4>

            </div>
        )
    }
}

export default DisputeList;