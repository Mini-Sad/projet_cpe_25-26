import React, { useState } from 'react';
// Assuming these icons are from 'lucide-react' or a similar library
import {
  Search, MapPin, GraduationCap, Clock, Star, Users, Briefcase, MessageSquare, Menu, X, Check, ChevronRight, Heart, Send, Camera, Target, Sparkles, User
} from 'lucide-react';

// ==================== PLACEHOLDER DATA ====================

const STUDENT_PROFILE = {
  id: 1,
  name: "Alexandre Dupont",
  photo: "https://i.pravatar.cc/150?img=61",
  program: "M2 Ingénierie des Systèmes d'Information",
  school: "CentraleSupélec",
  graduationYear: 2026,
  personalityType: "Innovateur Analytique (INTJ)",
  personalityTraits: {
    autonomie: 90,
    créativité: 85,
    analytique: 92,
    collaboration: 65,
  },
  goals: [
    "Devenir Product Manager dans la Tech",
    "Travailler dans une scale-up en forte croissance",
    "Gagner en leadership technique",
  ],
  interests: ["Product Management", "Data Science", "Cloud Computing", "AI/ML"],
  mentorConnections: {
    active: 7,
    limit: 10,
    remaining: 3,
  },
};

const MENTORS = [
  {
    id: 1,
    name: "Clara Dubois",
    title: "Product Manager Senior",
    company: "Datadog",
    industry: "Tech",
    photo: "https://i.pravatar.cc/150?img=49",
    location: "Paris, France",
    school: "HEC Paris",
    availability: "Mois prochain",
    menteeCount: 12,
    bio: "Ex-ingénieure chez Google, je suis passée au Product Management. J'adore aider les étudiants à naviguer dans les carrières en Tech et à préparer leurs entretiens en PM. Forte expertise en Cloud et Data.",
    expertise: ["Product Strategy", "Cloud Technologies", "Startup Scaling", "Recrutement PM"],
    matchScore: { overall: 91, personality: 90, goals: 95, background: 88, expertise: 92 },
  },
  {
    id: 2,
    name: "Marc Lefevre",
    title: "Consultant Senior",
    company: "Bain & Company",
    industry: "Conseil",
    photo: "https://i.pravatar.cc/150?img=52",
    location: "Londres, UK",
    school: "École Polytechnique",
    availability: "Cette semaine",
    menteeCount: 7,
    bio: "Spécialisé en stratégie de croissance pour les entreprises du secteur de la Finance. Je propose des sessions de préparation aux case studies et des conseils de carrière en conseil.",
    expertise: ["Case Studies", "Financial Services", "Corporate Strategy", "M&A"],
    matchScore: { overall: 85, personality: 80, goals: 88, background: 90, expertise: 82 },
  },
  {
    id: 3,
    name: "Sophie Garcia",
    title: "Analyste Financière",
    company: "Goldman Sachs",
    industry: "Finance",
    photo: "https://i.pravatar.cc/150?img=40",
    location: "New York, US",
    school: "ESSEC Business School",
    availability: "Semaine prochaine",
    menteeCount: 9,
    bio: "Passionnée par les marchés financiers et l'investissement. J'aide les étudiants intéressés par la banque d'investissement et la gestion d'actifs.",
    expertise: ["Investment Banking", "Valuation", "Financial Modeling", "Public Speaking"],
    matchScore: { overall: 78, personality: 75, goals: 82, background: 79, expertise: 75 },
  },
  {
    id: 4,
    name: "Thomas Bernard",
    title: "Chef de Projet Digital",
    company: "L'Oréal",
    industry: "Luxe & Beauté",
    photo: "https://i.pravatar.cc/150?img=63",
    location: "Paris, France",
    school: "EM Lyon",
    availability: "Ce mois-ci",
    menteeCount: 5,
    bio: "Mon parcours dans la transformation digitale des marques de luxe. Je peux t'aider sur le marketing digital et la gestion de projet en environnement international.",
    expertise: ["Digital Marketing", "Project Management", "E-commerce Strategy", "Brand Building"],
    matchScore: { overall: 65, personality: 70, goals: 60, background: 68, expertise: 62 },
  },
];

