import React from 'react';
import { AuthProvider } from './AuthContext';
import Login from './Login';
import Signup from './Signup';

const API_BASE_URL = 'https://api.studyconnect.example.com';

export default function App() {
  return (
    <AuthProvider>
      <div className="app-shell">
        <Login />
        <Signup />
      </div>
    </AuthProvider>
  );
}
