import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const createRoom = () => {
    const id = uuidv4();
    navigate(`/editor/${id}`);
  };

  const joinRoom = () => {
    if (roomId.trim()) {
      navigate(`/editor/${roomId}`);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🚀 CodeSync</h1>
        <p style={styles.subtitle}>Collaborative real-time code editor</p>

        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="🔑 Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            style={styles.input}
          />
          <button onClick={joinRoom} style={styles.primaryBtn}>Join Room</button>
        </div>

        <div style={styles.buttonGroup}>
          <button onClick={createRoom} style={styles.secondaryBtn}>✨ Create New Room</button>
          <button onClick={() => navigate('/dashboard')} style={styles.ghostBtn}>📊 Go to Dashboard</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1f1c2c, #928DAB)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    padding: '2rem',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    padding: '3rem',
    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
    color: '#61dafb',
  },
  subtitle: {
    fontSize: '1rem',
    marginBottom: '2rem',
    color: '#ccc',
  },
  inputGroup: {
    marginBottom: '2rem',
  },
  input: {
    padding: '12px',
    width: '100%',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '1px solid #555',
    backgroundColor: '#1e1e1e',
    color: '#fff',
    fontSize: '1rem',
  },
  primaryBtn: {
    padding: '12px',
    width: '100%',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '8px',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  secondaryBtn: {
    padding: '12px',
    backgroundColor: '#61dafb',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  ghostBtn: {
    padding: '12px',
    backgroundColor: 'transparent',
    color: '#fff',
    border: '1px solid #aaa',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  }
};

export default Home;
