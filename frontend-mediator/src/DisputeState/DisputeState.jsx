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
            this.state = {disputeState: this.state.disputeState, money: money}
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
                <h4>Dispute State: {this.state.disputeState}</h4><br></br>
                <h4>Money in Dispute: {this.state.money} wei</h4><br></br>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Amount to send to 0xB5eD99908327F698C3fDedF6e7cBa0D0a53DBE74:
                    <input type="text" value={this.state.firstParty} onChange={this.handleChangeFirst} />     
                    </label><br></br>
                    <label>
                    Amount to send to 0xc793654A8EA6b9e25264dA74bA6EDe87a3125950:
                    <input type="text" value={this.state.secondParty} onChange={this.handleChangeSecond} />     
                    </label>
                    <br></br>
                    <input type="submit" value="Submit"/>
                    </form>
            </div>
        )
    }
}

export default DisputeState;