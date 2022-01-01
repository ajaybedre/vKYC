import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/Login';

function App() {
  return (
    <div className="app">
      <header>vKYC Portal</header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <footer></footer>
    </div>
  );
}

export default App;
