import React from 'react';
import {createEvidence} from '../Web3Client/Web3Client'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class MintForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});  
    }
    handleSubmit(event) {
      console.log("IN HANDLE SUBMIT");
      console.log(this.state.value);
      createEvidence(this.state.value).then(tx => {
        console.log("MINTED:")
        console.log(tx);
        this.props.updateMintedList(tx); 
        this.setState({value: ''});
      }).catch(err => {
        console.log("ERROR MINTING"); 
        console.log(err);
      });
      event.preventDefault();
    }
  
    render() {
      return (
        <Container fluid="md">
          <Row>
            <h3>Mint New Evidence: </h3>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>EvidenceUrl:</Form.Label>
                <Form.Control placeholder="Enter a url" onChange={this.handleChange} value={this.state.value}/>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                Mint Evidence
              </Button>
              </Form>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      );
    }
  }

export default MintForm;