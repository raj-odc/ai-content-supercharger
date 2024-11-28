import React, { useState } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEnhanceContent = async () => {
    try {
      const response = await fetch('http://localhost:5001/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setOutputText(data.enhancedText);
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Unable to enhance content. Please try again.');
    }
  };
  

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>AI Content Supercharger</h1>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Paste your content here..."
        rows="10"
        style={{ width: '100%', marginBottom: '20px', padding: '10px', fontSize: '16px' }}
      />
      <button
        onClick={handleEnhanceContent}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Enhance Content
      </button>
      <div
        style={{
          marginTop: '20px',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <h2>Output</h2>
        <p>{outputText || 'Your enhanced content will appear here.'}</p>
      </div>
    </div>
  );
}

export default App;
