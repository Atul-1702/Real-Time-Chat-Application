import { useSelector } from "react-redux";
import './chat.scss';
import ChatHeader from './../chatheader/ChatHeader';
import ChatFooter from './../chatfooter/ChatFooter';
import toast from "react-hot-toast";
import { getUserAllMessages } from "../../../../apiCalls/message.api";
import { useState } from "react";

function Chat() {
    const [messages, setMessages] = useState([]);
    const { selectedUser, userAllChats } = useSelector((state) => state.userReducer);
    let selectedUserDetails = userAllChats.map((memb) => memb.members).filter((memb) => {
        if (selectedUser === memb[0]._id || selectedUser === memb[1]._id) {
            return true;
        }
        return false;
    });
    selectedUserDetails = selectedUserDetails[0].filter((mem) => mem._id === selectedUser)[0];


    async function getAllMessage(chatId) {
        console.log(chatId);
        const response = await getUserAllMessages(chatId);

        if (response.success === true) {
            setMessages(response.data);
        }
        else {
            toast.error("Something went wrong");
        }
    }

    return (<section className="chat-component-section">
        <ChatHeader selectedUserDetails={selectedUserDetails}></ChatHeader>
        <div className="chat-main-area">
            {
                messages.map((message) => (
                    <p key={message._id} className={selectedUser !== message.sender ? "send-message" : "received-message"}>{message.text}</p>
                ))
            }


        </div>
        <ChatFooter getAllMessage={getAllMessage}></ChatFooter>
    </section>)
}

export default Chat;