import Header from "./components/header/Header";
import './Home.scss';
import SideBar from './components/sidebar/Sidebar';
import Chat from "./components/chat/chat";
import { useSelector } from "react-redux";

function Home() {
    const { selectedUser } = useSelector((state) => state.userReducer)
    return (<div className="home-page-wrapper" style={{ backgroundColor: 'rgb(252, 237, 233)' }}>
        <Header></Header>
        <section className="home-page-main-content-area-wrapper">
            <SideBar></SideBar>
            {
                selectedUser ?
                    <Chat></Chat> :
                    null
            }
        </section>
    </div>)
}

export default Home;