const JOBS = [
  {
    id: 1,
    title: "Stage Product Manager",
    company: "Datadog",
    type: "Stage",
    location: "Paris",
    remote: "Hybride",
    duration: "6 mois",
    postedDate: "2 jours",
    salary: "1500€ / mois",
    description: "Rejoignez l'équipe Cloud Monitoring et travaillez sur l'amélioration de l'expérience utilisateur de nos dashboards. Un rôle très exposé avec un fort impact.",
    requirements: ["Expérience en dev/design", "Passion pour la data", "Bilingue Anglais"],
    matchScore: { overall: 93, skills: 95, culture: 90, goals: 94 },
    whyMatch: [
      "Correspondance forte avec ton objectif de carrière en Product Management.",
      "L'expertise en Cloud Computing est un atout majeur pour cette entreprise.",
      "Le score de 95% en compétences indique une adéquation parfaite avec les pré-requis techniques.",
    ],
  },
  {
    id: 2,
    title: "CDI Consultant Stratégie",
    company: "McKinsey & Company",
    type: "CDI",
    location: "Bruxelles",
    remote: "Sur site",
    duration: null,
    postedDate: "1 semaine",
    salary: "85k - 100k€ / an",
    description: "Accompagnez nos clients C-level dans leurs problématiques stratégiques les plus complexes.",
    requirements: ["Top École de Commerce/Ingénieur", "Excellentes capacités analytiques", "Français/Anglais courant"],
    matchScore: { overall: 80, skills: 75, culture: 85, goals: 82 },
    whyMatch: [
      "Bonne adéquation avec tes compétences analytiques (92% sur ton profil).",
      "Opportunité dans un secteur hautement stimulant qui correspond à tes aspirations.",
    ],
  },
  {
    id: 3,
    title: "Alternance Data Analyst",
    company: "BNP Paribas",
    type: "Alternance",
    location: "Paris",
    remote: "Hybride",
    duration: "1 an",
    postedDate: "3 jours",
    salary: "Salaire légal",
    description: "Travaillez au sein de l'équipe R&D pour modéliser et prédire les tendances du marché.",
    requirements: ["Maîtrise de Python/R", "Connaissances en Finance", "Rigoureux"],
    matchScore: { overall: 70, skills: 80, culture: 65, goals: 75 },
    whyMatch: [
      "Tes intérêts incluent la Data Science, qui est au cœur de cette mission.",
      "Le poste offre une première expérience dans le secteur de la Finance, correspondant à un de tes domaines d'intérêt.",
    ],
  },
];

const MESSAGES = [
  {
    id: 1,
    mentor: "Clara Dubois",
    company: "Datadog",
    photo: "https://i.pravatar.cc/150?img=49",
    lastMessage: "Absolument ! Je suis libre jeudi après-midi. Dis-moi si ça te convient.",
    timestamp: "Il y a 2h",
    unread: true,
  },
  {
    id: 2,
    mentor: "Marc Lefevre",
    company: "Bain & Company",
    photo: "https://i.pravatar.cc/150?img=52",
    lastMessage: "Nous pouvons commencer à préparer le cas Carrefour la semaine prochaine.",
    timestamp: "Hier",
    unread: false,
  },
  {
    id: 3,
    mentor: "Sophie Garcia",
    company: "Goldman Sachs",
    photo: "https://i.pravatar.cc/150?img=40",
    lastMessage: "J'ai lu ton CV, impressionnant ! Quel est ton objectif principal pour notre session ?",
    timestamp: "Il y a 3 jours",
    unread: false,
  },
];


// ==================== STUB COMPONENTS ====================
// These components are needed to make the rest of the code work, 
// as their implementations were not provided.

const Button = ({ children, onClick, variant = 'primary', size = 'medium', className = '', icon: Icon, disabled = false }) => {
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors';
  const sizeStyle = size === 'large' ? 'px-6 py-3 text-base' : size === 'small' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-sm';
  
  let colorStyle = '';
  if (disabled) {
    colorStyle = 'bg-gray-300 text-gray-500 cursor-not-allowed';
  } else if (variant === 'primary') {
    colorStyle = 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md';
  } else if (variant === 'outline') {
    colorStyle = 'bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50';
  } else if (variant === 'ghost') {
    colorStyle = 'bg-transparent text-gray-600 hover:bg-gray-100';
  }

  return (
    <button
      onClick={!disabled ? onClick : null}
      className={`${baseStyle} ${sizeStyle} ${colorStyle} ${className}`}
      disabled={disabled}
    >
      {Icon && <Icon size={18} className={children ? 'mr-2' : ''} />}
      {children}
    </button>
  );
};

