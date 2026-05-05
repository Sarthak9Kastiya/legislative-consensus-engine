import React, { useState } from 'react';
import { Calculator, X } from 'lucide-react';
import MathExplanation from './MathExplanation';

const GlobalMathModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-[9999] bg-[#050505] border border-blue-900/50 p-3 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:scale-110 transition-transform group"
        title="Understand Consensus Math"
      >
        <Calculator className="w-6 h-6 text-blue-500 group-hover:text-white transition-colors" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-black border border-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white bg-gray-900 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-8">
              <h2 className="text-2xl font-black text-white mb-6 tracking-tight">The Consensus Algorithm</h2>
              <MathExplanation />
              <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 bg-blue-600 text-white font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Close & Return
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalMathModal;
