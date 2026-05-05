export const defaultData = {
  metadata: {
    bill_title: "The Urban Environmental Revitalization Act, 2026",
    overall_status: "Moderate Gridlock Expected",
    ethical_alignment_note: "Prioritizes public health and environmental sustainability for urban populations, but risks compromising property rights and economic stability for targeted commercial entities."
  },
  clauses: [
    {
      clause_id: 1,
      clause_name: "Mandatory Emissions Capping",
      plain_language_summary: "Factories near large cities must cut their carbon pollution by 40% in two years, or pay a penalty of ₹50,000 per day.",
      impacted_stakeholders: ["Manufacturing Facilities", "Urban Residents", "Factory Workers"],
      friction_analysis: {
        argument_for: "Rapidly improves urban air quality and forces high-polluting industries to adopt cleaner practices.",
        argument_against: "The tight 24-month deadline and heavy fines could force factories to shut down, leading to massive job losses."
      },
      approval_rating: 0,
      sim_weight: -3.5,
      color_zone: "Red"
    },
    {
      clause_id: 2,
      clause_name: "Green Tech Subsidy",
      plain_language_summary: "Creates a ₹500 Crore fund to pay for up to 75% of the costs for small businesses switching to completely renewable energy.",
      impacted_stakeholders: ["Small and Medium Enterprises (SMEs)", "Renewable Energy Providers"],
      friction_analysis: {
        argument_for: "Provides critical financial support so smaller businesses can afford the expensive transition to green energy without going bankrupt.",
        argument_against: "Requires a massive allocation of taxpayer money that could drain public resources if not managed efficiently."
      },
      approval_rating: 0,
      sim_weight: 8.5,
      color_zone: "Green"
    },
    {
      clause_id: 3,
      clause_name: "Public Transit Eminent Domain",
      plain_language_summary: "Allows the city government to quickly take over private commercial land to build electric train lines, leaving owners only 30 days to fight the decision.",
      impacted_stakeholders: ["Commercial Property Owners", "Municipal Government", "Daily Commuters"],
      friction_analysis: {
        argument_for: "Speeds up the construction of clean, efficient public transportation by removing long legal delays.",
        argument_against: "Severely limits due process and property rights by giving owners almost no time to fairly challenge the government's takeover of their land."
      },
      approval_rating: 0,
      sim_weight: -6.0,
      color_zone: "Red"
    },
    {
      clause_id: 4,
      clause_name: "High-Density Zoning Mandate",
      plain_language_summary: "Requires tier-1 cities to rezone 20% of single-family neighborhoods to allow high-density apartment complexes.",
      impacted_stakeholders: ["Homeowners", "Renters", "Real Estate Developers"],
      friction_analysis: {
        argument_for: "Increases housing supply near transit hubs, lowering rent and combating urban sprawl.",
        argument_against: "Alters the character of established neighborhoods and strains local infrastructure like schools and parking."
      },
      approval_rating: 0,
      sim_weight: -1.0,
      color_zone: "Yellow"
    },
    {
      clause_id: 5,
      clause_name: "Congestion Pricing Zones",
      plain_language_summary: "Implements a ₹500 daily toll for private vehicles entering the central business district during peak hours.",
      impacted_stakeholders: ["Suburban Commuters", "Delivery Services", "City Treasury"],
      friction_analysis: {
        argument_for: "Effectively reduces traffic congestion, lowers emissions, and funds public transit directly.",
        argument_against: "Disproportionately impacts low-income workers who commute from areas with poor public transportation access."
      },
      approval_rating: 0,
      sim_weight: -4.5,
      color_zone: "Red"
    },
    {
      clause_id: 6,
      clause_name: "Urban Tree Canopy Requirement",
      plain_language_summary: "Mandates that all new commercial developments allocate 15% of their total land area to green space and tree planting.",
      impacted_stakeholders: ["Commercial Developers", "Environmental Groups"],
      friction_analysis: {
        argument_for: "Combats the urban heat island effect, improves air quality, and provides psychological benefits to residents.",
        argument_against: "Reduces the amount of developable space, increasing the overall cost of commercial real estate construction."
      },
      approval_rating: 0,
      sim_weight: 6.5,
      color_zone: "Green"
    },
    {
      clause_id: 7,
      clause_name: "Ban on Retail Single-Use Plastics",
      plain_language_summary: "Outlaws the distribution of non-biodegradable bags, utensils, and packaging in all retail and food establishments.",
      impacted_stakeholders: ["Retailers", "Restaurants", "Consumers"],
      friction_analysis: {
        argument_for: "Massively reduces landfill waste and prevents microplastic pollution in municipal waterways.",
        argument_against: "Increases operational costs for small businesses that must switch to more expensive, eco-friendly alternatives."
      },
      approval_rating: 0,
      sim_weight: 4.0,
      color_zone: "Green"
    },
    {
      clause_id: 8,
      clause_name: "Municipal Solar Mandate",
      plain_language_summary: "Requires all municipal buildings to generate at least 30% of their electricity from rooftop solar panels by 2030.",
      impacted_stakeholders: ["Local Governments", "Solar Contractors", "Taxpayers"],
      friction_analysis: {
        argument_for: "Lowers long-term government utility costs and sets a strong standard for green energy adoption.",
        argument_against: "High upfront installation costs will require a temporary increase in local property taxes to fund the mandate."
      },
      approval_rating: 0,
      sim_weight: 2.0,
      color_zone: "Yellow"
    }
  ]
};

