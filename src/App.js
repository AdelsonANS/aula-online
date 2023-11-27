import {Routes, Route,  BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login'
import Home from './components/home/index'
import ConfigVideo from './components/configVideo/index'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/configvideo" element={<ConfigVideo />} />
        
      </Routes>
    </Router>
  );
}

export default App;
