import { useEffect, useMemo, useState } from 'react';
import './UserList.scss';
import { getAllUserDetails } from '../../../../apiCalls/user.api';
import toast from 'react-hot-toast';
import User from './../../../../models/user.model';
import { createNewChat, getUserAllChats } from '../../../../apiCalls/chats.api';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser, setUserAllChats } from '../../../../redux/userSlice';
import { readAllUnreadMessage } from '../../../../apiCalls/message.api';
import moment from 'moment';

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


                if (searchedUser) {

                    setAllSearchedUser((response.data as User[]).filter((user: User) => {
                        if (((user.firstname.toLowerCase().includes(searchedUser.toLowerCase())) === true || user.lastname?.toLowerCase().includes(searchedUser.toLowerCase()))) {
                            return true;
                        }
                        return false;
                    }))
                }
                else {
                    const temp = [];
                    for (const mem of responseChats.data) {
                        if (mem.members[0]._id !== user._id) {
                            temp.push(mem.members[0]);
                        }
                        else {
                            temp.push(mem.members[1]);
                        }
                    }
                    setAllSearchedUser([...temp]);
                }
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
            toast.success("Chat started successfully");
        }
        else {
            toast.error("Something went wrong");
        }
    }

    async function onToggleChatArea(userId: string) {
        dispatch(setSelectedUser(userId));


        for (const item of userAllChats) {

            if (item?.lastMessage?.sender != user._id && (item?.members[0]?._id == userId || item?.members[1]?._id == userId)) {

                const response = await readAllUnreadMessage(item._id);

                if (response.success == true) {
                    toast.success("Message read successfully.")
                }
                else {
                    toast.error("Something went wrong.");
                }
            }
        }

    }

    function getLastMessage(userId) {

        for (let item of userAllChats) {

            if (item.members[0]._id === userId || item.members[1]._id === userId) {
                return item?.lastMessage?.text;
            }
        }
        return '';
    }
    function UnReadMessageCount({ userId }) {

        for (let item of userAllChats) {
            if (item?.lastMessage?.sender != user._id && item?.unreadMessageCount > 0 && (item.members[0]._id === userId || item.members[1]._id === userId)) {
                console.log("UnreadMessage");
                return <span>{item?.unreadMessageCount}</span>
            }
        }
        return '';
    }
    function getTimeDate(userId) {
        for (const item of userAllChats) {
            if ((item.members[0]._id === userId || item.members[1]._id === userId)) {

                return moment(item?.lastMessage?.updatedAt).format('hh:mm A');
            }
        }
    }

    return (
        <ul className="user-list-container">

            {
                allSearchedUser.map((user: User) => (
                    <li key={user._id} className={selectedUser === user._id ? 'selected-item' : 'user-list-item'} onClick={() => onToggleChatArea(user._id)}>
                        {!user.profilepic ? <span className='name-intials'>{user.firstname.charAt(0).toUpperCase() + user?.lastname?.charAt(0).toUpperCase()}</span> : null}
                        <div className='user-name-and-email'>
                            <span>{user.firstname + " " + user.lastname}</span>
                            <span>{getLastMessage(user._id)}</span>
                        </div>
                        {
                            userAllChats.some((item) => item?.members.map((m) => m._id).includes(user._id)) ?
                                <div className='last-message-time-and-unread-message'>
                                    <UnReadMessageCount userId={user._id}></UnReadMessageCount>
                                    <time dateTime="">{getTimeDate(user._id)}</time>
                                </div>

                                : <button onClick={() => onStartChatButtonClicked(user._id)}>Start Chat</button>
                        }

                    </li>
                )
                )}

        </ul>
    )
}

export default UserList;