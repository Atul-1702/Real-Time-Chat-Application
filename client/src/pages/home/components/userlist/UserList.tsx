import { useEffect, useState } from 'react';
import './UserList.scss';
import { getAllUserDetails } from '../../../../apiCalls/user.api';
import toast from 'react-hot-toast';
import User from './../../../../models/user.model';
import { getUserAllChats } from '../../../../apiCalls/chats.api';

interface Props {
    searchedUser: string;
}
function UserList({ searchedUser }: Props) {
    const [allSearchedUser, setAllSearchedUser] = useState<User[]>([]);
    useEffect(() => {
        (async function () {
            const response = await getAllUserDetails();
            if (response.success === true) {
                const responseChats = await getUserAllChats();
                setAllSearchedUser((response.data as User[]).filter((user: User) => {
                    if (searchedUser && ((user.firstname.toLowerCase().includes(searchedUser.toLowerCase())) === true || user.lastname?.toLowerCase().includes(searchedUser.toLowerCase()))) {
                        return true;
                    }
                    if (!searchedUser) {
                        responseChats.some((item) => {
                            item?.members?.includes(user._id);
                        })
                    }
                    return false;
                }))
            }
            else {
                toast.error("We are facing some issue.\nTry after some time.");
            }
        })();


    }, [searchedUser]);



    return (
        <ul className="user-list-container">

            {
                allSearchedUser.map((user: User) => (
                    <li key={user._id} className='user-list-item'>
                        {!user.profilepic ? <span className='name-intials'>{user.firstname.charAt(0).toUpperCase() + user.lastname?.charAt(0).toUpperCase()}</span> : null}
                        <div className='user-name-and-email'>
                            <span>{user.firstname + " " + user.lastname}</span>
                            <span>{user.email}</span>
                        </div>
                        {
                            <button>Start Chat</button>
                        }

                    </li>
                )
                )}

        </ul>
    )
}

export default UserList;