export const demo1Data = {
  metadata: {
    bill_title: "The Constitution (One Hundred and Sixth Amendment) Act, 2023",
    overall_status: "High Gridlock on Implementation Timeline",
    ethical_alignment_note: "Advances gender equity in governance, but faces friction regarding regional demographic representation."
  },
  clauses: [
    {
      clause_id: 1,
      clause_name: "33% Seat Reservation",
      plain_language_summary: "Reserves one-third of seats for women in the Lok Sabha and State Legislative Assemblies.",
      impacted_stakeholders: ["Female Citizens", "Incumbent Politicians"],
      friction_analysis: {
        argument_for: "Ensures proportional gender representation in the highest lawmaking bodies.",
        argument_against: "May disrupt current constituency leadership pipelines abruptly."
      },
      approval_rating: 0,
      sim_weight: 9.0,
      color_zone: "Green"
    },
    {
      clause_id: 2,
      clause_name: "Post-Delimitation Implementation",
      plain_language_summary: "The reservation takes effect only after a delimitation exercise based on the first post-Act census.",
      impacted_stakeholders: ["Southern States", "Election Commission"],
      friction_analysis: {
        argument_for: "Ensures reservations are mapped accurately to updated population data.",
        argument_against: "Delays implementation indefinitely and penalizes states that successfully controlled population growth."
      },
      approval_rating: 0,
      sim_weight: -7.5,
      color_zone: "Red"
    },
    {
      clause_id: 3,
      clause_name: "Sunset Clause (15-Year Limit)",
      plain_language_summary: "The reservation policy will automatically expire 15 years after its commencement unless extended by Parliament.",
      impacted_stakeholders: ["Women Politicians", "Future Legislatures"],
      friction_analysis: {
        argument_for: "Ensures the policy is a temporary affirmative action measure, allowing future review of its necessity once equity is reached.",
        argument_against: "15 years may not be enough time to dismantle deeply entrenched patriarchal structures and build lasting political capital."
      },
      approval_rating: 0,
      sim_weight: 1.5,
      color_zone: "Yellow"
    },
    {
      clause_id: 4,
      clause_name: "Rotation of Reserved Constituencies",
      plain_language_summary: "The specific seats reserved for women will be rotated after each delimitation exercise to prevent permanent exclusion of male candidates in any single constituency.",
      impacted_stakeholders: ["Voters", "Political Parties"],
      friction_analysis: {
        argument_for: "Prevents the monopolization of a constituency and ensures equitable distribution of reserved seats across the country.",
        argument_against: "Discourages long-term constituency nurturing since female leaders know their seat won't be reserved for them in the next cycle."
      },
      approval_rating: 0,
      sim_weight: -2.5,
      color_zone: "Red"
    },
    {
      clause_id: 5,
      clause_name: "Sub-Quota for SC/ST Women",
      plain_language_summary: "Out of the 33% reserved seats, a proportionate sub-quota is mandated specifically for Scheduled Caste and Scheduled Tribe women.",
      impacted_stakeholders: ["Marginalized Communities", "General Category Candidates"],
      friction_analysis: {
        argument_for: "Ensures intersectional representation, preventing upper-caste, economically privileged women from monopolizing the reserved seats.",
        argument_against: "Complicates the electoral math and reduces the general pool of unreserved female seats available to other demographic groups."
      },
      approval_rating: 0,
      sim_weight: 7.0,
      color_zone: "Green"
    },
    {
      clause_id: 6,
      clause_name: "Exclusion of Rajya Sabha",
      plain_language_summary: "The 33% reservation applies only to the directly elected Lok Sabha and State Assemblies, excluding the indirectly elected upper houses.",
      impacted_stakeholders: ["Rajya Sabha Members", "Policy Analysts"],
      friction_analysis: {
        argument_for: "Focuses affirmative action on directly elected bodies where grassroots representation and public accountability matter most.",
        argument_against: "Leaves upper houses heavily male-dominated, limiting female influence over crucial legislative review and amendment processes."
      },
      approval_rating: 0,
      sim_weight: -5.0,
      color_zone: "Red"
    },
    {
      clause_id: 7,
      clause_name: "Nullification of Existing State Quotas",
      plain_language_summary: "Any existing state-level reservations for women in local bodies that exceed 33% will be standardized to match the national 33% cap.",
      impacted_stakeholders: ["State Governments", "Local Panchayat Leaders"],
      friction_analysis: {
        argument_for: "Creates a uniform, nationwide standard for gender reservation across all tiers of governance, avoiding legal inconsistencies.",
        argument_against: "Acts as a regressive step for progressive states that already have 50% reservation for women in local governance bodies."
      },
      approval_rating: 0,
      sim_weight: -8.0,
      color_zone: "Red"
    }
  ],
  official_sources: [
    "https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2112762",
    "https://www.newsonair.gov.in/parliament-budget-session-begins-opposition-protests-against-key-bills/"
  ]
};

