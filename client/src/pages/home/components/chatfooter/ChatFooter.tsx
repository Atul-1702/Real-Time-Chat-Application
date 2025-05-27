import './ChatFooter.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { RefObject, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';;
import toast from 'react-hot-toast';
import { sendNewMessage } from '../../../../apiCalls/message.api';

function ChatFooter({ getAllMessage }) {
    const inputRef: RefObject<HTMLInputElement | null> = useRef(null);
    const { selectedUser, user, userAllChats } = useSelector((state) => state.userReducer);
    const chat = userAllChats.find((item) => {
        if (item.members[0]._id === selectedUser || item.members[1]._id === selectedUser) {
            return true;
        }
    })
    useEffect(() => {
        getAllMessage(chat._id);
    }, [selectedUser])

    async function onSendMessageButtonClicked() {
        const message = {
            sender: user._id,
            chatId: chat._id,
            text: inputRef?.current?.value,
        }
        const response = await sendNewMessage(message);

        if (response.success === true) {
            toast.success("Message send successfully");
            if (inputRef.current?.value) {
                inputRef.current.value = "";
            }

        }
        else {
            toast.error("something went wrong");
        }

    }

    return (<footer className='chat-footer-component-wrapper'>
        <input ref={inputRef} type="text" placeholder='Type a message...' />
        <button onClick={onSendMessageButtonClicked}><FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon></button>
    </footer>)
}

export default ChatFooter;