import Header from "./components/header/Header";
import './Home.scss';
import SideBar from './components/sidebar/Sidebar';

function Home() {
    return (<div className="home-page-wrapper" style={{ backgroundColor: 'rgb(252, 237, 233)' }}>
        <Header></Header>
        <SideBar></SideBar>
    </div>)
}

export default Home;