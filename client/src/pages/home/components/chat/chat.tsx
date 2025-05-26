import { useSelector } from "react-redux";
import './chat.scss';
import ChatHeader from './../chatheader/ChatHeader';

function Chat() {
    const { selectedUser } = useSelector((state) => state.userReducer);
    const { userAllChats } = useSelector((state) => state.userReducer);
    let selectedUserDetails = userAllChats.map((memb) => memb.members).filter((memb) => {
        if (selectedUser === memb[0]._id || selectedUser === memb[1]._id) {
            return true;
        }
        return false;
    });
    selectedUserDetails = selectedUserDetails[0].filter((mem) => mem._id === selectedUser)[0];
    return (<section className="chat-component-section">
        <ChatHeader selectedUserDetails={selectedUserDetails}></ChatHeader>
    </section>)
}

export default Chat;