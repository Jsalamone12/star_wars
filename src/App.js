import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Main from './views/Main';
import People from './views/People';
import NavBar from './components/NavBar';
import Planets from './views/Planets';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/people/:phrase" element={<People />} />
        <Route path="/people/" element={<People />} />
        <Route path="/planets/:phrase" element={<Planets />} />
        <Route path="/planets/" element={<Planets />} />
      </Routes>
    </div>
  );
}

export default App;
