import { useSelector } from "react-redux";
import './chat.scss';
import ChatHeader from './../chatheader/ChatHeader';
import ChatFooter from './../chatfooter/ChatFooter';
import toast from "react-hot-toast";
import { getUserAllMessages } from "../../../../apiCalls/message.api";
import { useState } from "react";
import moment from 'moment';
import { diff } from './../../../../../../node_modules/moment/src/lib/moment/diff';
import React from "react";
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
    function getMessageTimeAndDate(timestamp) {
        const currentDateTime = moment();
        const days = currentDateTime.diff(timestamp, 'days');
        let nearestTimestamp = moment(timestamp).format('hh:mm A');
        if (days === 0) {

            return `Today ${nearestTimestamp}`;
        }
        else {

            if (days === 1) {
                return `Yesterday ${nearestTimestamp}`

            }
            else {
                nearestTimestamp = moment(timestamp).format('DD MMM YYYY hh:mm A');
                return nearestTimestamp;
            }
        }


    }

    return (<section className="chat-component-section">
        <ChatHeader selectedUserDetails={selectedUserDetails}></ChatHeader>
        <div className="chat-main-area">
            {
                messages.map((message) => (
                    <React.Fragment key={message._id}>
                        <p className={selectedUser !== message.sender ? "send-message" : "received-message"}>{message.text}</p>
                        <time className={selectedUser !== message.sender ? "send-message-time" : "received-message-time"} dateTime={message.createdAt}>{getMessageTimeAndDate(message.createdAt)}</time>
                    </React.Fragment>
                ))
            }


        </div>
        <ChatFooter getAllMessage={getAllMessage}></ChatFooter>
    </section>)
}

export default Chat;