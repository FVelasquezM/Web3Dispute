import './App.css';
import DisputeList from './DisputeList/DisputeList';
import DisputeState from './DisputeState/DisputeState';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div className="App">
    <Container fluid="md">
      <Row>
        <Col></Col>
        <Col><DisputeState></DisputeState></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col md={6}>
          <h4>Evidence Sent by Party 0xB5eD99908327F698C3fDedF6e7cBa0D0a53DBE74: </h4>
          <DisputeList partyNumber={0}></DisputeList>
        </Col>
        <Col md={6}>
          <h4>Evidence Sent by Party 0xc793654A8EA6b9e25264dA74bA6EDe87a3125950: </h4>
          <DisputeList partyNumber={1}></DisputeList>
        </Col>
      </Row>
    </Container>
    
    </div>
  );
}

export default App;
