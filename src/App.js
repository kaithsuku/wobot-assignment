// App.js
import logo from './assets/logo.svg';
import './App.css';
import CameraTable from './components/CameraTable/CameraTable';

function App() {
  return (
    <section className="App">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <CameraTable />
      </div>
    </section>
  );
}

export default App;