import React, { useState } from 'react';
import { Upload, FileText, Settings, Play, ArrowLeft } from 'lucide-react';
import { defaultData, demo1Data, demo2Data } from './dummyData';
import { useNavigate, Link } from 'react-router-dom';
import { savePoll } from './utils';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const AdminPortal = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPoll, setGeneratedPoll] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
      setText(`[PDF Uploaded: ${uploadedFile.name}]`);
    }
  };

  const extractTextFromPDF = async (pdfFile) => {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    return fullText;
  };

  const processBill = async () => {
    if (!text && !file) return;
    
    // Check if it's just a demo trigger
    const content = text.toUpperCase();
    if (content === 'EXECUTE_DEMO_1') {
      setIsLoading(true);
      setTimeout(() => { setGeneratedPoll(demo1Data); setIsLoading(false); }, 1000);
      return;
    }
    if (content === 'EXECUTE_DEMO_2') {
      setIsLoading(true);
      setTimeout(() => { setGeneratedPoll(demo2Data); setIsLoading(false); }, 1000);
      return;
    }

    setIsLoading(true);
    try {
      let documentText = text;
      
      if (file) {
        documentText = await extractTextFromPDF(file);
      }

      const prompt = `
      You are an expert legislative analyst. Analyze the following bill text and generate a structured JSON poll.
      
      Output MUST strictly adhere to this exact JSON schema:
      {
        "metadata": { "bill_title": "string", "overall_status": "string", "ethical_alignment_note": "string" },
        "clauses": [
          { "clause_id": 1, "clause_name": "string", "plain_language_summary": "string", "impacted_stakeholders": ["string"], "friction_analysis": { "argument_for": "string", "argument_against": "string" }, "approval_rating": 0, "color_zone": "Green/Yellow/Red" }
        ]
      }
      
      Extract at least 5 contentious clauses.
      
      Bill Text:
      ${documentText.substring(0, 30000)}
      `;

      const geminiKeys = [
        import.meta.env.VITE_GEMINI_KEY_1,
        import.meta.env.VITE_GEMINI_KEY_2
      ].filter(Boolean);

      const openAiKeys = [
        import.meta.env.VITE_OPENAI_KEY_1,
        import.meta.env.VITE_OPENAI_KEY_2
      ].filter(Boolean);

      const groqKeys = [
        import.meta.env.VITE_GROQ_KEY_1
      ].filter(Boolean);
      
      let generatedData = null;

      // 1. Try all Gemini Keys
      for (const key of geminiKeys) {
        if (generatedData) break;
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { response_mime_type: "application/json" }
            })
          });
          const result = await response.json();
          if (result.error) throw new Error(result.error.message);
          generatedData = JSON.parse(result.candidates[0].content.parts[0].text);
          console.log(`Success with Gemini Key: ${key.substring(0, 10)}...`);
        } catch (err) {
          console.warn(`Gemini Key ${key.substring(0, 10)}... failed:`, err);
        }
      }

      // 2. Try all OpenAI Keys if Gemini failed
      if (!generatedData) {
        for (const key of openAiKeys) {
          if (generatedData) break;
          try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`
              },
              body: JSON.stringify({
                model: 'gpt-4o-mini',
                response_format: { type: "json_object" },
                messages: [
                  { role: 'system', content: 'You are an expert legislative analyst that strictly outputs valid JSON.' },
                  { role: 'user', content: prompt }
                ]
              })
            });
            const result = await response.json();
            if (result.error) throw new Error(result.error.message);
            generatedData = JSON.parse(result.choices[0].message.content);
            console.log(`Success with OpenAI Key: ${key.substring(0, 15)}...`);
          } catch (err) {
            console.warn(`OpenAI Key ${key.substring(0, 15)}... failed:`, err);
          }
        }
      }

      // 3. Try Groq Keys if OpenAI failed
      if (!generatedData) {
        for (const key of groqKeys) {
          if (generatedData) break;
          try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`
              },
              body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                response_format: { type: "json_object" },
                messages: [
                  { role: 'system', content: 'You are an expert legislative analyst that strictly outputs valid JSON.' },
                  { role: 'user', content: prompt }
                ]
              })
            });
            const result = await response.json();
            if (result.error) throw new Error(result.error.message);
            generatedData = JSON.parse(result.choices[0].message.content);
            console.log(`Success with Groq Key: ${key.substring(0, 10)}...`);
          } catch (err) {
            console.warn(`Groq Key ${key.substring(0, 10)}... failed:`, err);
          }
        }
      }

      // 4. Emergency Offline Fallback
      if (!generatedData) {
        console.warn("All API keys (Gemini, OpenAI, Groq) exhausted or rate-limited. Triggering offline fallback...");
        let dataToUse = defaultData;
        const textUpper = documentText.toUpperCase();
        const fileNameUpper = file ? file.name.toUpperCase() : '';
        
        if (textUpper.includes('WOMEN') || fileNameUpper.includes('WOMEN') || textUpper.includes('NARI SHAKTI')) {
          dataToUse = demo1Data;
        } else if (textUpper.includes('FARM') || fileNameUpper.includes('FARM') || textUpper.includes('AGRICULTURAL')) {
          dataToUse = demo2Data;
        }
        
        generatedData = dataToUse;
        alert("Notice: All AI API keys (Gemini, OpenAI, Groq) have exceeded quotas or are rate-limited. The system dynamically engaged the offline simulation engine to ensure your presentation continues seamlessly.");
      }

      setGeneratedPoll(generatedData);

    } catch (err) {
      alert("Error generating poll: " + err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const publishPoll = () => {
    if (!generatedPoll) return;
    const session = localStorage.getItem('adminSession');
    const code = savePoll(generatedPoll, session);
    alert(`Poll published successfully! Share this code with voters: ${code}`);
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans selection:bg-gray-800">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-4 border-b border-gray-800 pb-6">
          <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold tracking-tight">Create New Poll</h1>
          </div>
          <p className="text-gray-400">Upload raw legislative text or a PDF to generate a consensus poll using AI.</p>
        </header>

        {!generatedPoll ? (
          <div className="space-y-6">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-[#0a0a0a] hover:bg-[#111] transition-colors relative">
              <input 
                type="file" 
                accept=".pdf" 
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-10 h-10 text-gray-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-200">Upload PDF Bill</h3>
              <p className="text-sm text-gray-500 mt-2">Drag and drop or click to browse</p>
              {file && <p className="text-green-500 mt-4 font-mono text-sm">{file.name} selected</p>}
            </div>

            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex-1 h-px bg-gray-800"></div>
              <span className="text-xs uppercase font-bold tracking-widest">OR PASTE TEXT</span>
              <div className="flex-1 h-px bg-gray-800"></div>
            </div>

            <textarea
              className="w-full h-48 bg-[#050505] border border-gray-800 rounded-xl p-5 text-sm text-gray-300 focus:outline-none focus:border-gray-500 resize-none placeholder-gray-700"
              placeholder="Paste raw legislative text or demo triggers here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button
              onClick={processBill}
              disabled={isLoading || (!text && !file)}
              className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <span className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-black rounded-full"></span>
              ) : (
                <><Play className="w-4 h-4" /> Generate Poll Questions</>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-[#050505] border border-gray-800 p-6 rounded-xl space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-500" />
                AI Extraction Complete
              </h2>
              <p className="text-sm text-gray-400">Review the isolated clauses below before publishing to the voter pool.</p>
              
              <div className="space-y-4 mt-4">
                {generatedPoll.clauses.map((clause, idx) => (
                  <div key={idx} className="bg-[#0a0a0a] p-4 rounded-lg border border-gray-800">
                    <h3 className="text-sm font-bold text-gray-200">Clause {clause.clause_id}: {clause.clause_name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{clause.plain_language_summary}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setGeneratedPoll(null)}
                className="flex-1 py-4 bg-gray-900 text-white font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-gray-800 transition-colors border border-gray-700"
              >
                Discard
              </button>
              <button 
                onClick={publishPoll}
                className="flex-1 py-4 bg-blue-600 text-white font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-blue-500 transition-colors"
              >
                Publish Poll
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPortal;
