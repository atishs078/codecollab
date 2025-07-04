// src/components/Editor.jsx
import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, setCode }) => {
  return (
    <Editor
      height="90vh"
      theme="vs-dark"
      language="javascript"
      value={code}
      onChange={(value) => setCode(value)}
    />
  );
};

export default CodeEditor;
