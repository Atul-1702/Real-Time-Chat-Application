import Loader from "./components/loader/Loader";
import { Routes, Route } from "react-router";
import Signup from "./pages/signup/Signup.tsx";
import Signin from "./pages/signin/Signin.tsx";
import { Toaster } from "react-hot-toast";
import ProtectHomeRoute from "./components/ProtectHomeRoute.tsx";
import ProtectAuthRoute from "./components/ProtectAuthRoute.tsx";
import Home from "./pages/home/Home.tsx";
import { useSelector } from "react-redux";
import { socketContext } from "./socketContext.tsx";
import { io, Socket } from "socket.io-client";

function App() {
  const socket: Socket = io("http://localhost:4000/");
  const isLoading: boolean = useSelector(
    (state: { loaderReducer: { loading: boolean } }) =>
      state?.loaderReducer.loading
  );
  return (
    <socketContext.Provider value={socket}>
      <Routes>
        <Route
          path=""
          element={
            <ProtectHomeRoute>
              <Home></Home>
            </ProtectHomeRoute>
          }
        ></Route>
        <Route
          path="signup"
          element={
            <ProtectAuthRoute>
              <Signup />
            </ProtectAuthRoute>
          }
        ></Route>
        <Route
          path="signin"
          element={
            <ProtectAuthRoute>
              <Signin></Signin>
            </ProtectAuthRoute>
          }
        ></Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      {isLoading && <Loader></Loader>}
    </socketContext.Provider>
  );
}

export default App;
