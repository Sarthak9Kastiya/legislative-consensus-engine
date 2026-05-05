export const generateCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const getPolls = () => {
  const polls = localStorage.getItem('polls');
  return polls ? JSON.parse(polls) : [];
};

export const savePoll = (pollData, adminUsername = 'system') => {
  const polls = getPolls();
  const code = generateCode();
  const newPoll = { 
    ...pollData, 
    pollCode: code, 
    createdAt: new Date().toISOString(), 
    votes: [], 
    isResultsPublished: false,
    createdBy: adminUsername
  };
  polls.push(newPoll);
  localStorage.setItem('polls', JSON.stringify(polls));
  return code;
};

export const togglePollVisibility = (code) => {
  const polls = getPolls();
  const pollIndex = polls.findIndex(p => p.pollCode === code);
  if (pollIndex > -1) {
    polls[pollIndex].isResultsPublished = !polls[pollIndex].isResultsPublished;
    localStorage.setItem('polls', JSON.stringify(polls));
  }
};

export const deletePoll = (code) => {
  let polls = getPolls();
  polls = polls.filter(p => p.pollCode !== code);
  localStorage.setItem('polls', JSON.stringify(polls));
};

export const recalculatePollScores = (poll) => {
  if (!poll.original_clauses) {
    poll.original_clauses = JSON.parse(JSON.stringify(poll.clauses));
  }
  
  const totalVotes = poll.votes.length;
  if (totalVotes === 0) return poll;

  poll.clauses = poll.clauses.map((clause, idx) => {
    const originalScore = poll.original_clauses[idx].approval_rating;
    
    let yesVotes = 0;
    let neutralVotes = 0;
    let noVotes = 0;
    
    poll.votes.forEach(v => {
      const val = v[clause.clause_id];
      if (val === 1) yesVotes++;
      else if (val === 0) neutralVotes++;
      else if (val === -1) noVotes++;
    });

    const publicSentiment = ((yesVotes * 10) + (neutralVotes * 0) + (noVotes * -10)) / totalVotes;
    
    // Formula: 100% Public Sentiment (Unweighted Average)
    const newScore = publicSentiment;
    
    return {
      ...clause,
      approval_rating: Number(newScore.toFixed(1)),
      color_zone: newScore >= 0 ? "Green" : "Red",
      vote_distribution: { yes: yesVotes, neutral: neutralVotes, no: noVotes }
    };
  });

  return poll;
}

export const updatePollVotes = (code, userVotes) => {
  const polls = getPolls();
  const pollIndex = polls.findIndex(p => p.pollCode === code);
  if (pollIndex === -1) return null;
  
  let poll = polls[pollIndex];
  poll.votes.push(userVotes);
  
  poll = recalculatePollScores(poll);
  
  polls[pollIndex] = poll;
  localStorage.setItem('polls', JSON.stringify(polls));
  return poll;
};

export const simulateThousandVotes = (code) => {
  const polls = getPolls();
  const pollIndex = polls.findIndex(p => p.pollCode === code);
  if (pollIndex === -1) return null;
  
  let poll = polls[pollIndex];
  if (!poll.original_clauses) {
      poll.original_clauses = JSON.parse(JSON.stringify(poll.clauses));
  }

  // Generate 1000 votes
  for (let i = 0; i < 1000; i++) {
    const randomVote = {};
    poll.clauses.forEach(clause => {
      const origClause = poll.original_clauses.find(c => c.clause_id === clause.clause_id);
      const simWeight = origClause.sim_weight !== undefined ? origClause.sim_weight : 0;
      
      const probabilityOfYes = (simWeight + 10) / 20; 
      
      const rand = Math.random();
      let voteVal;
      if (rand < probabilityOfYes * 0.8) {
         voteVal = 1;
      } else if (rand > (1 - ((1 - probabilityOfYes) * 0.8))) {
         voteVal = -1;
      } else {
         voteVal = 0;
      }
      randomVote[clause.clause_id] = voteVal;
    });
    poll.votes.push(randomVote);
  }

  poll = recalculatePollScores(poll);
  polls[pollIndex] = poll;
  localStorage.setItem('polls', JSON.stringify(polls));
  return poll;
};

export const getPollByCode = (code) => {
  const polls = getPolls();
  return polls.find(p => p.pollCode === code) || null;
};

// Auth Functions
export const registerUser = (type, userData) => {
  const key = type === 'admin' ? 'adminUsers' : 'voterUsers';
  const users = JSON.parse(localStorage.getItem(key) || '[]');
  if (users.find(u => u.username === userData.username)) return false; // Already exists
  users.push(userData);
  localStorage.setItem(key, JSON.stringify(users));
  return true;
};

export const loginUser = (type, username, password) => {
  const key = type === 'admin' ? 'adminUsers' : 'voterUsers';
  const users = JSON.parse(localStorage.getItem(key) || '[]');
  return users.some(u => u.username === username && u.password === password);
};
