import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './pokemon.css';
import Pokemon from './Pokemon.jsx';
import Create from './Create.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pokemon />}/>
        <Route path="/create" element={<Create />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
