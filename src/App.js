import {Routes, Route,  BrowserRouter as Router } from 'react-router-dom';
import Login from './components/login/Login'
import ConfigVideo from './components/configVideo/index'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/configvideo" element={<ConfigVideo />} />
        
      </Routes>
    </Router>
  );
}

export default App;