const Badge = ({ children, color = 'primary', size = 'small', className = '' }) => {
  const baseStyle = 'inline-flex items-center font-medium rounded-full';
  const sizeStyle = size === 'medium' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs';

  let colorStyle = '';
  switch (color) {
    case 'primary':
      colorStyle = 'bg-indigo-100 text-indigo-800';
      break;
    case 'secondary':
      colorStyle = 'bg-pink-100 text-pink-800';
      break;
    case 'warning':
      colorStyle = 'bg-amber-100 text-amber-800';
      break;
    case 'gray':
      colorStyle = 'bg-gray-100 text-gray-600';
      break;
    default:
      colorStyle = 'bg-indigo-100 text-indigo-800';
  }

  return (
    <span className={`${baseStyle} ${sizeStyle} ${colorStyle} ${className}`}>
      {children}
    </span>
  );
};

const MatchScore = ({ score, size = 'medium' }) => {
  const radius = size === 'large' ? 40 : 25;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`relative flex items-center justify-center ${size === 'large' ? 'w-24 h-24' : 'w-16 h-16'}`}>
      <svg
        height={radius * 2}
        width={radius * 2}
        className="-rotate-90"
      >
        <circle
          stroke="#e5e7eb" // gray-200
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#4f46e5" // indigo-600
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
        />
      </svg>
      <span className={`absolute font-bold text-gray-800 ${size === 'large' ? 'text-2xl' : 'text-xl'}`}>
        {score}%
      </span>
    </div>
  );
};

