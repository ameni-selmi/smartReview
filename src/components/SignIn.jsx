
import { LockClosedIcon } from '@heroicons/react/16/solid';
import React, { useState } from 'react';

const SignIn = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setError('Username cannot be empty');
      return;
    }
    setError('');
    onSignIn();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-black">
        <div className="flex justify-center mb-6">
          <LockClosedIcon className="h-12 w-12 text-black" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">Sign In</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your username"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition duration-300"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;