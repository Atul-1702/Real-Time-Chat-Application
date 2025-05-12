import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router';
import Signup from './pages/signup/Signup.tsx';
import Signin from './pages/signin/Signin.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<App />}></Route>
        <Route path='signup' element={<Signup />}></Route>
        <Route path='signin' element={<Signin></Signin>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
