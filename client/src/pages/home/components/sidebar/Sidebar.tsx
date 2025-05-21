
import { useState } from 'react';
import SearchUser from './../search/Search';
import UserList from './../userlist/UserList';
import './Sidebar.scss';

function SideBar() {
    const [searchedUser, setSearchedUser] = useState('');
    return (<aside className='sidebar-container'>
        <SearchUser setSearchedUser={setSearchedUser}></SearchUser>
        <UserList searchedUser={searchedUser}></UserList>
    </aside>)
}

export default SideBar;