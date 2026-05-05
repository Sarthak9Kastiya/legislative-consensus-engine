import React from 'react';



const LegislativeDashboard = ({ data }) => {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans selection:bg-gray-800">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header Section */}
        <header className="space-y-6 pb-8 border-b border-gray-800">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            {data.metadata.bill_title}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-400">
            <span className="text-sm font-mono uppercase tracking-widest text-gray-300 font-semibold bg-gray-900 px-3 py-1 rounded-sm border border-gray-800">
              {data.metadata.overall_status}
            </span>
            <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-gray-700"></span>
            <p className="text-base md:text-lg max-w-3xl leading-relaxed">
              {data.metadata.ethical_alignment_note}
            </p>
          </div>
        </header>

        {/* Clauses Grid */}
        <section className="space-y-8">
          <h2 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-6">Clause Analysis</h2>
          <div className="grid grid-cols-1 gap-8">
            {data.clauses.map((clause) => {
              const isGreen = clause.color_zone === 'Green';
              const accentText = isGreen ? 'text-green-500' : 'text-red-500';
              const accentBorder = isGreen ? 'border-green-500/30' : 'border-red-500/30';
              const accentBg = isGreen ? 'bg-green-500/5' : 'bg-red-500/5';
              const accentShadow = isGreen ? 'shadow-[0_0_15px_rgba(34,197,94,0.1)]' : 'shadow-[0_0_15px_rgba(239,68,68,0.1)]';

              return (
                <div 
                  key={clause.clause_id} 
                  className="bg-[#050505] border border-gray-800/80 rounded-xl p-6 md:p-8 flex flex-col gap-8 transition hover:border-gray-700"
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-gray-500 bg-gray-900 px-2 py-0.5 rounded">
                          SEC {clause.clause_id}
                        </span>
                        <h3 className="text-2xl font-semibold text-gray-100 tracking-tight">
                          {clause.clause_name}
                        </h3>
                      </div>
                      <p className="text-gray-400 text-base leading-relaxed max-w-2xl">
                        {clause.plain_language_summary}
                      </p>
                      
                      {/* Stakeholder Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {clause.impacted_stakeholders.map((stakeholder, idx) => (
                          <span 
                            key={idx} 
                            className="px-3 py-1 bg-gray-900/50 border border-gray-800 text-gray-300 text-xs font-medium rounded-full uppercase tracking-wider"
                          >
                            {stakeholder}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Friction Visualizer */}
                    <div className={`flex flex-col items-end justify-center px-8 py-5 rounded-lg border ${accentBorder} ${accentBg} ${accentShadow}`}>
                      <span className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">
                        Approval
                      </span>
                      <span className={`text-4xl font-black tracking-tighter ${accentText}`}>
                        {clause.approval_rating > 0 ? '+' : ''}{clause.approval_rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Balanced Arguments (Split Column) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#0a0a0a] p-5 md:p-6 rounded-lg border border-gray-800/50 flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Argument For</h4>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {clause.friction_analysis.argument_for}
                      </p>
                    </div>
                    <div className="bg-[#0a0a0a] p-5 md:p-6 rounded-lg border border-gray-800/50 flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Argument Against</h4>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {clause.friction_analysis.argument_against}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LegislativeDashboard;
