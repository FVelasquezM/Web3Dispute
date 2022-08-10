import React from 'react';
import {getNumberOfElementsInDispute, getEvidenceFrom, getTokenUrl} from '../Web3Client/Web3Client';
import ListElement from './ListElement';

class DisputeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {numberOfEvidences: 0, sentEvidence: []}
        this.getNumberOfEvidences = this.getNumberOfEvidences.bind(this);
        this.getEvidences = this.getEvidences.bind(this);
    }
    
    componentWillMount(){
        this.getNumberOfEvidences();
    }
    
    getEvidences(){
        let promises = []
        for(let i = 0; i < this.state.numberOfEvidences; i++){
            promises.push(getEvidenceFrom(this.props.partyNumber, i))
        }
        Promise.all(promises).then((evidencesIds) => {
            this.setState({numberOfEvidences: this.state.numberOfEvidences, sentEvidence: evidencesIds})
            console.log("evidences ids");
            console.log(this.state.sentEvidence);
        })
    }


    getNumberOfEvidences(){
        getNumberOfElementsInDispute(this.props.partyNumber).then((number) => {
            this.setState({numberOfEvidences: number, sentEvidence: this.state.sentEvidence})
        });
        this.getEvidences();
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
                {this.state.sentEvidence.map((x, i) =>
                <ListElement key={i} loadFunction={getTokenUrl} args={[x]}></ListElement>
                )}
            </div>
        )
    }
}

export default DisputeList;