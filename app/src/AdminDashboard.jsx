import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPolls, togglePollVisibility, simulateThousandVotes, deletePoll, savePoll } from './utils';
import { demo1Data, demo2Data } from './dummyData';
import { Plus, BarChart3, Copy, Check, Eye, EyeOff, Beaker, Trash2, Database } from 'lucide-react';

const AdminDashboard = () => {
  const [polls, setPolls] = useState([]);
  const [copiedCode, setCopiedCode] = useState('');
  const [deletedPoll, setDeletedPoll] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem('adminSession');
    const allPolls = getPolls();
    setPolls(allPolls.filter(p => p.createdBy === session));
  }, []);

  const handleSeedData = () => {
    const session = localStorage.getItem('adminSession');
    const code1 = savePoll(demo1Data, session);
    const code2 = savePoll(demo2Data, session);
    simulateThousandVotes(code1);
    simulateThousandVotes(code2);
    
    const allPolls = getPolls();
    setPolls(allPolls.filter(p => p.createdBy === session));
    alert('Successfully generated Farm Bill and Women Reservation polls with 1000 votes each!');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    navigate('/');
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const handleToggle = (code) => {
    togglePollVisibility(code);
    const session = localStorage.getItem('adminSession');
    const allPolls = getPolls();
    setPolls(allPolls.filter(p => p.createdBy === session)); // Refresh
  };

  const handleSimulate = (code) => {
    if(window.confirm('Are you sure you want to simulate 1000 votes? This will inject random data.')){
      simulateThousandVotes(code);
      const session = localStorage.getItem('adminSession');
      const allPolls = getPolls();
      setPolls(allPolls.filter(p => p.createdBy === session)); // Refresh
    }
  };

  const handleDelete = (code) => {
    if(window.confirm('Are you sure you want to delete this poll?')){
      const pollToSave = polls.find(p => p.pollCode === code);
      setDeletedPoll(pollToSave);
      
      deletePoll(code);
      const session = localStorage.getItem('adminSession');
      const allPolls = getPolls();
      setPolls(allPolls.filter(p => p.createdBy === session)); // Refresh
      
      // Auto hide undo after 10 seconds
      setTimeout(() => setDeletedPoll(null), 10000);
    }
  };

  const handleUndo = () => {
    if (deletedPoll) {
      const allPolls = getPolls();
      allPolls.push(deletedPoll);
      localStorage.setItem('polls', JSON.stringify(allPolls));
      
      const session = localStorage.getItem('adminSession');
      setPolls(allPolls.filter(p => p.createdBy === session));
      setDeletedPoll(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans selection:bg-gray-800">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-blue-500">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">Manage your legislative polls and view consensus results.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSeedData} className="px-4 py-2 border border-blue-500/30 bg-blue-500/10 rounded-lg text-sm font-bold text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 transition-colors flex items-center gap-2">
              <Database className="w-4 h-4" /> Seed Sample Data
            </button>
            <button onClick={handleLogout} className="px-4 py-2 border border-gray-800 rounded-lg text-sm font-bold text-gray-400 hover:text-white hover:border-gray-600 transition-colors">
              Log Out
            </button>
            <Link to="/admin/create" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-500 transition-colors">
              <Plus className="w-4 h-4" /> New Poll
            </Link>
          </div>
        </header>

        {polls.length === 0 ? (
          <div className="text-center py-20 border border-gray-800 border-dashed rounded-2xl bg-[#050505]">
            <h3 className="text-xl font-bold text-gray-300">No Polls Created</h3>
            <p className="text-gray-500 mt-2">Click "New Poll" to generate a consensus poll.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-mono uppercase tracking-widest text-gray-500">
              <div className="col-span-5 md:col-span-4">Bill Title</div>
              <div className="col-span-3 md:col-span-2">Access Code</div>
              <div className="col-span-2 md:col-span-2 text-center">Results</div>
              <div className="hidden md:block col-span-2 text-center">Votes</div>
              <div className="hidden md:block col-span-2 text-right">Actions</div>
            </div>
            
            {polls.slice().reverse().map(poll => (
              <div key={poll.pollCode} className="grid grid-cols-12 gap-4 items-center px-6 py-5 bg-[#050505] border border-gray-800 rounded-xl hover:border-gray-600 transition-colors relative overflow-hidden">
                <div className={`absolute left-0 top-0 w-1 h-full ${poll.isResultsPublished ? 'bg-green-500' : 'bg-gray-800'}`}></div>
                <div className="col-span-5 md:col-span-4 pl-2">
                  <h4 className="font-bold text-gray-200 line-clamp-1" title={poll.metadata.bill_title}>{poll.metadata.bill_title}</h4>
                  <span className="text-xs text-gray-500">{new Date(poll.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="col-span-3 md:col-span-2">
                  <button 
                    onClick={() => copyToClipboard(poll.pollCode)}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-900 border border-gray-700 rounded text-sm font-mono text-blue-400 hover:bg-gray-800 transition-colors"
                  >
                    {copiedCode === poll.pollCode ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    {poll.pollCode}
                  </button>
                </div>

                <div className="col-span-2 md:col-span-2 text-center">
                  <button 
                    onClick={() => handleToggle(poll.pollCode)}
                    className={`flex items-center justify-center gap-1.5 mx-auto px-3 py-1.5 rounded text-xs font-bold uppercase tracking-widest transition-colors border ${poll.isResultsPublished ? 'border-green-500/50 bg-green-500/10 text-green-500' : 'border-gray-700 bg-gray-900 text-gray-400 hover:text-white'}`}
                  >
                    {poll.isResultsPublished ? <><Eye className="w-3 h-3" /> Public</> : <><EyeOff className="w-3 h-3" /> Hidden</>}
                  </button>
                </div>

                <div className="col-span-2 md:col-span-2 text-center">
                  <span className="text-lg font-bold text-gray-300">{poll.votes?.length || 0}</span>
                </div>

                <div className="col-span-12 md:col-span-2 flex justify-end gap-2 mt-4 md:mt-0">
                  <button
                    onClick={() => handleDelete(poll.pollCode)}
                    title="Delete Poll"
                    className="p-2 bg-gray-900 border border-gray-700 text-red-500 hover:text-white hover:bg-red-600 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleSimulate(poll.pollCode)}
                    title="Simulate 1000 Votes"
                    className="p-2 bg-gray-900 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
                  >
                    <Beaker className="w-4 h-4" />
                  </button>
                  <Link 
                    to={`/admin/results/${poll.pollCode}`}
                    className="flex-1 md:flex-none px-4 py-2 bg-white text-black font-bold uppercase tracking-wider text-xs rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <BarChart3 className="w-4 h-4" /> Results
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deletedPoll && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-gray-700 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-5">
          <span className="text-sm font-bold text-gray-300">Poll deleted.</span>
          <button 
            onClick={handleUndo}
            className="text-blue-500 font-bold text-sm uppercase tracking-wider hover:text-blue-400 transition-colors underline decoration-blue-500/30 underline-offset-4"
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
