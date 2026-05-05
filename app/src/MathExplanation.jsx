import React from 'react';
import { Calculator } from 'lucide-react';

const MathExplanation = () => {
  return (
    <div className="bg-[#050505] border border-blue-900/40 p-6 rounded-xl space-y-4 shadow-[0_0_20px_rgba(59,130,246,0.05)]">
      <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
        <Calculator className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-bold text-gray-200">The Consensus Algorithm</h3>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">
        We utilize a strict, unweighted mathematical average to quantify democratic agreement. The system guarantees that 100% of the final consensus is driven by actual human voters, ensuring complete algorithmic neutrality and absolute fairness.
      </p>
      
      <div className="bg-[#0a0a0a] p-4 rounded-lg border border-gray-800 text-center font-mono text-blue-400 my-4 text-lg">
        S<sub>final</sub> = (Sum of all human votes) / (Total number of voters)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
        <div className="bg-[#0a0a0a] p-4 rounded border border-gray-800">
          <span className="block text-gray-500 text-xs font-bold uppercase mb-2 border-b border-gray-800 pb-2">1. THE VOTING SCALE</span>
          <p className="text-gray-400 leading-relaxed">
            Every participant casts a numerical value for each legislative clause: <span className="text-green-400">+10</span> (Strongly Approve), <span className="text-yellow-400">0</span> (Neutral), down to <span className="text-red-400">-10</span> (Strongly Oppose).
          </p>
        </div>
        <div className="bg-[#0a0a0a] p-4 rounded border border-gray-800">
          <span className="block text-gray-500 text-xs font-bold uppercase mb-2 border-b border-gray-800 pb-2">2. ABSOLUTE EQUALITY</span>
          <p className="text-gray-400 leading-relaxed">
            The final consensus score is the absolute, unweighted average of all human votes cast. There is zero algorithmic intervention, ensuring every human voice holds the exact same mathematical power.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MathExplanation;
