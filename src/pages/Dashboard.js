import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const token = localStorage.getItem('AuthToken');

  useEffect(() => {
    fetch('http://localhost:5000/api/code/my-rooms', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setRooms(data.rooms);
      });
  }, []);

  const handelDelete = async (roomId) => {
    const response = await fetch(`http://localhost:5000/api/code/delete/${roomId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });

    const jsonResponse = await response.json();
    if (jsonResponse.success) {
      setRooms(rooms.filter(room => room.roomId !== roomId));
      alert("Room deleted successfully");
    } else {
      alert("Something went wrong while deleting the room, please try again");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📄 Your Recent Rooms</h2>
      {rooms.length === 0 ? (
        <p style={styles.noRooms}>No rooms found. Start coding now!</p>
      ) : (
        <div style={styles.roomList}>
          {rooms.map((room, i) => (
            <div key={i} style={styles.card}>
              <div style={styles.cardContent}>
                <h3 style={styles.roomId}>🧩 {room.roomId}</h3>
                <p style={styles.meta}>💻 Language: {room.language}</p>
                <p style={styles.meta}>🕒 Last Used: {new Date(room.updatedAt).toLocaleString()}</p>
              </div>
              <div style={styles.actions}>
                <Link to={`/editor/${room.roomId}`} style={styles.joinBtn}>Join ➡️</Link>
                <button onClick={() => handelDelete(room.roomId)} style={styles.deleteBtn}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#121212',
    color: '#f1f1f1',
    padding: '2rem',
    minHeight: '100vh',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#61dafb'
  },
  noRooms: {
    fontSize: '1.2rem',
    color: '#999',
  },
  roomList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.2s ease-in-out',
  },
  cardContent: {
    marginBottom: '1rem',
  },
  roomId: {
    fontSize: '1.3rem',
    color: '#fff',
    marginBottom: '0.5rem',
  },
  meta: {
    fontSize: '0.95rem',
    color: '#aaa',
    marginBottom: '0.3rem',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  joinBtn: {
    padding: '8px 15px',
    backgroundColor: '#61dafb',
    color: '#000',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  }
};

export default Dashboard;
