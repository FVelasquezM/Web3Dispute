import './App.css';
import DisputeList from './DisputeList/DisputeList';
import DisputeState from './DisputeState/DisputeState';

function App() {
  return (
    <div className="App">
    <h3>Evidence Sent by Party 0: </h3>
    <DisputeList partyNumber={0}></DisputeList>
    <h3>Evidence Sent by Party 1: </h3>
    <DisputeList partyNumber={1}></DisputeList>
    <DisputeState></DisputeState>
    </div>
  );
}

export default App;
