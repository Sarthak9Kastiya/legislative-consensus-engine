import React, { useState, useEffect } from 'react';
import { UserCheck, ArrowRight, CheckCircle2, XCircle, MinusCircle, Search, LogOut, Lock } from 'lucide-react';
import LegislativeDashboard from './LegislativeDashboard';
import MathExplanation from './MathExplanation';
import { getPollByCode, updatePollVotes } from './utils';
import { useNavigate, Routes, Route, useParams } from 'react-router-dom';

const VoterDashboard = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const session = localStorage.getItem('voterSession');
    if (!session) {
      navigate('/vote/login');
      return;
    }
    
    // Load local voting history
    const hist = localStorage.getItem('voterHistory');
    if (hist) setHistory(JSON.parse(hist));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('voterSession');
    navigate('/');
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    
    const poll = getPollByCode(code.trim().toUpperCase());
    if (poll) {
      navigate(`/vote/poll/${poll.pollCode}`);
    } else {
      setError('Invalid poll code. Please check with your administrator.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans selection:bg-gray-800">
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="flex justify-between items-center border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-green-500">Voter Portal</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </header>

        <div className="bg-[#050505] border border-gray-800 rounded-2xl p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-bold">Join a Poll</h2>
            <p className="text-gray-400 text-sm">Enter the 6-character access code provided by the administrator.</p>
          </div>

          <form onSubmit={handleJoin} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-500" />
              </div>
              <input 
                type="text" 
                value={code}
                onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(''); }}
                maxLength={6}
                className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg py-4 pl-12 pr-4 text-white font-mono text-lg tracking-widest focus:outline-none focus:border-green-500 transition-colors placeholder-gray-700 uppercase"
                placeholder="XXXXXX"
              />
            </div>
            <button 
              type="submit"
              className="px-8 py-4 bg-green-600 text-white font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-green-500 transition-colors"
            >
              Access Poll
            </button>
          </form>
          {error && <p className="text-red-500 text-sm text-center font-bold">{error}</p>}
        </div>

        {history.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500">Your Voting History</h3>
            <div className="grid grid-cols-1 gap-4">
              {history.slice().reverse().map((h, idx) => (
                <div key={idx} className="bg-[#0a0a0a] border border-gray-800 p-5 rounded-lg flex justify-between items-center hover:border-gray-600 transition-colors cursor-pointer" onClick={() => navigate(`/vote/poll/${h.code}`)}>
                  <div>
                    <span className="text-xs text-gray-500 font-mono block mb-1">CODE: {h.code}</span>
                    <strong className="text-gray-200">{h.title}</strong>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const VoterVotingArea = ({ code }) => {
  const [pollData, setPollData] = useState(null);
  const [votes, setVotes] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalData, setFinalData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // We must poll this continuously or refresh on load because admin might have toggled visibility
    const poll = getPollByCode(code);
    if (poll) {
      setPollData(poll);
      
      const hist = JSON.parse(localStorage.getItem('voterHistory') || '[]');
      if (hist.some(h => h.code === code)) {
        setIsSubmitted(true);
        setFinalData(poll);
      }
    }
  }, [code]);

  const handleVote = (clauseId, value) => {
    setVotes(prev => ({ ...prev, [clauseId]: value }));
  };

  const submitVotes = () => {
    const updatedPoll = updatePollVotes(code, votes);
    setFinalData(updatedPoll);
    
    // Save to history
    const hist = JSON.parse(localStorage.getItem('voterHistory') || '[]');
    hist.push({ code, title: updatedPoll.metadata.bill_title, timestamp: new Date().toISOString() });
    localStorage.setItem('voterHistory', JSON.stringify(hist));
    
    setIsSubmitted(true);
  };

  if (!pollData) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 space-y-4">
        <XCircle className="w-16 h-16 text-red-700" />
        <h2 className="text-2xl font-bold">Invalid Poll</h2>
        <button onClick={() => navigate('/vote/dashboard')} className="text-blue-500 hover:underline">Return to Dashboard</button>
      </div>
    );
  }

  if (isSubmitted) {
    // If results are NOT published, show the lock screen
    // We use the fresh finalData to ensure we have the latest flag
    if (!finalData.isResultsPublished) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 space-y-6">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-12 max-w-lg text-center space-y-6 shadow-2xl">
            <Lock className="w-16 h-16 text-yellow-500 mx-auto" />
            <h2 className="text-3xl font-bold">Results Pending</h2>
            <p className="text-gray-400">Your vote has been successfully recorded. The administrator has not yet authorized the public release of the Consensus Map for this poll.</p>
            <div className="pt-6">
              <button 
                onClick={() => navigate('/vote/dashboard')} 
                className="px-6 py-3 border border-gray-700 rounded-lg text-sm font-bold text-gray-300 hover:text-white hover:bg-gray-900 transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-black min-h-screen pb-12">
        <div className="bg-green-600/20 border-b border-green-500/50 text-green-400 p-4 text-center text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3">
          <CheckCircle2 className="w-5 h-5" /> Vote Submitted! Live Consensus Map Authorized
        </div>
        <div className="max-w-5xl mx-auto p-6 pt-6">
           <button onClick={() => navigate('/vote/dashboard')} className="text-sm text-gray-500 hover:text-white mb-4 flex items-center gap-2">← Back to Dashboard</button>
        </div>
        <LegislativeDashboard data={finalData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans selection:bg-gray-800">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-4 border-b border-gray-800 pb-6 text-center relative">
          <button onClick={() => navigate('/vote/dashboard')} className="absolute left-0 top-0 text-gray-500 hover:text-white text-sm font-bold flex items-center gap-1">← Back</button>
          <span className="text-xs font-mono uppercase tracking-widest text-gray-500 block mb-2">POLL CODE: <span className="text-green-500">{code}</span></span>
          <h1 className="text-xl md:text-3xl font-bold text-gray-100">
            {pollData.metadata.bill_title}
          </h1>
          <p className="text-gray-400 text-sm">Review each clause below and cast your vote.</p>
        </header>

        {/* Math Explanation UI */}
        <MathExplanation />

        <div className="space-y-8">
          {pollData.clauses.map((clause, idx) => (
            <div key={idx} className="bg-[#050505] border border-gray-800 p-6 rounded-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-green-600"></div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-100">Section {clause.clause_id}: {clause.clause_name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{clause.plain_language_summary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0a0a0a] p-4 rounded text-sm text-gray-400 border border-gray-800/50">
                  <strong className="text-green-500 block mb-1 uppercase text-xs">Argument For</strong>
                  {clause.friction_analysis.argument_for}
                </div>
                <div className="bg-[#0a0a0a] p-4 rounded text-sm text-gray-400 border border-gray-800/50">
                  <strong className="text-red-500 block mb-1 uppercase text-xs">Argument Against</strong>
                  {clause.friction_analysis.argument_against}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-gray-800">
                <button 
                  onClick={() => handleVote(clause.clause_id, 1)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold border transition-colors ${votes[clause.clause_id] === 1 ? 'bg-green-500/20 text-green-400 border-green-500' : 'bg-transparent text-gray-500 border-gray-700 hover:border-gray-500'}`}
                >
                  <CheckCircle2 className="w-4 h-4" /> Approve
                </button>
                <button 
                  onClick={() => handleVote(clause.clause_id, 0)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold border transition-colors ${votes[clause.clause_id] === 0 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500' : 'bg-transparent text-gray-500 border-gray-700 hover:border-gray-500'}`}
                >
                  <MinusCircle className="w-4 h-4" /> Neutral
                </button>
                <button 
                  onClick={() => handleVote(clause.clause_id, -1)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold border transition-colors ${votes[clause.clause_id] === -1 ? 'bg-red-500/20 text-red-400 border-red-500' : 'bg-transparent text-gray-500 border-gray-700 hover:border-gray-500'}`}
                >
                  <XCircle className="w-4 h-4" /> Oppose
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={submitVotes}
          disabled={Object.keys(votes).length !== pollData.clauses.length}
          className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-white/5"
        >
          Submit Votes <ArrowRight className="w-4 h-4" />
        </button>
        {Object.keys(votes).length !== pollData.clauses.length && (
          <p className="text-center text-xs text-red-500 mt-2">Please vote on all clauses before submitting.</p>
        )}
      </div>
    </div>
  );
};

const VoterPollRoute = () => {
  const { code } = useParams();
  return <VoterVotingArea code={code} />;
};

const VoterPortal = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<VoterDashboard />} />
      <Route path="poll/:code" element={<VoterPollRoute />} />
    </Routes>
  );
}

export default VoterPortal;
