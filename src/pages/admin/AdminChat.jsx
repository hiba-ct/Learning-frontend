import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const response = await axios.get('http://localhost:5000/chat/messages');
    setMessages(response.data);
  };

  const sendReply = async () => {
    if (!selectedMessage || !replyText) return;

    await axios.post('http://localhost:5000/chat/messages/reply', {
      messageId: selectedMessage,
      reply: replyText
    });

    setReplyText('');
    setSelectedMessage(null);
    fetchMessages(); // Refresh messages after reply
  };

  return (
    <div>
      <h2>Admin Chat Panel</h2>
      {messages.map((msg) => (
        <div key={msg._id}>
          <p><strong>User:</strong> {msg.message}</p>
          {msg.reply ? <p><strong>Admin:</strong> {msg.reply}</p> : null}
          {!msg.reply && (
            <>
              <input
                type="text"
                placeholder="Type your reply"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button onClick={() => setSelectedMessage(msg._id)}>Reply</button>
            </>
          )}
        </div>
      ))}
      {selectedMessage && <button onClick={sendReply}>Send Reply</button>}
    </div>
  );
};

export default AdminChat;
