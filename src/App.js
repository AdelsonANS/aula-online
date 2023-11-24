import {Routes, Route,  BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login'
import Home from './components/home/index'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