export const demo2Data = {
  metadata: {
    bill_title: "The 2020 Indian Agricultural Acts",
    overall_status: "Overwhelming Grassroots Rejection",
    ethical_alignment_note: "Aims for economic deregulation but failed to establish safeguards for economically vulnerable micro-farmers."
  },
  clauses: [
    {
      clause_id: 1,
      clause_name: "The Trade and Commerce Act",
      plain_language_summary: "Allows tax-free private agricultural trade outside the physical premises of government APMC mandis.",
      impacted_stakeholders: ["Small-holder Farmers", "Private Agribusinesses"],
      friction_analysis: {
        argument_for: "Creates a free market, allowing farmers to sell to anyone anywhere, reducing middleman commissions.",
        argument_against: "Threatens the collapse of the APMC system, removing the safety net of government procurement."
      },
      approval_rating: 0,
      sim_weight: -8.5,
      color_zone: "Red"
    },
    {
      clause_id: 2,
      clause_name: "Essential Commodities Amendment",
      plain_language_summary: "Removes stockholding limits on cereals, pulses, and onions for corporate buyers except in extreme circumstances.",
      impacted_stakeholders: ["Consumers", "Corporate Traders"],
      friction_analysis: {
        argument_for: "Encourages massive private investment in cold-storage and supply chain infrastructure.",
        argument_against: "Allows large corporations to legally hoard essential food items, manipulating market prices."
      },
      approval_rating: 0,
      sim_weight: -9.0,
      color_zone: "Red"
    },
    {
      clause_id: 3,
      clause_name: "Contract Farming Framework",
      plain_language_summary: "Creates a national framework allowing farmers to enter into pre-harvest contract farming agreements with agri-business firms.",
      impacted_stakeholders: ["Commercial Farmers", "Corporations"],
      friction_analysis: {
        argument_for: "Provides price certainty to farmers before sowing and guarantees a buyer for their produce, mitigating market risk.",
        argument_against: "Small farmers lack the legal literacy to negotiate fair contracts or defend themselves against massive corporate legal teams."
      },
      approval_rating: 0,
      sim_weight: -6.5,
      color_zone: "Red"
    },
    {
      clause_id: 4,
      clause_name: "Dispute Resolution Mechanism",
      plain_language_summary: "Removes farming contract disputes from the jurisdiction of civil courts, assigning them instead to local Sub-Divisional Magistrates (SDMs).",
      impacted_stakeholders: ["Judiciary", "Farmers in Dispute"],
      friction_analysis: {
        argument_for: "Offers a faster, localized dispute resolution process rather than forcing farmers to spend years in backlogged civil courts.",
        argument_against: "SDMs are government bureaucrats who may be susceptible to corporate influence, depriving farmers of a fair, independent trial."
      },
      approval_rating: 0,
      sim_weight: -7.0,
      color_zone: "Red"
    },
    {
      clause_id: 5,
      clause_name: "Electronic Trading Platforms",
      plain_language_summary: "Authorizes the creation of digital trading platforms for agricultural produce, allowing PAN-card holders to buy directly from farmers online.",
      impacted_stakeholders: ["Agri-Tech Startups", "Rural Farmers"],
      friction_analysis: {
        argument_for: "Integrates modern technology into farming, creating a frictionless national market for produce with transparent pricing.",
        argument_against: "Widens the digital divide, disenfranchising older or rural farmers without reliable internet access or digital literacy."
      },
      approval_rating: 0,
      sim_weight: 2.5,
      color_zone: "Yellow"
    },
    {
      clause_id: 6,
      clause_name: "Abolition of APMC Mandi Tax",
      plain_language_summary: "Prohibits state governments from levying market fees or cesses on agricultural trade occurring outside the designated APMC yards.",
      impacted_stakeholders: ["State Governments", "Commission Agents (Arhtiyas)"],
      friction_analysis: {
        argument_for: "Lowers the ultimate cost for consumers and increases the profit margin for the farmer by removing government taxation on trade.",
        argument_against: "Bankrupts state governments (like Punjab and Haryana) that rely heavily on mandi taxes to fund local rural infrastructure and roads."
      },
      approval_rating: 0,
      sim_weight: -5.5,
      color_zone: "Red"
    },
    {
      clause_id: 7,
      clause_name: "Exemption from State Laws",
      plain_language_summary: "Declares that these central agricultural acts will override any conflicting state-level agricultural or APMC laws.",
      impacted_stakeholders: ["Constitutional Lawyers", "State Legislatures"],
      friction_analysis: {
        argument_for: "Creates a unified, singular national market without varying state-by-state trade barriers or conflicting regulations.",
        argument_against: "Violates the federal structure of the Constitution, as agriculture and local markets are traditionally State subjects."
      },
      approval_rating: 0,
      sim_weight: -8.0,
      color_zone: "Red"
    }
  ],
  official_sources: [
    "https://www.hcifreetown.gov.in/content/1609247570brief.pdf",
    "https://www.indiabudget.gov.in/economicsurvey/ebook_es2021/files/basic-html/page627.html",
    "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1695570"
  ]
};
