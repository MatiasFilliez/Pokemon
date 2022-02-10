import './App.css';
import Home from './pages/home';
import { Routes, Route } from 'react-router'
import Landing from './pages/landing';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Landing />} />
      <Route exact path='/home' element={<Home />} />
    </Routes>
  );
}

export default App;
