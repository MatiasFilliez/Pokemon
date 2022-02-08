import './App.css';
import Home from './pages/home';
import { Routes, Route } from 'react-router'

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
    </Routes>
  );
}

export default App;
