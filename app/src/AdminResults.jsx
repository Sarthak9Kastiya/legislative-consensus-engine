import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPollByCode } from './utils';
import LegislativeDashboard from './LegislativeDashboard';
import MathExplanation from './MathExplanation';
import { ArrowLeft, BrainCircuit, Users, Activity, AlertTriangle } from 'lucide-react';

const AdminResults = () => {
  const { code } = useParams();
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    setPoll(getPollByCode(code));
  }, [code]);

  if (!poll) return <div className="text-white p-12 text-center">Poll not found.</div>;

  const currentAdmin = localStorage.getItem('adminSession');
  if (poll.createdBy && poll.createdBy !== currentAdmin) {
    return (
      <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center p-6 space-y-4">
        <AlertTriangle className="w-16 h-16 text-red-700" />
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="text-gray-400">You do not have permission to view the results for this poll.</p>
        <Link to="/admin/dashboard" className="text-blue-500 hover:underline">Return to Dashboard</Link>
      </div>
    );
  }

  const totalVotes = poll.votes?.length || 0;
  
  // Calculations
  // Final Bill Score: Average of all clause approval ratings
  const totalRawSum = poll.clauses.reduce((acc, c) => acc + (c.approval_rating || 0), 0);
  const finalBillScore = poll.clauses.length > 0 ? (totalRawSum / poll.clauses.length).toFixed(2) : "0.00";

  let mostContentious = null;
  if (poll.clauses.length > 0) {
    // Find most contentious (lowest score)
    mostContentious = [...poll.clauses].sort((a, b) => a.approval_rating - b.approval_rating)[0];
  }

  // Generate Inferences
  const redClauses = poll.clauses.filter(c => c.approval_rating < 0);
  const greenClauses = poll.clauses.filter(c => c.approval_rating > 0);
  
  const inferences = [];
  if (totalVotes === 0) {
    inferences.push("No votes have been cast yet. The data below reflects the baseline AI friction analysis.");
  } else {
    inferences.push(`Based on ${totalVotes} vote(s), the overall legislative sentiment is leaning ${redClauses.length > greenClauses.length ? 'negative' : 'positive'}.`);
    
    if (redClauses.length > 0) {
      const mostHated = redClauses.sort((a, b) => a.approval_rating - b.approval_rating)[0];
      inferences.push(`Critical Friction Point: Clause ${mostHated.clause_id} (${mostHated.clause_name}) is facing severe public opposition. Consider revising the penalty or timeline to increase overall bill passage probability.`);
    }

    if (greenClauses.length > 0) {
      const mostLoved = greenClauses.sort((a, b) => b.approval_rating - a.approval_rating)[0];
      inferences.push(`Strong Consensus: Clause ${mostLoved.clause_id} (${mostLoved.clause_name}) is highly supported and should be retained as a core pillar of the legislation.`);
    }
  }

  return (
    <div className="bg-black min-h-screen pb-12 text-white font-sans">
      <div className="p-6 md:px-12 pt-8 flex items-center justify-between border-b border-gray-800 bg-[#050505] sticky top-0 z-50 shadow-2xl">
        <Link to="/admin/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="text-right flex items-center gap-4">
          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded ${poll.isResultsPublished ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-gray-800 text-gray-400 border border-gray-700'}`}>
            {poll.isResultsPublished ? 'Results Public' : 'Results Hidden'}
          </span>
          <div>
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-1">Access Code</span>
            <span className="font-mono text-xl font-bold text-blue-500">{poll.pollCode}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-8">
        
        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#050505] border border-gray-800 rounded-xl p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3 text-gray-400 mb-4">
              <Users className="w-5 h-5 text-blue-500" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Total Votes Cast</h3>
            </div>
            <span className="text-5xl font-black">{totalVotes}</span>
          </div>
          
          <div className="bg-[#050505] border border-gray-800 rounded-xl p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3 text-gray-400 mb-4">
              <Activity className="w-5 h-5 text-purple-500" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Final Bill Score</h3>
            </div>
            <div className="flex items-end gap-3">
              <span className={`text-6xl font-black ${finalBillScore > 0 ? 'text-green-500' : finalBillScore < 0 ? 'text-red-500' : 'text-gray-300'}`}>
                {finalBillScore > 0 ? '+' : ''}{finalBillScore}
              </span>
            </div>
          </div>
          
          <div className="bg-[#050505] border border-gray-800 rounded-xl p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3 text-gray-400 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Most Contentious</h3>
            </div>
            <div>
              <span className="text-xl font-bold text-red-400 leading-tight block mb-2">{mostContentious?.clause_name || 'N/A'}</span>
              <span className="text-sm text-gray-500 font-mono">Rating: {mostContentious?.approval_rating}</span>
            </div>
          </div>
        </div>

        {/* Math Explanation */}
        <MathExplanation />

        {/* AI Inferences Section */}
        <div className="bg-[#050505] border border-blue-900/50 rounded-xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)]">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
          <div className="flex items-center gap-3 mb-6">
            <BrainCircuit className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-white tracking-tight">AI Strategic Inferences</h2>
          </div>
          
          <ul className="space-y-4">
            {inferences.map((inf, idx) => (
              <li key={idx} className="flex gap-4 items-start text-gray-300 bg-[#0a0a0a] p-4 rounded-lg border border-gray-800">
                <span className="text-blue-500 font-mono mt-0.5">{(idx + 1).toString().padStart(2, '0')}</span>
                <p className="leading-relaxed text-sm">{inf}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Detailed Data Table */}
        <div className="bg-[#050505] border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold">Clause Breakdown</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0a0a0a] text-gray-500 font-mono uppercase tracking-widest text-xs">
                <tr>
                  <th className="p-4">Clause</th>
                  <th className="p-4 text-center">Votes (Y/N/O)</th>
                  <th className="p-4 text-center">Final Score</th>
                  <th className="p-4 text-center">Zone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {poll.clauses.map(c => (
                    <tr key={c.clause_id} className="hover:bg-[#111] transition-colors">
                      <td className="p-4 font-bold text-gray-200">{c.clause_name}</td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold">
                          <span className="text-green-500">{c.vote_distribution?.yes || 0}</span>
                          <span className="text-gray-500">/</span>
                          <span className="text-yellow-500">{c.vote_distribution?.neutral || 0}</span>
                          <span className="text-gray-500">/</span>
                          <span className="text-red-500">{c.vote_distribution?.no || 0}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className="font-mono font-bold text-lg">{c.approval_rating.toFixed(1)}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-widest ${c.approval_rating >= 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                          {c.approval_rating >= 0 ? 'Green' : 'Red'}
                        </span>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Map */}
        <div className="pt-8 border-t border-gray-800 mt-8">
          <h2 className="text-2xl font-bold text-white tracking-tight mb-8">Friction Map Visualization</h2>
          <div className="bg-black border border-gray-800 rounded-xl overflow-hidden p-6 shadow-2xl">
            <LegislativeDashboard data={poll} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResults;
