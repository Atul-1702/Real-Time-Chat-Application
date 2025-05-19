import Loader from "./components/loader/Loader";
import { Routes, Route } from 'react-router';
import Signup from './pages/signup/Signup.tsx';
import Signin from './pages/signin/Signin.tsx';
import { Toaster } from 'react-hot-toast';
import ProtectHomeRoute from './components/ProtectHomeRoute.tsx';
import ProtectAuthRoute from './components/ProtectAuthRoute.tsx';
import Home from "./pages/home/Home.tsx";
import { useSelector } from "react-redux";

function App() {

  const isLoading: boolean = useSelector((state: { loaderReducer: { loading: boolean } }) => state?.loaderReducer.loading);
  return (
    <>
      <Routes>
        <Route path='' element={<ProtectHomeRoute><Home></Home></ProtectHomeRoute>}></Route>
        <Route path='signup' element={<ProtectAuthRoute><Signup /></ProtectAuthRoute>}></Route>
        <Route path='signin' element={<ProtectAuthRoute><Signin></Signin></ProtectAuthRoute>}></Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      {isLoading && <Loader></Loader>}
    </>
  )
}

export default App;
