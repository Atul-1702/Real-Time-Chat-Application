import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router';
import Signup from './pages/signup/Signup.tsx';
import Signin from './pages/signin/Signin.tsx';
import { Toaster } from 'react-hot-toast';
import ProtectHomeRoute from './components/ProtectHomeRoute.tsx';
import ProtectAuthRoute from './components/ProtectAuthRoute.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <Routes>
          <Route path='' element={<ProtectHomeRoute><App /></ProtectHomeRoute>}></Route>
          <Route path='signup' element={<ProtectAuthRoute><Signup /></ProtectAuthRoute>}></Route>
          <Route path='signin' element={<ProtectAuthRoute><Signin></Signin></ProtectAuthRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
