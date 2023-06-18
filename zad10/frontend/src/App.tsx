import { useState } from 'react';
import './App.css'

function App() {
  const [userMessage, setUserMessage] = useState("");
  const [gptMessage, setGptMessage] = useState("");

  const handleUserMessageChange = (e: any) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const response = await fetch('http://localhost:3000/chat', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: userMessage })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGptMessage(data.content);
      setUserMessage("");
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <>
      <h1 style={{textAlign: 'center'}}>Chat with chatgpt</h1>
      <div className="card" style={{maxWidth: '600px', margin: '0 auto'}}>
        <div className="chatbox">
          <input 
            type="text"
            value={userMessage}
            onChange={handleUserMessageChange} 
            placeholder="Type your message here..."
            style={{width: '100%', padding: '10px', marginBottom: '10px'}}
          />
          <button onClick={handleSendMessage} style={{width: '100%', padding: '10px'}}>Send message</button>
          <textarea 
            value={gptMessage} 
            readOnly
            style={{width: '100%', padding: '10px', marginTop: '10px'}}
          />
        </div>
      </div>
    </>
  )
}

export default App;