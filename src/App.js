import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import EditorPages from './pages/EditorPages';
import HostState from './context/HostState';
import Login from './component/Login';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <>
      <HostState>
        <Router>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/editor/:roomId' element={<EditorPages />}></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
          </Routes>
        </Router>
      </HostState>
    </>
  );
}

export default App;
