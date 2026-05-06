Vercel link: https://legislative-consensus-engine-final.vercel.app/

# Legislative Consensus Engine

The Legislative Consensus Engine is a mediation platform designed to facilitate transparent communication between governing bodies and the public. By utilizing advanced natural language processing and objective mathematical modeling, the system translates complex legislative text into accessible, data-driven frameworks for civic engagement.

## Core Architectural Pillars

### Technical Resilience via Multi-Provider Failover
To maintain operational continuity, the engine utilizes a redundant API orchestration layer. The system is configured to rotate through multiple Large Language Model providers—including Google Gemini, OpenAI, and Groq—ensuring that legislative analysis remains available even during provider outages or rate-limiting events. A deterministic simulation engine serves as a final fallback layer to maintain system integrity.

### Mathematical Objectivity and Bias Mitigation
A primary design objective was the elimination of algorithmic bias. The platform calculates consensus scores using a pure arithmetic average of human sentiment. Every vote is weighted equally on a scale from -10.0 to +10.0, providing a direct and unfiltered reflection of public opinion without interference from AI-generated base scores.

### Strategic Friction Visualization
The system identifies and categorizes legislative clauses into distinct friction zones. By visualizing these data points, policy-makers can identify specific provisions that may require revision to achieve broader public support, effectively bridging the gap between legislative intent and public acceptance.

## Technical Specification

### Tech Stack
- Frontend: React 18 with Vite
- Styling: Tailwind CSS
- Document Processing: PDF.js
- Integration: Direct API orchestration with environmental variable security

### Consensus Calculation Methodology
The final score for any given legislation is derived from the mean approval rating of its individual clauses. This ensures that the overall bill score is a true aggregate of specific public feedback rather than a generalized sentiment.

## Implementation Guide

### Installation
1. Clone the repository to your local environment.
2. Navigate to the application directory: `cd app`
3. Install necessary dependencies: `npm install`
4. Configure your credentials by creating a `.env` file in the application directory with the following keys:
   - VITE_GEMINI_KEY_1
   - VITE_OPENAI_KEY_1
   - VITE_GROQ_KEY_1
5. Initialize the development environment: `npm run dev`

## Operational Workflow

### Administrative Functions
Administrators can process raw legislative text or PDF documents. The engine isolates key clauses and generates plain-language summaries for voter review. Administrative users also have the ability to seed the environment with sample data to demonstrate system capabilities.

### Voter Interaction
Participants access specific polls via a secure access code. The interface presents simplified summaries of complex legal clauses, allowing users to provide direct feedback. Once feedback is collected, the system provides a comprehensive friction map and strategic inferences to assist in legislative refinement.
