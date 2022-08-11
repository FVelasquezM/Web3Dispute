import React from 'react';
import {getDisputeState, getDisputeMoney, solveDispute} from '../Web3Client/Web3Client';

class DisputeState extends React.Component {

    constructor(props) {
        super(props);
        this.state = {disputeState: 'Loading Dispute State...', money: "Loading Money..."}
        this.getCurrentDisputeState = this.getCurrentDisputeState.bind(this);
        this.getCurrentDisputeMoney = this.getCurrentDisputeMoney.bind(this);
        this.handleChangeFirst = this.handleChangeFirst.bind(this);
        this.handleChangeSecond = this.handleChangeSecond.bind(this);
    }
    
    componentWillMount(){
        this.getCurrentDisputeState();
        this.getCurrentDisputeMoney();
    }

    getCurrentDisputeMoney(){
        getDisputeMoney().then((money) => {            
            this.setState({disputeState: this.state.disputeState, money: money});
        })
    }
    
    getCurrentDisputeState(){
        getDisputeState().then((state) => {
            this.setState({disputeState: state, money: this.state.money});
        });
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.getCurrentDisputeState();
            this.getCurrentDisputeMoney();
        }, 10000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }  

    handleChangeFirst(event) {
        this.setState({firstParty: event.target.value});  
    }

    handleChangeSecond(event) {
        this.setState({secondParty: event.target.value});  
    }
      
    handleSubmit(event) {
        solveDispute(this.state.firstParty, this.state.secondParty)
        this.setState({disputeState: this.state.disputeState, money: this.state.money});
        event.preventDefault();
      }

    render(){
        return (
            <div>
                <h3>Dispute State: {this.state.disputeState}</h3><br></br>
                <h3>Money in Dispute: {this.state.money} wei</h3><br></br>
            </div>
        )
    }
}

export default DisputeState;