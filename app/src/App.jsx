import React, { useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import AdminPortal from './AdminPortal';
import AdminDashboard from './AdminDashboard';
import AdminResults from './AdminResults';
import VoterPortal from './VoterPortal';
import Auth from './Auth';
import GlobalMathModal from './GlobalMathModal';
import { ShieldCheck, Users } from 'lucide-react';
import { savePoll, simulateThousandVotes } from './utils';
import { demo1Data, demo2Data } from './dummyData';

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 space-y-12">
      <GlobalMathModal />
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-tight">Consensus Engine</h1>
        <p className="text-gray-400 text-lg md:text-xl">A dual-sided legislative mediation platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Link to="/admin/login" className="group bg-[#050505] border border-gray-800 p-8 rounded-2xl hover:border-blue-500 transition-all flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold">Admin Portal</h2>
          <p className="text-gray-500 text-sm">Upload raw legislation or PDFs, let AI extract clauses, and publish interactive polls.</p>
        </Link>
        
        <Link to="/vote/login" className="group bg-[#050505] border border-gray-800 p-8 rounded-2xl hover:border-green-500 transition-all flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Users className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold">Voter Portal</h2>
          <p className="text-gray-500 text-sm">Review simplified clauses, cast your vote, and instantly view the friction map.</p>
        </Link>
      </div>
    </div>
  );
};

// Protected Route Wrapper for Admin
const AdminRoute = ({ children }) => {
  const session = localStorage.getItem('adminSession');
  return session ? children : <Navigate to="/admin/login" />;
};

const App = () => {
  useEffect(() => {
    if (!localStorage.getItem('hackathon_seeded')) {
      // 1. Ensure admin user exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (!users.find(u => u.username === 'admin')) {
        users.push({ type: 'admin', username: 'admin', password: 'password', fullName: 'System Admin' });
        localStorage.setItem('users', JSON.stringify(users));
      }
      
      // 2. Generate Polls and 1000 Votes each
      const code1 = savePoll(demo1Data, 'admin');
      const code2 = savePoll(demo2Data, 'admin');
      
      simulateThousandVotes(code1);
      simulateThousandVotes(code2);
      
      localStorage.setItem('hackathon_seeded', 'true');
      console.log("Database seeded successfully for pitch!");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Auth type="admin" />} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/create" element={<AdminRoute><AdminPortal /></AdminRoute>} />
        <Route path="/admin/results/:code" element={<AdminRoute><AdminResults /></AdminRoute>} />

        {/* Voter Routes */}
        <Route path="/vote/login" element={<Auth type="voter" />} />
        <Route path="/vote/*" element={<VoterPortal />} />
      </Routes>
    </>
  );
};

export default App;
