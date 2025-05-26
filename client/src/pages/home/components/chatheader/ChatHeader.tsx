import './ChatHeader.scss';
function ChatHeader({ selectedUserDetails }) {
    return (
        <header className="chat-header-container">
            <h3>{selectedUserDetails.firstname} {selectedUserDetails.lastname}</h3>
            <hr />
        </header>
    )
}

export default ChatHeader;