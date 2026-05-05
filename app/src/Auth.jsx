import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, Eye, EyeOff } from 'lucide-react';
import { registerUser, loginUser } from './utils';

const Auth = ({ type }) => {
  const [isLogin, setIsLogin] = useState(true);
  
  // States for all fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [email, setEmail] = useState('');
  
  // UI states
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const resetErrors = () => setError('');

  const handleSubmit = (e) => {
    e.preventDefault();
    resetErrors();

    if (isLogin) {
      if (!username.trim() || !password.trim()) {
        setError('Please enter both username and password.');
        return;
      }
      
      if (loginUser(type, username, password)) {
        startSession();
      } else {
        setError('Invalid credentials or user does not exist.');
      }
    } else {
      // Sign Up Validation
      if (!fullName.trim() || !age.trim() || !email.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()) {
        setError('Please fill out all required fields.');
        return;
      }
      
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please try again.');
        return;
      }

      const userData = { fullName, age, gender, email, username, password };
      
      if (registerUser(type, userData)) {
        startSession();
      } else {
        setError('Username already exists. Please choose a different username.');
      }
    }
  };

  const startSession = () => {
    if (type === 'admin') {
      localStorage.setItem('adminSession', username);
      navigate('/admin/dashboard');
    } else {
      localStorage.setItem('voterSession', username);
      navigate('/vote/dashboard');
    }
  };

  const Icon = type === 'admin' ? ShieldCheck : Users;
  const title = type === 'admin' ? 'Admin Portal' : 'Voter Portal';
  const colorClass = type === 'admin' ? 'text-blue-500' : 'text-green-500';
  const bgClass = type === 'admin' ? 'bg-blue-600' : 'bg-green-600';

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 selection:bg-gray-800 py-12">
      <div className={`w-full ${isLogin ? 'max-w-md' : 'max-w-2xl'} bg-[#050505] border border-gray-800 p-8 rounded-2xl space-y-8 shadow-2xl relative overflow-hidden transition-all duration-300`}>
        <div className={`absolute top-0 left-0 w-1 h-full ${bgClass}`}></div>
        <div className="text-center space-y-2">
          <Icon className={`w-12 h-12 mx-auto ${colorClass}`} />
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-gray-500 text-sm">{isLogin ? 'Sign in to your account' : 'Register a new account'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Full Name *</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => { setFullName(e.target.value); resetErrors(); }}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-gray-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Email ID *</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); resetErrors(); }}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-gray-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Age *</label>
                <input 
                  type="number" 
                  value={age}
                  onChange={(e) => { setAge(e.target.value); resetErrors(); }}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-gray-500"
                  placeholder="25"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Gender *</label>
                <select 
                  value={gender}
                  onChange={(e) => { setGender(e.target.value); resetErrors(); }}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-gray-500 appearance-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>
          )}

          <div className={`space-y-4 ${!isLogin ? 'mt-6 pt-6 border-t border-gray-800' : ''}`}>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Username *</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => { setUsername(e.target.value); resetErrors(); }}
                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-gray-500"
                placeholder="Enter username"
              />
            </div>

            <div className={!isLogin ? "grid grid-cols-1 md:grid-cols-2 gap-4" : ""}>
              <div className="relative">
                <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Password *</label>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); resetErrors(); }}
                  className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-3 pr-10 text-white focus:outline-none focus:border-gray-500"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {!isLogin && (
                <div className="relative">
                  <label className="block text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">Confirm Password *</label>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); resetErrors(); }}
                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-3 pr-10 text-white focus:outline-none focus:border-gray-500"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-500 text-sm font-bold text-center">{error}</p>
            </div>
          )}
          
          <button 
            type="submit"
            className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-gray-200 transition-colors mt-6"
          >
            {isLogin ? 'Sign In' : 'Complete Registration'}
          </button>
        </form>

        <div className="text-center pt-6 border-t border-gray-800">
          <button 
            type="button" 
            onClick={() => { 
              setIsLogin(!isLogin); 
              resetErrors(); 
              setUsername('');
              setPassword('');
              setConfirmPassword('');
            }} 
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
