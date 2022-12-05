import { EthProvider } from "./contexts/EthContext";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header/Header";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App" className="bg-white">
        <Header />
        <div className="app-container">
          <Dashboard />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