const MentorCard = ({ mentor, onClick }) => (
  <div onClick={onClick} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex justify-end">
      <MatchScore score={mentor.matchScore.overall} size="small" />
    </div>
    <div className="flex items-center gap-4 mb-3 -mt-6">
      <img src={mentor.photo} alt={mentor.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow" />
      <div>
        <h4 className="font-semibold text-lg">{mentor.name}</h4>
        <p className="text-sm text-gray-600">{mentor.title}</p>
      </div>
    </div>
    <p className="text-sm text-indigo-600 font-medium mb-2">{mentor.company}</p>
    <div className="flex flex-wrap gap-2">
      <Badge color="gray">{mentor.industry}</Badge>
      <Badge color="gray" size="tiny">{mentor.location}</Badge>
    </div>
  </div>
);

const JobCard = ({ job, onClick }) => (
  <div onClick={onClick} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex justify-between items-start">
        <div>
            <h4 className="font-semibold text-xl mb-1 text-gray-900">{job.title}</h4>
            <p className="text-indigo-600 font-medium mb-3">{job.company}</p>
            <div className="flex flex-wrap gap-2">
                <Badge color="primary">{job.type}</Badge>
                <Badge color="gray">{job.location}</Badge>
            </div>
        </div>
        <MatchScore score={job.matchScore.overall} size="small" />
    </div>
    <div className="mt-4 pt-3 border-t text-sm text-gray-600 flex justify-between items-center">
        <span>Publié il y a {job.postedDate}</span>
        <span className="text-green-600 font-bold">{job.salary}</span>
    </div>
  </div>
);

const Landing = ({ onStart }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-pink-500">
    <div className="text-center text-white p-8">
      <Sparkles className="mx-auto w-16 h-16 mb-4" />
      <h1 className="text-5xl font-extrabold mb-4">TalentMatch</h1>
      <p className="text-xl mb-8">Trouve ton mentor idéal et ton opportunité de carrière parfaite.</p>
      <Button onClick={onStart} size="large" className="bg-white text-indigo-600 hover:bg-gray-100 shadow-xl">
        Démarrer l'expérience
      </Button>
    </div>
  </div>
);


// ==================== PAGE COMPONENTS (from user input) ====================

const Dashboard = ({ onNavigate }) => {
  const topMentor = MENTORS.find(m => m.matchScore.overall === Math.max(...MENTORS.map(m => m.matchScore.overall)));
  const topJob = JOBS.find(j => j.matchScore.overall === Math.max(...JOBS.map(j => j.matchScore.overall)));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">👋 Bonjour {STUDENT_PROFILE.name.split(' ')[0]}, prêt à avancer ?</h1>
      <p className="text-gray-600 mb-8">Voici tes recommandations personnalisées pour aujourd'hui.</p>

      {/* Raccourcis */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:ring-2 hover:ring-indigo-200 transition-shadow cursor-pointer" onClick={() => onNavigate('mentors')}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xl">Trouver un Mentor</h3>
            <Users className="text-indigo-500" size={24} />
          </div>
          <p className="text-gray-600 mt-2">Accède à {MENTORS.length} profils de mentors qualifiés.</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:ring-2 hover:ring-2 hover:ring-indigo-200 transition-shadow cursor-pointer" onClick={() => onNavigate('opportunities')}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xl">Explorer les Jobs</h3>
            <Briefcase className="text-pink-500" size={24} />
          </div>
          <p className="text-gray-600 mt-2">Découvre {JOBS.length} opportunités qui matchent ton profil.</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:ring-2 hover:ring-2 hover:ring-indigo-200 transition-shadow cursor-pointer" onClick={() => onNavigate('profile')}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xl">Voir Mon Profil</h3>
            <User className="text-teal-500" size={24} />
          </div>
          <p className="text-gray-600 mt-2">Score de personnalité: {STUDENT_PROFILE.personalityTraits.analytique}% Analytique</p>
        </div>
      </div>
      
      {/* Top Recommandation Mentor */}
      <h2 className="text-2xl font-bold mb-4">✨ Ta meilleure Recommandation Mentor</h2>
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 shadow-md border-indigo-200 border mb-8 flex items-center justify-between">
        <div className="flex items-start gap-4">
          <img src={topMentor.photo} alt={topMentor.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow" />
          <div>
            <h3 className="text-xl font-bold">{topMentor.name}</h3>
            <p className="text-lg text-gray-700">{topMentor.title} chez <span className="text-indigo-600 font-medium">{topMentor.company}</span></p>
            <Badge color="primary" className="mt-2">{topMentor.industry}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <MatchScore score={topMentor.matchScore.overall} size="large" />
          <Button size="large" onClick={() => onNavigate('mentor', topMentor.id)}>
            Voir le profil
          </Button>
        </div>
      </div>

      {/* Top Recommandation Job */}
      <h2 className="text-2xl font-bold mb-4">🎯 L'Opportunité Faite pour Toi</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <JobCard job={topJob} onClick={() => onNavigate('job', topJob.id)} />
        {JOBS.filter(j => j.id !== topJob.id).slice(0, 2).map(job => (
          <JobCard key={job.id} job={job} onClick={() => onNavigate('job', job.id)} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="ghost" onClick={() => onNavigate('opportunities')}>
          Voir toutes les {JOBS.length} opportunités →
        </Button>
      </div>

      {/* Connexions restantes */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-10">
        <h2 className="text-xl font-bold mb-4">Statut de tes Connexions Mentors</h2>
        <div className="flex items-center justify-between">
          <span className="text-lg text-gray-700">
            Utilisées cette année : **{STUDENT_PROFILE.mentorConnections.active}/{STUDENT_PROFILE.mentorConnections.limit}**
          </span>
          <Badge color="warning" size="medium">
            {STUDENT_PROFILE.mentorConnections.remaining} restantes
          </Badge>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden mt-3">
          <div
            className="h-full bg-indigo-600"
            style={{width: `${(STUDENT_PROFILE.mentorConnections.active / STUDENT_PROFILE.mentorConnections.limit) * 100}%`}}
          />
        </div>
      </div>
    </div>
  );
};


const MentorsPage = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  
  const filteredMentors = MENTORS.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              mentor.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || mentor.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Mentors</h1>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-amber-800">
              <strong>{STUDENT_PROFILE.mentorConnections.active}/{STUDENT_PROFILE.mentorConnections.limit}</strong> connexions mentors utilisées cette année
            </span>
            <Badge color="warning">{STUDENT_PROFILE.mentorConnections.remaining} restantes</Badge>
          </div>
        </div>
      </div>
      
      <div className="flex gap-6">
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 sticky top-6">
            <h3 className="font-semibold mb-3">Filtres</h3>
            
            <div className="mb-4">
              <label className="text-sm text-gray-600 mb-2 block">Rechercher</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Nom ou entreprise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="text-sm text-gray-600 mb-2 block">Industrie</label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Toutes</option>
                <option value="Tech">Tech</option>
                <option value="Conseil">Conseil</option>
                <option value="Finance">Finance</option>
                <option value="Luxe & Beauté">Luxe & Beauté</option>
              </select>
            </div>
            
            {(searchTerm || selectedIndustry !== 'all') && (
              <Button 
                variant="ghost" 
                size="small" 
                onClick={() => { setSearchTerm(''); setSelectedIndustry('all'); }}
                className="w-full"
              >
                Effacer les filtres
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="mb-4 text-sm text-gray-600">
            {filteredMentors.length} mentor{filteredMentors.length > 1 ? 's' : ''} trouvé{filteredMentors.length > 1 ? 's' : ''}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMentors.map(mentor => (
              <MentorCard key={mentor.id} mentor={mentor} onClick={() => onNavigate('mentor', mentor.id)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MentorProfile = ({ mentorId, onNavigate }) => {
  const mentor = MENTORS.find(m => m.id === mentorId);
  const [showBreakdown, setShowBreakdown] = useState(false);
  
  if (!mentor) return <div className="p-6">Mentor non trouvé</div>;
  
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl p-8 mb-6">
        <button 
          onClick={() => onNavigate('mentors')}
          className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-1"
        >
          ← Retour aux mentors
        </button>
        
        <div className="flex items-start gap-6">
          <img src={mentor.photo} alt={mentor.name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{mentor.name}</h1>
            <p className="text-xl text-gray-700 mb-1">{mentor.title}</p>
            <p className="text-lg text-indigo-600 font-medium mb-3">{mentor.company}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge color="gray" size="small">
                <MapPin size={12} className="inline mr-1" />
                {mentor.location}
              </Badge>
              <Badge color="gray" size="small">
                <GraduationCap size={12} className="inline mr-1" />
                {mentor.school}
              </Badge>
              <Badge color="gray" size="small">
                <Clock size={12} className="inline mr-1" />
                {mentor.availability}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Star className="text-amber-400 fill-current" size={16} />
              <span className="text-sm text-gray-600">{mentor.menteeCount} étudiants accompagnés</span>
            </div>
          </div>
          
          <div className="text-center">
            <div 
              className="cursor-pointer"
              onClick={() => setShowBreakdown(!showBreakdown)}
            >
              <MatchScore score={mentor.matchScore.overall} size="large" />
              <p className="text-sm text-gray-600 mt-2">Voir détails</p>
            </div>
          </div>
        </div>
      </div>
      
      {showBreakdown && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowBreakdown(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-6">Détails du Match</h3>
            
            {[
              { label: 'Personnalité', score: mentor.matchScore.personality, color: 'indigo' },
              { label: 'Objectifs carrière', score: mentor.matchScore.goals, color: 'pink' },
              { label: 'Background', score: mentor.matchScore.background, color: 'teal' },
              { label: 'Expertise', score: mentor.matchScore.expertise, color: 'purple' }
            ].map((item, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-sm font-bold">{item.score}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
            
            <Button onClick={() => setShowBreakdown(false)} className="w-full mt-4">
              Fermer
            </Button>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-bold mb-4">À propos</h2>
        <p className="text-gray-700 mb-6">{mentor.bio}</p>
        
        <h3 className="font-semibold mb-3">Expertise</h3>
        <div className="flex flex-wrap gap-2">
          {mentor.expertise.map((exp, i) => (
            <Badge key={i} color="primary">{exp}</Badge>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        {STUDENT_PROFILE.mentorConnections.remaining > 0 ? (
          <>
            <h3 className="font-semibold mb-2">Prêt à te connecter ?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Il te reste {STUDENT_PROFILE.mentorConnections.remaining} connexions pour cette année.
            </p>
            <Button size="large" className="w-full md:w-auto">
              Demander un mentorat
            </Button>
          </>
        ) : (
          <>
            <h3 className="font-semibold mb-2">Limite atteinte</h3>
            <p className="text-sm text-gray-600 mb-4">
              Tu as utilisé tes {STUDENT_PROFILE.mentorConnections.limit} connexions pour cette année. Reviens en 2026 !
            </p>
            <Button size="large" variant="outline" className="w-full md:w-auto" disabled>
              Limite atteinte ({STUDENT_PROFILE.mentorConnections.active}/{STUDENT_PROFILE.mentorConnections.limit})
            </Button>
          </>
        )}
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Tu pourrais aussi aimer</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {MENTORS.filter(m => m.id !== mentor.id && m.industry === mentor.industry).slice(0, 3).map(m => (
            <MentorCard key={m.id} mentor={m} onClick={() => onNavigate('mentor', m.id)} />
          ))}
        </div>
      </div>
    </div>
  );
};



const OpportunitiesPage = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  
  const filteredJobs = JOBS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || job.type === selectedType;
    return matchesSearch && matchesType;
  });
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Opportunités</h1>
        <p className="text-gray-600">Découvre les postes qui correspondent à ton profil</p>
      </div>
      
      <div className="flex gap-6">
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 sticky top-6">
            <h3 className="font-semibold mb-3">Filtres</h3>
            
            <div className="mb-4">
              <label className="text-sm text-gray-600 mb-2 block">Rechercher</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Poste ou entreprise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="text-sm text-gray-600 mb-2 block">Type de poste</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Tous</option>
                <option value="Stage">Stage</option>
                <option value="CDI">CDI</option>
                <option value="Alternance">Alternance</option>
              </select>
            </div>
            
            {(searchTerm || selectedType !== 'all') && (
              <Button 
                variant="ghost" 
                size="small" 
                onClick={() => { setSearchTerm(''); setSelectedType('all'); }}
                className="w-full"
              >
                Effacer les filtres
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="mb-4 text-sm text-gray-600">
            {filteredJobs.length} opportunité{filteredJobs.length > 1 ? 's' : ''} trouvée{filteredJobs.length > 1 ? 's' : ''}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} onClick={() => onNavigate('job', job.id)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const JobDetail = ({ jobId, onNavigate }) => {
  const job = JOBS.find(j => j.id === jobId);
  
  if (!job) return <div className="p-6">Offre non trouvée</div>;
  
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button 
        onClick={() => onNavigate('opportunities')}
        className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-1"
      >
        ← Retour aux opportunités
      </button>
      
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
            <p className="text-xl text-indigo-600 font-medium mb-3">{job.company}</p>
            <div className="flex flex-wrap gap-2">
              <Badge color="primary">{job.type}</Badge>
              <Badge color="gray">{job.location}</Badge>
              <Badge color="gray">{job.remote}</Badge>
              {job.duration && <Badge color="gray">{job.duration}</Badge>}
            </div>
          </div>
          <MatchScore score={job.matchScore.overall} size="large" />
        </div>
        
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <MapPin size={16} /> {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={16} /> Publié le {job.postedDate}
          </span>
          <span className="text-green-600 font-semibold text-base">{job.salary}</span>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 mb-6 border border-green-200">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Check className="text-green-600" />
          Pourquoi ce poste te correspond
        </h2>
        <div className="space-y-3">
          {job.whyMatch.map((reason, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="text-white" size={16} />
              </div>
              <p className="text-gray-700">{reason}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-green-200">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Compétences', score: job.matchScore.skills },
              { label: 'Culture', score: job.matchScore.culture },
              { label: 'Objectifs', score: job.matchScore.goals }
            ].map((item, i) => (
              <div key={i}>
                <div className="text-sm text-gray-600 mb-1">{item.label}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{width: `${item.score}%`}} />
                  </div>
                  <span className="text-sm font-bold">{item.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-bold mb-4">Description du poste</h2>
        <p className="text-gray-700 mb-6">{job.description}</p>
        
        <h3 className="font-semibold mb-3">Ce que tu vas faire</h3>
        <ul className="space-y-2 mb-6">
          <li className="flex items-start gap-2">
            <ChevronRight className="text-indigo-600 flex-shrink-0 mt-0.5" size={20} />
            <span className="text-gray-700">Travailler sur des fonctionnalités impactant des milliers d'utilisateurs</span>
          </li>
          <li className="flex items-start gap-2">
            <ChevronRight className="text-indigo-600 flex-shrink-0 mt-0.5" size={20} />
            <span className="text-gray-700">Collaborer avec des équipes cross-fonctionnelles</span>
          </li>
          <li className="flex items-start gap-2">
            <ChevronRight className="text-indigo-600 flex-shrink-0 mt-0.5" size={20} />
            <span className="text-gray-700">Participer aux décisions produit stratégiques</span>
          </li>
        </ul>
        
        <h3 className="font-semibold mb-3">Profil recherché</h3>
        <div className="flex flex-wrap gap-2">
          {job.requirements.map((req, i) => (
            <Badge key={i} color="gray">{req}</Badge>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold mb-1">Prêt à postuler ?</h3>
          <p className="text-sm text-gray-600">Connecte-toi avec un mentor {job.company} avant de candidater</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Heart}>
            Sauvegarder
          </Button>
          <Button size="large" icon={Send}>
            Postuler
          </Button>
        </div>
      </div>
    </div>
  );
};


const MessagesPage = () => {
  const [selectedMessage, setSelectedMessage] = useState(MESSAGES[0]);
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      
      <div className="flex gap-4 h-[600px]">
        <div className="w-80 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="p-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Conversations Actives</h3>
              {MESSAGES.map(msg => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-3 rounded-lg cursor-pointer mb-2 transition-colors ${
                    selectedMessage.id === msg.id ? 'bg-indigo-50 border border-indigo-200' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img src={msg.photo} alt={msg.mentor} className="w-12 h-12 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm truncate">{msg.mentor}</h4>
                        {msg.unread && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{msg.company}</p>
                      <p className="text-sm text-gray-600 truncate">{msg.lastMessage}</p>
                      <p className="text-xs text-gray-400 mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-4 border-b flex items-center gap-3">
            <img src={selectedMessage.photo} alt={selectedMessage.mentor} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <h3 className="font-semibold">{selectedMessage.mentor}</h3>
              <p className="text-sm text-gray-600">{selectedMessage.company}</p>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              <div className="flex justify-center">
                <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
                  {selectedMessage.mentor} a accepté ta demande de mentorat
                </span>
              </div>
              
              <div className="flex gap-2">
                <img src={selectedMessage.photo} alt="" className="w-8 h-8 rounded-full" />
                <div className="bg-white rounded-2xl rounded-tl-none p-3 max-w-md shadow-sm">
                  <p className="text-sm">{selectedMessage.lastMessage}</p>
                  <span className="text-xs text-gray-400 mt-1 block">Il y a 2h</span>
                </div>
              </div>
              
              <div className="flex gap-2 justify-end">
                <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-none p-3 max-w-md shadow-sm">
                  <p className="text-sm">Merci beaucoup ! Je serais ravi d'en apprendre plus sur ton parcours chez Datadog.</p>
                  <span className="text-xs text-indigo-200 mt-1 block">Il y a 1h</span>
                </div>
                <img src={STUDENT_PROFILE.photo} alt="" className="w-8 h-8 rounded-full" />
              </div>
              
              {selectedMessage.id === 1 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-amber-900 mb-2">💡 Suggestions de discussion</p>
                  <div className="space-y-1">
                    <button className="text-sm text-amber-700 hover:text-amber-900 block">
                      • Demande à {selectedMessage.mentor.split(' ')[0]} son parcours d'ingénieur à PM
                    </button>
                    <button className="text-sm text-amber-700 hover:text-amber-900 block">
                      • Quelle est la culture chez {selectedMessage.company} ?
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Écris ton message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



const ProfilePage = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mon Profil</h1>
      
      <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-xl p-8 mb-6">
        <div className="flex items-start gap-6">
          <div className="relative">
            <img src={STUDENT_PROFILE.photo} alt={STUDENT_PROFILE.name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700">
              <Camera size={18} />
            </button>
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{STUDENT_PROFILE.name}</h2>
            <p className="text-gray-700 mb-1">{STUDENT_PROFILE.program}</p>
            <p className="text-gray-600 mb-3">{STUDENT_PROFILE.school} • Promotion {STUDENT_PROFILE.graduationYear}</p>
            <Badge color="secondary" size="medium">{STUDENT_PROFILE.personalityType}</Badge>
          </div>
          
          <Button variant="outline">
            Modifier le profil
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-bold mb-4">Ta Personnalité</h2>
        <p className="text-gray-700 mb-6">
          Tu es <strong>{STUDENT_PROFILE.personalityType}</strong> : créatif, analytique et autonome. 
          Tu excelles dans les environnements innovants et aimes résoudre des problèmes complexes.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(STUDENT_PROFILE.personalityTraits).map(([trait, score]) => (
            <div key={trait}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium capitalize">{trait}</span>
                <span className="text-sm font-bold">{score}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500" style={{width: `${score}%`}} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-bold mb-4">Objectifs de Carrière</h2>
        <div className="space-y-3">
          {STUDENT_PROFILE.goals.map((goal, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="text-white" size={14} />
              </div>
              <span className="text-gray-700">{goal}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-bold mb-4">Intérêts & Expertise</h2>
        <div className="flex flex-wrap gap-2">
          {STUDENT_PROFILE.interests.map((interest, i) => (
            <Badge key={i} color="primary">{interest}</Badge>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4">Tes Connexions Mentors</h2>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Utilisées cette année</span>
            <span className="text-sm font-bold">
              {STUDENT_PROFILE.mentorConnections.active}/{STUDENT_PROFILE.mentorConnections.limit}
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600" 
              style={{width: `${(STUDENT_PROFILE.mentorConnections.active / STUDENT_PROFILE.mentorConnections.limit) * 100}%`}} 
            />
          </div>
        </div>
        <p className="text-sm text-gray-600">
          {STUDENT_PROFILE.mentorConnections.remaining} connexions restantes pour {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

// ==================== APP PRINCIPALE ====================

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedId, setSelectedId] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigate = (page, id = null) => {
    setCurrentPage(page);
    setSelectedId(id);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };
  
  const navItems = [
    { id: 'dashboard', label: 'Accueil', icon: User },
    { id: 'mentors', label: 'Mentors', icon: Users },
    { id: 'opportunities', label: 'Opportunités', icon: Briefcase },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: MESSAGES.filter(m => m.unread).length }, // Fixed badge to be dynamic
    { id: 'profile', label: 'Profil', icon: User }
  ];
  
  const renderPage = () => {
    switch(currentPage) {
      case 'landing':
        return <Landing onStart={() => navigate('dashboard')} />;
      case 'dashboard':
        return <Dashboard onNavigate={navigate} />;
      case 'mentors':
        return <MentorsPage onNavigate={navigate} />;
      case 'mentor':
        return <MentorProfile mentorId={selectedId} onNavigate={navigate} />;
      case 'opportunities':
        return <OpportunitiesPage onNavigate={navigate} />;
      case 'job':
        return <JobDetail jobId={selectedId} onNavigate={navigate} />;
      case 'messages':
        return <MessagesPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <Landing onStart={() => navigate('dashboard')} />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage !== 'landing' && (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate('dashboard')}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-pink-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="text-white" size={18} />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                  TalentMatch
                </span>
              </div>
              
              <div className="hidden md:flex items-center gap-1">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors relative ${
                      currentPage === item.id 
                        ? 'bg-indigo-50 text-indigo-600 font-medium' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                    {item.badge > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              
              <button 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
            {mobileMenuOpen && (
              <div className="md:hidden border-t border-gray-200 py-2">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    className={`w-full px-4 py-3 flex items-center gap-3 ${
                      currentPage === item.id 
                        ? 'bg-indigo-50 text-indigo-600 font-medium' 
                        : 'text-gray-600'
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                    {item.badge > 0 && (
                      <span className="ml-auto w-6 h-6 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      )}
      
      <main>
        {renderPage()}
      </main>
      
      {currentPage !== 'landing' && (
        <footer className="bg-white border-t border-gray-200 mt-20">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-pink-500 rounded"></div>
                <span className="font-semibold text-gray-900">TalentMatch</span>
              </div>
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} TalentMatch. Prototype de démonstration.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
