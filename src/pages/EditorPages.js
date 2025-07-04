import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditor from '../component/Editor';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const EditorPages = () => {
  const { roomId } = useParams();
  const [code, setCode] = useState('// Start coding...');
  const [output, setOutput] = useState('');
  const codeRef = useRef('');
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('AuthToken');
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/code/load/${roomId}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) {
          setCode(data.code);
          codeRef.current = data.code;
        }
      } catch (err) {
        console.error("❌ Error loading code:", err);
      }
    };
    fetchCode();
  }, [roomId, token]);

  useEffect(() => {
    socket.emit('join-room', { roomId, userName });
    socket.on('room-users', setUsers);
    socket.on('code-update', (incomingCode) => {
      if (incomingCode !== codeRef.current) {
        codeRef.current = incomingCode;
        setCode(incomingCode);
      }
    });
    return () => {
      socket.off('room-users');
      socket.off('code-update');
    };
  }, [roomId, userName]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:5000/api/code/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ roomId, code: codeRef.current })
      }).catch(err => console.error("❌ Error saving code:", err));
    }, 5000);
    return () => clearInterval(interval);
  }, [roomId, token]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    codeRef.current = newCode;
    socket.emit('code-change', { roomId, code: newCode });
  };

  const handleRun = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeRef.current, language: 'javascript' })
      });
      const jsonResponse = await response.json();
      setOutput(jsonResponse.output);
    } catch (err) {
      console.error("❌ Error running code:", err);
      setOutput("Error: Could not connect to the execution server.");
    }
  };

  return (
    <div className="flex min-h-screen text-gray-100 bg-zinc-900 font-sans">
      <aside className="w-72 bg-zinc-800 p-5 border-r border-zinc-700 shadow-md">
        <h4 className="text-cyan-400 text-lg border-b border-zinc-600 pb-2 mb-4">Connected Users</h4>
        <ul className="space-y-2 overflow-y-auto max-h-[80vh]">
          {users.map((u, i) => (
            <li key={i} className="flex items-center bg-zinc-700 p-2 rounded hover:bg-zinc-600 transition">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2 shadow"></span> {u.userName}
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 flex flex-col p-6 space-y-6">
        <header className="flex flex-wrap gap-4 justify-between items-center border-b border-zinc-700 pb-4">
          <div>
            <h2 className="text-xl font-semibold">Room ID: <span className="text-cyan-400 font-bold">{roomId}</span></h2>
            <h2 className="text-xl font-semibold">User: <span className="text-cyan-400 font-bold">{userName}</span></h2>
          </div>
          <button onClick={handleRun} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-lg font-semibold shadow">
            ▶️ Run Code
          </button>
        </header>

        <section className="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6 flex-1">
          <div className="flex-1 shadow-lg rounded-lg overflow-hidden">
            <CodeEditor code={code} setCode={handleCodeChange} />
          </div>
          <div className="lg:w-[35%] min-h-[150px] bg-black text-green-400 p-4 rounded-lg font-mono text-sm overflow-y-auto shadow-lg border border-zinc-700">
            <strong className="text-cyan-400 block border-b border-zinc-700 pb-2 mb-2">Output:</strong>
            <pre className="whitespace-pre-wrap break-words m-0">{output}</pre>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EditorPages;
