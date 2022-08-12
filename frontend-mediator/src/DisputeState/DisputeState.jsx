import React from 'react';
import {getDisputeState, getDisputeMoney, solveDispute} from '../Web3Client/Web3Client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';



class DisputeState extends React.Component {

    constructor(props) {
        super(props);
        this.state = {disputeState: 'Loading Dispute State...', money: "Loading Money...", firstParty: 0, secondParty: 0}
        this.getCurrentDisputeState = this.getCurrentDisputeState.bind(this);
        this.getCurrentDisputeMoney = this.getCurrentDisputeMoney.bind(this);
        this.handleChangeFirst = this.handleChangeFirst.bind(this);
        this.handleChangeSecond = this.handleChangeSecond.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentWillMount(){
        this.getCurrentDisputeState();
        this.getCurrentDisputeMoney();
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.getCurrentDisputeState();
            this.getCurrentDisputeMoney();
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    } 

    getCurrentDisputeMoney(){
        getDisputeMoney().then((money) => {
            this.setState({disputeState: this.state.disputeState, money: money, secondParty: this.state.secondParty, firstParty: this.state.firstParty,})
        })
    }
    
    getCurrentDisputeState(){
        getDisputeState().then((state) => {
            this.setState({disputeState: state, money: this.state.money, secondParty: this.state.secondParty, firstParty: this.state.firstParty,});
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
        console.log(event);
        this.setState({firstParty: event.target.value, secondParty: this.state.secondParty, disputeState: this.state.disputeState, money: this.state.money});  
    }

    handleChangeSecond(event) {
        console.log(event.value);
        this.setState({firstParty: this.state.firstParty, secondParty: event.target.value, disputeState: this.state.disputeState, money: this.state.money});  
    }
      
    handleSubmit(event) {
        event.preventDefault();
        console.log("On submit");
        console.log(this.state.firstParty);
        console.log(this.state.secondParty);
        solveDispute(this.state.firstParty, this.state.secondParty).then((response) => {
            console.log("Solved dispute, response: ");
            console.log(response);
            this.setState({disputeState: this.state.disputeState, money: this.state.money});
        })
      }

    render(){
        return (
            <div>
                <Container fluid="md">
                <Row>
                    <h4>Dispute State: {this.state.disputeState}</h4>
                </Row>
                <Row>
                <h4>Money in Dispute: {this.state.money} wei</h4>
                </Row>
                <Row>
                <Col md={4}></Col>
                <Col md={4}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Amount to send to 0xB5eD99908327F698C3fDedF6e7cBa0D0a53DBE74:</Form.Label>
                            <Form.Control placeholder="Enter an amount in Wei" onChange={this.handleChangeFirst} value={this.state.firstParty}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Amount to send to 0xc793654A8EA6b9e25264dA74bA6EDe87a3125950:</Form.Label>
                            <Form.Control placeholder="Enter an amount in Wei" onChange={this.handleChangeSecond} value={this.state.secondParty}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Disperse Money
                        </Button>
                    </Form>
                </Col>
                <Col md={4}></Col>
                </Row>
                </Container>
            </div>
        )
    }
}

export default DisputeState;