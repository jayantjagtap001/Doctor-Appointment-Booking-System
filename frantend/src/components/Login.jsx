import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      login(email);
      navigate('/calendar');
    } catch (err) {
      alert('Invalid credentials. Want to Sign Up?');
      setShowSignUp(true);
      console.log(err);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Email and password are required');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User created successfully!');
      login(email);
      navigate('/calendar');
    } catch (err) {
      alert('Signup failed. Try again later.');
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {!showSignUp ? (
          <form onSubmit={handleLogin}>
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-6 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
            >
              Login
            </button>
            <p className="text-center mt-4">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setShowSignUp(true)}
                className="text-blue-500"
              >
                Sign Up
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignUp}>
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-6 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600"
            >
              Create Account
            </button>
            <p className="text-center mt-4">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setShowSignUp(false)}
                className="text-blue-500"
              >
                Login
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
