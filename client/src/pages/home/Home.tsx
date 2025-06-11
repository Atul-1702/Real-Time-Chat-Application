import Header from "./components/header/Header";
import "./Home.scss";
import SideBar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/chat";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { useEffect } from "react";
import { useSocket } from "../../socketContext";

function Home() {
  const socket: Socket = useSocket();
  const { selectedUser, user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    socket.emit("join-room", { userId: user._id });
    // return (() => {
    //     socket.disconnect();
    // })
  }, []);
  return (
    <div
      className="home-page-wrapper"
      style={{ backgroundColor: "rgb(252, 237, 233)" }}
    >
      <Header></Header>
      <section className="home-page-main-content-area-wrapper">
        <SideBar></SideBar>
        {selectedUser ? <Chat></Chat> : null}
      </section>
    </div>
  );
}

export default Home;
