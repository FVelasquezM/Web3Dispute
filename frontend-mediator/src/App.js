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
    </Container>
    <h3>Evidence Sent by Party 0: </h3>
    <DisputeList partyNumber={0}></DisputeList>
    <h3>Evidence Sent by Party 1: </h3>
    <DisputeList partyNumber={1}></DisputeList>
    </div>
  );
}

export default App;
