import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home.js';
import Musical from './pages/Musical/Musical.js';
import Favorite from './pages/Favorite/Favorite.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/musicals/:city" element={<Musical />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </Router>
  );
}

export default App;
