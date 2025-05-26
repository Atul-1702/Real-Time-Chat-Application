import { useEffect, useState } from 'react';
import './UserList.scss';
import { getAllUserDetails } from '../../../../apiCalls/user.api';
import toast from 'react-hot-toast';
import User from './../../../../models/user.model';
import { createNewChat, getUserAllChats } from '../../../../apiCalls/chats.api';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser, setUserAllChats } from '../../../../redux/userSlice';

interface Props {
    searchedUser: string;
    setSearchedUser: React.Dispatch<React.SetStateAction<string>>;
}
function UserList({ searchedUser, setSearchedUser }: Props) {
    const [allSearchedUser, setAllSearchedUser] = useState<User[]>([]);
    const { user, selectedUser } = useSelector((state) => state?.userReducer);
    const [userAllChats, setUserAllChatsComp] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        (async function () {
            const response = await getAllUserDetails();
            if (response.success === true) {
                const responseChats = await getUserAllChats();
                setUserAllChatsComp(responseChats.data);
                dispatch(setUserAllChats(responseChats.data));
                setAllSearchedUser((response.data as User[]).filter((user: User) => {
                    if (searchedUser && ((user.firstname.toLowerCase().includes(searchedUser.toLowerCase())) === true || user.lastname?.toLowerCase().includes(searchedUser.toLowerCase()))) {
                        return true;
                    }
                    if (!searchedUser) {
                        return responseChats?.data.some((item) => {
                            return item?.members?.map((m) => m._id).includes(user._id);
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


    async function onStartChatButtonClicked(member: unknown) {
        const response = await createNewChat([member, user._id]);

        if (response.success === true) {
            setSearchedUser('');
            console.log(response);
            toast.success("Chat started successfully");
        }
        else {
            toast.error("Something went wrong");
        }
    }

    function onToggleChatArea(userId: string) {
        dispatch(setSelectedUser(userId));
    }

    return (
        <ul className="user-list-container">

            {
                allSearchedUser.map((user: User) => (
                    <li key={user._id} className={selectedUser === user._id ? 'selected-item' : 'user-list-item'} onClick={() => onToggleChatArea(user._id)}>
                        {!user.profilepic ? <span className='name-intials'>{user.firstname.charAt(0).toUpperCase() + user.lastname?.charAt(0).toUpperCase()}</span> : null}
                        <div className='user-name-and-email'>
                            <span>{user.firstname + " " + user.lastname}</span>
                            <span>{user.email}</span>
                        </div>
                        {
                            userAllChats.some((item) => item?.members.map((m) => m._id).includes(user._id)) ?
                                null : <button onClick={() => onStartChatButtonClicked(user._id)}>Start Chat</button>
                        }

                    </li>
                )
                )}

        </ul>
    )
}

export default UserList;