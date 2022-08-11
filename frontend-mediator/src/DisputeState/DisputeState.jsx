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
            console.log(money);
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