import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WebPage from './pages/WebPage';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/*' element={<WebPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
