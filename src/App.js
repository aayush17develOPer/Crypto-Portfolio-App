import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './compos/Navbar/Navbar';
import LandingPage from './compos/LandingPage/LandingPage';
import OneCoin from './compos/OneCoin';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/coins/:id" element={<OneCoin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
