import React, { useState } from 'react';
// Icône 'GraduationCap' sera utilisée
import { Calendar, Camera, Users, Briefcase, MessageSquare, User, Search, Filter, MapPin, Clock, Star, ArrowRight, Check, TrendingUp, Target, Heart, Send, Menu, X, ChevronRight, Building2, GraduationCap, Sparkles, AlertTriangle, BarChart3, Plus, Edit2, Archive } from 'lucide-react';

// La configuration Tailwind est maintenant dans un fichier séparé


// ==================== DONNÉES FAKE (CÔTÉ ENTREPRISE - AMAZON) ====================

const ENTERPRISE_USER_PROFILE = {
  name: "Marie Durand",
  title: "University Recruiter",
  photo: "https://i.pravatar.cc/400?img=25"
};

// ### MIS À JOUR POUR AMAZON ###
const COMPANY_PROFILE = {
  name: "Amazon",
  logo: "https://logo.clearbit.com/amazon.com",
  industry: "E-commerce & Cloud Computing",
  location: "Paris (Clichy), France",
  description: "Amazon s'efforce d'être l'entreprise la plus centrée sur le client au monde. De l'e-commerce au cloud computing (AWS) en passant par le streaming, nous innovons pour nos clients.",
  values: ["Customer Obsession", "Ownership", "Invent and Simplify", "Are Right, A Lot", "Learn and Be Curious", "Hire and Develop the Best"],
  
  criteria: {
    culture: ["Customer Obsession", "Ownership", "Bias for Action", "Frugality", "Dive Deep"],
    softSkills: ["Communication écrite (narrative)", "Analyse de données", "Problem-solving", "Capacité à gérer l'ambiguïté"],
  },

  stats: {
    jobsActive: 2,
    mentors: 2,
    hires: 145 // Chiffre plus élevé pour Amazon
  }
};
// #############################

// ### MIS À JOUR POUR AMAZON ###
const COMPANY_MENTORS = [
  {
    id: 1,
    name: "Thomas Bernard",
    title: "Principal Product Manager (AWS)",
    photo: "https://i.pravatar.cc/400?img=13",
    bio: "Passionné par le cloud et la stratégie produit, je lance des services AWS à grande échelle. Je guide sur la préparation aux entretiens PM d'Amazon.",
    expertise: ["Product Management", "Cloud (AWS)", "Go-to-Market", "Narrative writing"],
    // Les données de match sont maintenant sur l'objet CANDIDATE
  },
  {
    id: 2,
    name: "Claire Valois",
    title: "Senior Software Development Engineer (SDE)",
    photo: "https://i.pravatar.cc/400?img=48",
    bio: "Manager de l'équipe backend santé, je suis passionnée par la scalabilité et le mentorat technique pour former les leaders de demain.",
    expertise: ["Backend", "Java", "Systèmes distribués", "Scalabilité", "Mentorat technique"],
  }
];
// #############################

// ### DONNÉES MISES À JOUR ###
const CANDIDATES = [
  {
    id: 1,
    name: "Alex Martin",
    school: "IMT-BS",
    program: "Master in Management",
    graduationYear: 2026,
    photo: "https://i.pravatar.cc/400?img=33",
    interests: ["Product Management", "Startups", "SaaS", "IA/ML"],
    goals: ["Devenir PM dans une entreprise tech", "Lancer ma propre startup"],
    values: ["Innovation", "Équilibre vie pro/perso", "Impact"],
    personalityType: "L'Innovateur",
    cvUrl: "/cv/alex_martin.pdf",
    status: "Nouveau Match",
    // Score de match général supprimé
    // Scores de match spécifiques par mentor
    mentorMatches: [
      { mentorId: 1, score: { overall: 92, expertise: 95, goals: 90, personality: 88 } }, // Match avec Thomas
      { mentorId: 2, score: { overall: 70, expertise: 60, goals: 75, personality: 74 } }  // Match avec Claire
    ]
  },
  {
    id: 2,
    name: "Chloé Dubois",
    school: "HETIC",
    program: "Master UX Design",
    graduationYear: 2025,
    photo: "https://i.pravatar.cc/400?img=31",
    interests: ["UX Research", "Design Ethique", "HealthTech"],
    goals: ["Rejoindre une entreprise à impact", "Devenir Lead Designer"],
    values: ["Empathie", "Collaboration", "Simplicité"],
    personalityType: "La Créative Empathique",
    cvUrl: "/cv/chloe_dubois.pdf",
    status: "Contacté",
    mentorMatches: [
      { mentorId: 1, score: { overall: 75, expertise: 70, goals: 78, personality: 77 } }, // Match avec Thomas
      { mentorId: 2, score: { overall: 82, expertise: 80, goals: 85, personality: 81 } }  // Match avec Claire
    ]
  },
  {
    id: 3,
    name: "Karim Benali",
    school: "École 42",
    program: "Architecture Logicielle",
    graduationYear: 2025,
    photo: "https://i.pravatar.cc/400?img=68",
    interests: ["DevOps", "Scalabilité", "FinTech", "Python"],
    goals: ["Devenir Staff Engineer", "Construire des systèmes robustes"],
    values: ["Efficacité", "Apprentissage continu", "Qualité"],
    personalityType: "L'Architecte",
    cvUrl: "/cv/karim_benali.pdf",
    status: "Nouveau Match",
    mentorMatches: [
      { mentorId: 1, score: { overall: 78, expertise: 75, goals: 80, personality: 79 } }, // Match avec Thomas
      { mentorId: 2, score: { overall: 94, expertise: 98, goals: 90, personality: 92 } }  // Match avec Claire
    ]
  }
];
// ##########################

const COMPANY_JOBS = [
  {
    id: 1,
    title: "Product Manager Intern (AWS)",
    type: "Stage",
    location: "Paris (La Défense)",
    remote: "Hybride",
    postedDate: "2025-10-28",
    status: "Actif",
    applicants: [
      { id: 1, name: "Alex Martin", match: 88, date: "2025-11-02", status: "En revue" },
      { id: 4, name: "Sophie Léger", match: 76, date: "2025-11-01", status: "En revue" }
    ],
    criteria: {
      hardSkills: ["Analyse de données (SQL)", "Roadmapping", "Priorisation", "Go-to-market strategy"],
      tools: ["Services AWS (Compréhension)", "Jira", "Tableau"],
      experience: "Stage précédent en Tech ou Business apprécié"
    }
  },
  {
    id: 4,
    title: "Software Development Engineer (SDE) Intern",
    type: "Stage",
    location: "Paris (Clichy)",
    remote: "Hybride",
    postedDate: "2025-11-01",
    status: "Actif",
    applicants: [
      { id: 3, name: "Karim Benali", match: 91, date: "2025-11-03", status: "Nouveau" }
    ],
    criteria: {
      hardSkills: ["Structures de données", "Algorithmes", "Programmation orientée objet", "Tests"],
      tools: ["Java, C++ ou Python", "Git", "AWS (Bonus)"],
      experience: "Projets personnels ou académiques solides requis"
    }
  },
  {
    id: 5,
    title: "Business Analyst Intern (e-commerce)",
    type: "Stage",
    location: "Paris (Clichy)",
    remote: "Hybride",
    postedDate: "2025-10-15",
    status: "Archivé",
    applicants: [],
    criteria: {
      hardSkills: ["SQL", "Excel", "Analyse statistique", "Data visualization"],
      tools: ["Tableau/Quicksight", "Python (Pandas)"],
      experience: "Expérience en analyse de données"
    }
  }
];

const COMPANY_EVENTS = [
  {
    id: 1,
    title: "Live Tech: Devenez SDE chez Amazon",
    type: "Webinaire",
    date: "2025-11-20",
    time: "18:00",
    location: "En ligne",
    status: "À venir",
    description: "Découvrez le parcours de nos SDE et la préparation aux entretiens techniques (Leadership Principles inclus).",
    attendees: [
      { id: 3, name: "Karim Benali", status: "Inscrit" }
    ]
  },
  {
    id: 2,
    title: "Forum Carrières IMT-BS",
    type: "Forum École",
    date: "2025-11-28",
    time: "09:00 - 17:00",
    location: "Évry",
    status: "À venir",
    description: "Retrouvez notre équipe University Recruiting sur le stand Amazon lors du forum de l'IMT-BS.",
    attendees: [
      { id: 1, name: "Alex Martin", status: "Pré-inscrit" }
    ]
  },
  {
    id: 3,
    title: "AWS Discovery Day",
    type: "Workshop",
    date: "2025-10-15",
    time: "17:00",
    location: "En ligne",
    status: "Terminé",
    description: "Introduction aux services fondamentaux d'AWS.",
    attendees: []
  }
];

// Données mises à jour pour les mentors (sans les matchs, qui sont sur l'objet CANDIDATE)
const COMPANY_MENTORS_FOR_LIST = [
  {
    id: 1,
    name: "Thomas Bernard",
    title: "Principal Product Manager (AWS)",
    photo: "https://i.pravatar.cc/400?img=13",
    bio: "Passionné par le cloud et la stratégie produit, je lance des services AWS à grande échelle. Je guide sur la préparation aux entretiens PM d'Amazon.",
    expertise: ["Product Management", "Cloud (AWS)", "Go-to-Market", "Narrative writing"],
    studentMatches: [ // On garde ceci pour la page Mentor, pour lister ses matchs
      { id: 1, name: "Alex Martin", match: 92, photo: "https://i.pravatar.cc/400?img=33" }, 
      { id: 2, name: "Chloé Dubois", match: 75, photo: "https://i.pravatar.cc/400?img=31" }
    ]
  },
  {
    id: 2,
    name: "Claire Valois",
    title: "Senior Software Development Engineer (SDE)",
    photo: "https://i.pravatar.cc/400?img=48",
    bio: "Manager de l'équipe backend santé, je suis passionnée par la scalabilité et le mentorat technique pour former les leaders de demain.",
    expertise: ["Backend", "Java", "Systèmes distribués", "Scalabilité", "Mentorat technique"],
    studentMatches: [
      { id: 3, name: "Karim Benali", match: 94, photo: "https://i.pravatar.cc/400?img=68" },
      { id: 1, name: "Alex Martin", match: 70, photo: "https://i.pravatar.cc/400?img=33" }
    ]
  }
];


const MESSAGES = [
  {
    id: 1,
    student: "Alex Martin",
    school: "IMT-BS",
    photo: "https://i.pravatar.cc/400?img=33",
    lastMessage: "Merci ! J'ai hâte d'en discuter. Je suis dispo...",
    timestamp: "Il y a 20min",
    unread: true,
    status: "Répondu"
  },
  {
    id: 3,
    student: "Karim Benali",
    school: "École 42",
    photo: "https://i.pravatar.cc/400?img=68",
    lastMessage: "Vous: Bonjour Karim, votre profil tech...",
    timestamp: "Il y a 1j",
    unread: false,
    status: "Envoyé"
  }
];

// ==================== COMPOSANTS UI PARTIELS (Réutilisés) ====================

const Button = ({ children, variant = "primary", size = "medium", className = "", onClick, icon: Icon, disabled = false }) => {
  const variants = {
    primary: "bg-tm-indigo text-white hover:bg-indigo-700",
    secondary: "bg-tm-pink text-white hover:bg-pink-600",
    outline: "border-2 border-tm-indigo text-tm-indigo hover:bg-indigo-50",
    ghost: "text-gray-700 hover:bg-gray-100"
  };
  const sizes = { small: "px-3 py-1.5 text-sm", medium: "px-4 py-2 text-base", large: "px-6 py-3 text-lg" };
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";
  return (
    <button onClick={!disabled ? onClick : null} className={`${variants[variant]} ${sizes[size]} rounded-lg font-medium transition-all flex items-center gap-2 ${className} ${disabledClass}`} disabled={disabled}>
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

const Badge = ({ children, color = "primary", size = "medium" }) => {
  const colors = {
    primary: "bg-tm-indigo/10 text-tm-indigo",
    success: "bg-tm-success/10 text-tm-success",
    warning: "bg-amber-100 text-amber-700",
    secondary: "bg-tm-pink/10 text-tm-pink",
    teal: "bg-tm-teal/10 text-tm-teal",
    gray: "bg-gray-100 text-gray-700",
    archived: "bg-gray-200 text-gray-600"
  };
  const sizes = { small: "px-2 py-0.5 text-xs", medium: "px-3 py-1 text-sm" };
  return <span className={`${colors[color]} ${sizes[size]} rounded-full font-medium inline-block whitespace-nowrap`}>{children}</span>;
};

const MatchScore = ({ score, size = "medium" }) => {
  const getColor = (score) => {
    if (score >= 85) return "text-tm-success border-tm-success";
    if (score >= 70) return "text-amber-600 border-amber-600";
    return "text-red-600 border-red-600";
  };
  const sizes = { small: "w-12 h-12 text-sm", medium: "w-16 h-16 text-lg", large: "w-24 h-24 text-2xl" };
  return <div className={`${sizes[size]} rounded-full border-4 ${getColor(score)} flex items-center justify-center font-bold font-poppins flex-shrink-0`}>{score}%</div>;
};

// ==================== NOUVEAUX COMPOSANTS (CÔTÉ ENTREPRISE) ====================

// ### COMPOSANT MIS À JOUR ###
const StudentCard = ({ student, matchScore, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100 hover:scale-[1.02]"
    >
      <div className="flex items-start gap-3 mb-3">
        <img src={student.photo} alt={student.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{student.name}</h3>
          <p className="text-sm text-gray-600 truncate">{student.program}</p>
          <p className="text-sm text-indigo-600 font-medium truncate">{student.school}</p>
        </div>
        {/* Utilise le score de match passé en prop */}
        <MatchScore score={matchScore.overall} size="small" />
      </div>
      
      <div className="flex flex-wrap gap-1.5 mb-3">
        {student.interests.slice(0, 3).map((interest, i) => (
          <Badge key={i} color="gray" size="small">{interest}</Badge>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <GraduationCap size={12} /> Promo {student.graduationYear}
        </span>
        <Badge color={student.status === 'Nouveau Match' ? 'success' : 'gray'} size="small">{student.status}</Badge>
      </div>
    </div>
  );
};
// ##########################

const JobPostingCard = ({ job, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">{job.title}</h3>
          <div className="flex flex-wrap gap-2">
            <Badge color="primary" size="small">{job.type}</Badge>
            <Badge color="gray" size="small">{job.location}</Badge>
            <Badge color={job.status === 'Actif' ? 'teal' : 'archived'} size="small">{job.status}</Badge>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold font-poppins">{job.applicants.length}</span>
          <p className="text-sm text-gray-500">Candidats</p>
        </div>
      </div>
      
      <p className="text-sm text-gray-500">Publié le {job.postedDate}</p>
    </div>
  );
};

const EventCard = ({ event, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">{event.title}</h3>
          <div className="flex flex-wrap gap-2">
            <Badge color="secondary" size="small">{event.type}</Badge>
            <Badge color="gray" size="small">{event.location}</Badge>
            <Badge color={event.status === 'À venir' ? 'teal' : 'archived'} size="small">{event.status}</Badge>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold font-poppins">{event.attendees.length}</span>
          <p className="text-sm text-gray-500">Inscrits</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Calendar size={14} />
        <span>{event.date} • {event.time}</span>
      </div>
    </div>
  );
};

const CompanyMentorCard = ({ mentor, onClick }) => {
  // Trouve le top match pour ce mentor
  const topMatch = CANDIDATES
    .map(c => ({
      ...c,
      match: c.mentorMatches.find(m => m.mentorId === mentor.id)
    }))
    .filter(c => c.match)
    .sort((a, b) => b.match.score.overall - a.match.score.overall)[0];

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-4 flex-1">
          <img src={mentor.photo} alt={mentor.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{mentor.name}</h3>
            <p className="text-sm text-gray-600 truncate">{mentor.title}</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          <span className="text-2xl font-bold font-poppins text-tm-success">{topMatch ? topMatch.match.score.overall : 0}%</span>
          <p className="text-sm text-gray-500">Top Match</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1.5 mb-3">
        {mentor.expertise.slice(0, 3).map((exp, i) => (
          <Badge key={i} color="gray" size="small">{exp}</Badge>
        ))}
      </div>
      
      <p className="text-sm text-gray-500">{topMatch ? `${COMPANY_MENTORS_FOR_LIST.find(m => m.id === mentor.id).studentMatches.length} étudiants matchés` : '0 étudiants matchés'}</p>
    </div>
  );
};

// ==================== COMPOSANT DE NAVIGATION (ENTREPRISE) ====================

const Navbar = ({ onNavigate, currentView }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', view: 'dashboard', icon: BarChart3 },
        { name: 'Candidats', view: 'candidates', icon: Users },
        { name: 'Nos Offres', view: 'jobs', icon: Briefcase },
        { name: 'Événements', view: 'events', icon: Calendar },
        { name: 'Mentorat', view: 'mentors', icon: GraduationCap },
        { name: 'Messages', view: 'messages', icon: MessageSquare, badge: MESSAGES.filter(m => m.unread).length },
        { name: 'Profil', view: 'profile', icon: Building2 },
    ];

    const NavLink = ({ item, isMobile = false }) => (
        <button
            onClick={() => {
                onNavigate(item.view);
                setIsOpen(false);
            }}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors font-medium w-full text-left
                ${currentView === item.view ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}
                ${isMobile ? 'text-base' : 'text-sm'}
            `}
        >
            <item.icon size={isMobile ? 20 : 18} className="mr-3 flex-shrink-0" />
            {item.name}
            {item.badge > 0 && (
                <span className="ml-auto bg-tm-pink text-white text-xs px-2 py-0.5 rounded-full">{item.badge}</span>
            )}
        </button>
    );

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        {/* ### MIS À JOUR ICI ### */}
                        <h1 className="text-2xl font-poppins font-bold text-indigo-600">Fit-In</h1>
                        <span className="ml-2 text-sm text-tm-indigo hidden md:inline">| for Business</span>
                    </div>

                    <div className="hidden md:flex space-x-2 lg:space-x-4">
                        {navItems.map(item => (
                            <NavLink key={item.view} item={item} />
                        ))}
                    </div>

                    <div className="md:hidden">
                        <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} icon={isOpen ? X : Menu} className="!p-1.5 text-gray-700" />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden px-4 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-100">
                    {navItems.map(item => (
                        <NavLink key={item.view} item={item} isMobile={true} />
                    ))}
                    <div className="pt-2 border-t mt-2 px-4">
                        <p className="text-sm font-medium text-gray-700">{ENTERPRISE_USER_PROFILE.name}</p>
                        <p className="text-xs text-gray-500">{COMPANY_PROFILE.name}</p>
                    </div>
                </div>
            )}
        </nav>
    );
};


// ==================== PAGES (ENTREPRISE) ====================

const Landing = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Target size={16} />
            <span className="text-sm font-medium">Recrutez les meilleurs talents</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">
            Trouvez les Candidats qui Vous Ressemblent
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Accédez à un vivier de talents qualifiés et "matchés" scientifiquement à votre culture d'entreprise.
          </p>
          <Button onClick={onStart} size="large" variant="secondary" icon={ArrowRight}>
            Accéder à la démo Recruteur
          </Button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ onNavigate }) => {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-poppins mb-2 text-gray-900">Bonjour, {ENTERPRISE_USER_PROFILE.name} 👋</h1>
        <p className='text-lg text-gray-600'>Bienvenue sur votre dashboard {COMPANY_PROFILE.name}.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Candidatures reçues</span>
            <Briefcase className="text-tm-indigo" size={20} />
          </div>
          <div className="text-3xl font-bold font-poppins text-gray-900">{COMPANY_JOBS.reduce((acc, job) => acc + job.applicants.length, 0)}</div>
          <p className="text-xs text-gray-500">Total</p>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Nouveaux Matchs</span>
            <Sparkles className="text-tm-pink" size={20} />
          </div>
          <div className="text-3xl font-bold font-poppins text-gray-900">{CANDIDATES.filter(c => c.status === 'Nouveau Match').length}</div>
          <p className="text-xs text-gray-500">Dans votre vivier</p>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Événements à venir</span>
            <Calendar className="text-tm-success" size={20} />
          </div>
          <div className="text-3xl font-bold font-poppins text-gray-900">{COMPANY_EVENTS.filter(e => e.status === 'À venir').length}</div>
           <p className="text-xs text-gray-500">Ce mois-ci</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold font-poppins">Candidats Recommandés</h2>
            <Button variant="ghost" onClick={() => onNavigate('candidates')} icon={ArrowRight}>
              Voir le vivier
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {CANDIDATES.filter(c => c.status === 'Nouveau Match').slice(0, 2).map(student => {
              // Simule un match rapide pour le dashboard (on prend le 1er mentor par défaut)
              const match = student.mentorMatches.find(m => m.mentorId === COMPANY_MENTORS_FOR_LIST[0].id) || { score: { overall: 0 } };
              return (
                <StudentCard key={student.id} student={student} matchScore={match.score} onClick={() => onNavigate('candidate', student.id)} />
              )
            })}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold font-poppins">Gérer Vos Offres</h2>
            <Button variant="ghost" onClick={() => onNavigate('jobs')} icon={ArrowRight}>
              Voir toutes les offres
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {COMPANY_JOBS.filter(j => j.status === 'Actif').slice(0, 2).map(job => (
              <JobPostingCard key={job.id} job={job} onClick={() => onNavigate('job', job.id)} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold font-poppins">Événements à Venir</h2>
            <Button variant="ghost" onClick={() => onNavigate('events')} icon={ArrowRight}>
              Voir tous les événements
            </Button>
          </div>
          <div className="grid md:grid-cols-1 gap-4">
            {COMPANY_EVENTS.filter(e => e.status === 'À venir').slice(0, 2).map(event => (
              <EventCard key={event.id} event={event} onClick={() => onNavigate('event', event.id)} />
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold font-poppins">Nos Mentors</h2>
            <Button variant="ghost" onClick={() => onNavigate('mentors')} icon={ArrowRight}>
              Gérer les mentors
            </Button>
          </div>
          <div className="grid md:grid-cols-1 gap-4">
            {COMPANY_MENTORS_FOR_LIST.slice(0, 2).map(mentor => (
              <CompanyMentorCard key={mentor.id} mentor={mentor} onClick={() => onNavigate('mentor', mentor.id)} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

const CandidatesPage = ({ onNavigate, mentorContextId, setMentorContextId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('all');
  
  // Fonction helper pour trouver le match du mentor sélectionné
  const getMatch = (student) => student.mentorMatches.find(m => m.mentorId === mentorContextId);

  const filteredCandidates = CANDIDATES
    .filter(candidate => {
      // Filtres standards
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSchool = selectedSchool === 'all' || candidate.school === selectedSchool;
      
      // Filtre pour s'assurer qu'un match existe pour ce mentor
      const matchesMentor = getMatch(candidate);

      return matchesSearch && matchesSchool && matchesMentor;
    })
    .map(student => ({
      student: student,
      match: getMatch(student) // Attache l'objet match
    }))
    .sort((a, b) => b.match.score.overall - a.match.score.overall); // Trie par score
  
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-poppins mb-2">Vivier de Candidats</h1>
        <p className="text-gray-600">Explorez les profils "matchés" pour vos employés.</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 sticky top-20">
            <h3 className="font-semibold mb-3">Filtres</h3>

            <div className="mb-4">
              <label className="text-sm text-gray-600 mb-2 block">Match par rapport à :</label>
              <select
                value={mentorContextId}
                onChange={(e) => setMentorContextId(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {COMPANY_MENTORS_FOR_LIST.map(mentor => (
                  <option key={mentor.id} value={mentor.id}>{mentor.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-600 mb-2 block">Rechercher par nom</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Nom..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="text-sm text-gray-600 mb-2 block">École</label>
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Toutes</option>
                <option value="IMT-BS">IMT-BS</option>
                <option value="HETIC">HETIC</option>
                <option value="École 42">École 42</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="mb-4 text-sm text-gray-600">
            {filteredCandidates.length} candidat{filteredCandidates.length > 1 ? 's' : ''} trouvé{filteredCandidates.length > 1 ? 's' : ''}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCandidates.map(({ student, match }) => (
              <StudentCard 
                key={student.id} 
                student={student} 
                matchScore={match.score} // Passe le score spécifique
                onClick={() => onNavigate('candidate', student.id)} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentProfile = ({ studentId, mentorContextId, onNavigate }) => {
  const student = CANDIDATES.find(s => s.id === studentId);
  const mentor = COMPANY_MENTORS_FOR_LIST.find(m => m.id === mentorContextId);
  
  if (!student || !mentor) return <div className="p-6">Données non trouvées</div>;

  // Trouve le score de match pour le mentor en contexte
  const match = student.mentorMatches.find(m => m.mentorId === mentorContextId);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl p-8 mb-6">
        <button 
          onClick={() => onNavigate('candidates')}
          className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-1 text-sm"
        >
          <ChevronRight size={16} className='transform rotate-180' /> Retour aux candidats
        </button>
        
        <div className="flex flex-col md:flex-row items-start gap-6">
          <img src={student.photo} alt={student.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg flex-shrink-0" />
          
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold font-poppins mb-2">{student.name}</h1>
            <p className="text-lg text-gray-700 mb-1">{student.program}</p>
            <p className="text-base text-indigo-600 font-medium mb-3">{student.school} • Promo {student.graduationYear}</p>
            <Badge color="secondary">{student.personalityType}</Badge>
          </div>
          
          <div className="md:text-right flex flex-col items-start md:items-end">
            {/* Affiche le score de match par rapport au mentor */}
            <MatchScore score={match ? match.score.overall : 0} size="large" />
            <p className="text-sm text-gray-600 mt-2">Match avec {mentor.name}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-bold font-poppins mb-4">Objectifs & Intérêts</h2>
        <h3 className="font-semibold mb-2">Objectifs de Carrière</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {student.goals.map((goal, i) => (
            <Badge key={i} color="primary">{goal}</Badge>
          ))}
        </div>
        
        <h3 className="font-semibold mb-2">Domaines d'intérêt</h3>
        <div className="flex flex-wrap gap-2">
          {student.interests.map((interest, i) => (
            <Badge key={i} color="teal">{interest}</Badge>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-bold font-poppins mb-4">Profil & CV</h2>
        <p className="text-gray-700 mb-4">
          Correspondance culturelle (Amazon) : <strong>{student.mentorMatches[0].score.personality}%</strong>
        </p>
        <div className="flex gap-3">
          <Button variant="outline" icon={Check}>
            Télécharger le CV
          </Button>
          <Button icon={Heart}>
            Ajouter à une liste
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold mb-2">Contacter {student.name.split(' ')[0]}</h3>
        <p className="text-sm text-gray-600 mb-4">
          Engagez la conversation ou invitez ce profil à postuler à l'une de vos offres.
        </p>
        <div className="flex gap-3">
          <Button size="large" onClick={() => onNavigate('messages')} className="w-full md:w-auto" icon={Send}>
            Envoyer un message
          </Button>
          <Button size="large" variant="outline" className="w-full md:w-auto" icon={Briefcase}>
            Inviter à postuler
          </Button>
        </div>
      </div>
    </div>
  );
};

const JobsPage = ({ onNavigate }) => {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold font-poppins mb-2">Gestion des Offres</h1>
          <p className="text-gray-600">Gérez vos offres d'emploi et vos candidats</p>
        </div>
        <Button icon={Plus} size="large">Créer une offre</Button>
      </div>
      
      <div>
        <div className="mb-4 text-sm text-gray-600">
          {COMPANY_JOBS.length} offre{COMPANY_JOBS.length > 1 ? 's' : ''} au total
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPANY_JOBS.map(job => (
            <JobPostingCard key={job.id} job={job} onClick={() => onNavigate('job', job.id)} />
          ))}
        </div>
      </div>
    </div>
  );
};

const JobApplicantsPage = ({ jobId, onNavigate }) => {
  const job = COMPANY_JOBS.find(j => j.id === jobId);
  
  if (!job) return <div className="p-6">Offre non trouvée</div>;
  
  const applicants = job.applicants.map(app => {
    const details = CANDIDATES.find(c => c.id === app.id);
    return { ...app, ...details };
  });

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <button 
        onClick={() => onNavigate('jobs')}
        className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-1 text-sm"
      >
        <ChevronRight size={16} className='transform rotate-180' /> Retour aux offres
      </button>
      
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold font-poppins mb-2">{job.title}</h1>
            <div className="flex flex-wrap gap-2">
              <Badge color="primary">{job.type}</Badge>
              <Badge color="gray">{job.location}</Badge>
              <Badge color={job.status === 'Actif' ? 'teal' : 'archived'}>{job.status}</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" icon={Edit2}>Modifier</Button>
            <Button variant="outline" icon={Archive}>Archiver</Button>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-6 pt-6">
          <h3 className="text-lg font-bold font-poppins mb-4">Critères de Match (Poste)</h3>
          
          <h4 className="font-semibold mb-2 text-gray-700">Compétences (Hard Skills)</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {job.criteria.hardSkills.map((crit, i) => (
              <Badge key={i} color="primary">{crit}</Badge>
            ))}
          </div>
          
          <h4 className="font-semibold mb-2 text-gray-700">Outils</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {job.criteria.tools.map((crit, i) => (
              <Badge key={i} color="teal">{crit}</Badge>
            ))}
          </div>

          <h4 className="font-semibold mb-2 text-gray-700">Expérience requise</h4>
          <p className="text-sm text-gray-600">{job.criteria.experience}</p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold font-poppins p-6 border-b">
          {job.applicants.length} Candidat{job.applicants.length > 1 ? 's' : ''}
        </h2>
        <div className="divide-y divide-gray-100">
          {applicants.map(applicant => (
            <div 
              key={applicant.id}
              className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => onNavigate('candidate', applicant.id)}
            >
              <div className="flex items-center gap-3 flex-1">
                <img src={applicant.photo} alt={applicant.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="font-semibold">{applicant.name}</h3>
                  <p className="text-sm text-gray-600">{applicant.school}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="text-center">
                  <span className="text-lg font-bold">{applicant.match}%</span>
                  <p className="text-xs text-gray-500">Match</p>
                </div>
                <div className="flex-1 md:flex-auto">
                  <Badge color="warning" size="small">{applicant.status}</Badge>
                  <p className="text-xs text-gray-400 mt-1">Reçu le {applicant.date}</p>
                </div>
                <ChevronRight className="text-gray-400" />
              </div>
            </div>
          ))}
          {applicants.length === 0 && (
            <p className="p-6 text-gray-500 text-center">Aucun candidat pour cette offre pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const EventsPage = ({ onNavigate }) => {
  const [selectedStatus, setSelectedStatus] = useState('À venir');
  
  const filteredEvents = COMPANY_EVENTS.filter(event => {
    return selectedStatus === 'all' || event.status === selectedStatus;
  });
  
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold font-poppins mb-2">Gestion des Événements</h1>
          <p className="text-gray-600">Gérez vos événements et interagissez avec les étudiants</p>
        </div>
        <Button icon={Plus} size="large">Créer un événement</Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 sticky top-20">
            <h3 className="font-semibold mb-3">Filtres</h3>
            <div className="mb-4">
              <label className="text-sm text-gray-600 mb-2 block">Statut</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="À venir">À venir</option>
                <option value="Terminé">Terminés</option>
                <option value="all">Tous</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="mb-4 text-sm text-gray-600">
            {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''} trouvé{filteredEvents.length > 1 ? 's' : ''}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} onClick={() => onNavigate('event', event.id)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const EventDetailPage = ({ eventId, onNavigate }) => {
  const event = COMPANY_EVENTS.find(e => e.id === eventId);
  
  if (!event) return <div className="p-6">Événement non trouvé</div>;
  
  const attendees = event.attendees.map(att => {
    const details = CANDIDATES.find(c => c.id === att.id);
    return { ...att, ...details };
  });

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <button 
        onClick={() => onNavigate('events')}
        className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-1 text-sm"
      >
        <ChevronRight size={16} className='transform rotate-180' /> Retour aux événements
      </button>
      
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold font-poppins mb-2">{event.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge color="secondary">{event.type}</Badge>
              <Badge color="gray">{event.location}</Badge>
              <Badge color={event.status === 'À venir' ? 'teal' : 'archived'}>{event.status}</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={14} />
              <span>{event.date} • {event.time}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" icon={Edit2}>Modifier</Button>
            <Button variant="outline" icon={Archive}>Archiver</Button>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-gray-700">{event.description}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold font-poppins p-6 border-b">
          {event.attendees.length} Inscrit{event.attendees.length > 1 ? 's' : ''}
        </h2>
        <div className="divide-y divide-gray-100">
          {attendees.map(attendee => (
            <div 
              key={attendee.id}
              className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => onNavigate('candidate', attendee.id)}
            >
              <div className="flex items-center gap-3 flex-1">
                <img src={attendee.photo} alt={attendee.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="font-semibold">{attendee.name}</h3>
                  <p className="text-sm text-gray-600">{attendee.school}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="text-center">
                  <span className="text-lg font-bold">{attendee.mentorMatches.find(m => m.mentorId === 1).score.overall}%</span>
                  <p className="text-xs text-gray-500">Match</p>
                </div>
                <div className="flex-1 md:flex-auto">
                  <Badge color="success" size="small">{attendee.status}</Badge>
                </div>
                <ChevronRight className="text-gray-400" />
              </div>
            </div>
          ))}
          {attendees.length === 0 && (
            <p className="p-6 text-gray-500 text-center">Aucun inscrit pour cet événement pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const MentorsPage = ({ onNavigate }) => {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold font-poppins mb-2">Gestion du Mentorat</h1>
          <p className="text-gray-600">Gérez les employés participant au programme de mentorat.</p>
        </div>
        <Button icon={Plus} size="large">Ajouter un mentor</Button>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {COMPANY_MENTORS_FOR_LIST.map(mentor => (
          <CompanyMentorCard key={mentor.id} mentor={mentor} onClick={() => onNavigate('mentor', mentor.id)} />
        ))}
      </div>
    </div>
  );
};

const MentorDetailPage = ({ mentorId, onNavigate }) => {
  const mentor = COMPANY_MENTORS_FOR_LIST.find(m => m.id === mentorId);
  
  if (!mentor) return <div className="p-6">Mentor non trouvé</div>;
  
  const matchedStudents = mentor.studentMatches.map(match => {
    const details = CANDIDATES.find(c => c.id === match.id);
    return { ...match, ...details };
  }).sort((a, b) => b.match - a.match);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <button 
        onClick={() => onNavigate('mentors')}
        className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-1 text-sm"
      >
        <ChevronRight size={16} className='transform rotate-180' /> Retour aux mentors
      </button>
      
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
          <img src={mentor.photo} alt={mentor.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg flex-shrink-0" />
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold font-poppins mb-2">{mentor.name}</h1>
            <p className="text-lg text-gray-700 mb-3">{mentor.title}</p>
            <h3 className="font-semibold mb-2 text-gray-700">Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {mentor.expertise.map((exp, i) => (
                <Badge key={i} color="primary">{exp}</Badge>
              ))}
            </div>
          </div>
          <Button variant="ghost" icon={Edit2}>Modifier</Button>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Description (Bio)</h3>
          <p className="text-gray-700">{mentor.bio}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold font-poppins p-6 border-b">
          {mentor.studentMatches.length} Étudiant{mentor.studentMatches.length > 1 ? 's' : ''} Matchés
        </h2>
        <div className="divide-y divide-gray-100">
          {matchedStudents.map(student => (
            <div 
              key={student.id}
              className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => onNavigate('candidate', student.id)}
            >
              <div className="flex items-center gap-3 flex-1">
                <img src={student.photo} alt={student.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="font-semibold">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.school}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="text-center">
                  <span className="text-lg font-bold">{student.match}%</span>
                  <p className="text-xs text-gray-500">Match</p>
                </div>
                <div className="flex-1 md:flex-auto">
                  <Badge color="warning" size="small">{student.status}</Badge>
                </div>
                <ChevronRight className="text-gray-400" />
              </div>
            </div>
          ))}
          {matchedStudents.length === 0 && (
            <p className="p-6 text-gray-500 text-center">Aucun étudiant ne correspond à ce mentor pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const MessagesPage = () => {
  const [selectedMessage, setSelectedMessage] = useState(MESSAGES[0]);
  
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold font-poppins mb-6">Messages</h1>
      
      <div className="flex flex-col md:flex-row gap-4 h-[600px]">
        <div className="w-full md:w-80 bg-white rounded-xl shadow-sm border border-gray-100 overflow-y-auto flex-shrink-0">
          <div className="p-3">
            {MESSAGES.map(msg => (
              <div
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={`p-3 rounded-lg cursor-pointer mb-2 transition-colors ${
                  selectedMessage.id === msg.id ? 'bg-indigo-50 border border-indigo-200' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <img src={msg.photo} alt={msg.student} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-semibold text-sm truncate ${msg.unread ? 'text-gray-900' : 'text-gray-700'}`}>{msg.student}</h4>
                      {msg.unread && <div className="w-2 h-2 bg-tm-pink rounded-full flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{msg.school}</p>
                    <p className="text-sm text-gray-600 truncate">{msg.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-4 border-b flex items-center gap-3">
            <img src={selectedMessage.photo} alt={selectedMessage.student} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <h3 className="font-semibold">{selectedMessage.student}</h3>
              <p className="text-sm text-gray-600">{selectedMessage.school}</p>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="flex gap-2 justify-end items-end mb-4">
              <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-none p-3 max-w-md shadow-md">
                <p className="text-sm">Bonjour Alex ! J'ai vu votre profil et votre intérêt pour le Product Management. Nous avons une offre de stage (PM Intern AWS) qui correspond parfaitement.</p>
              </div>
              <img src={ENTERPRISE_USER_PROFILE.photo} alt="" className="w-8 h-8 rounded-full flex-shrink-0" />
            </div>
            <div className="flex gap-2 items-end">
              <img src={selectedMessage.photo} alt="" className="w-8 h-8 rounded-full flex-shrink-0" />
              <div className="bg-white rounded-2xl rounded-tl-none p-3 max-w-md shadow-md">
                <p className="text-sm">{selectedMessage.lastMessage}</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input type="text" placeholder={`Écrire à ${selectedMessage.student}...`} className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <button className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors"><Send size={18} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompanyProfilePage = () => {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold font-poppins mb-6">Profil Entreprise</h1>
      
      <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-xl p-8 mb-6">
        <div className="flex items-start gap-6">
          <div className="relative flex-shrink-0">
            <img src={COMPANY_PROFILE.logo} alt={COMPANY_PROFILE.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg bg-white" />
            <button className="absolute bottom-0 right-0 w-8 h-8 md:w-10 md:h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 border-2 border-white">
              <Camera size={18} />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold font-poppins mb-2">{COMPANY_PROFILE.name}</h2>
            <p className="text-gray-700 mb-1">{COMPANY_PROFILE.industry}</p>
            <p className="text-gray-600 mb-3">{COMPANY_PROFILE.location}</p>
          </div>
          <Button variant="outline" icon={Edit2}>
            Modifier le profil
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-bold font-poppins mb-4">À propos de {COMPANY_PROFILE.name}</h2>
        <p className="text-gray-700 mb-6">{COMPANY_PROFILE.description}</p>
        
        <h3 className="font-semibold mb-3">Nos Principes de Leadership (Valeurs)</h3>
        <div className="flex flex-wrap gap-2">
          {COMPANY_PROFILE.values.map((value, i) => (
            <Badge key={i} color="pink">{value}</Badge>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold font-poppins">Nos Critères de Match (Culture)</h2>
          <Button variant="ghost" size="small" icon={Edit2}>Modifier</Button>
        </div>
        
        <h3 className="font-semibold mb-3 text-gray-700">Culture & Comportements clés</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {COMPANY_PROFILE.criteria.culture.map((crit, i) => (
            <Badge key={i} color="teal">{crit}</Badge>
          ))}
        </div>
        
        <h3 className="font-semibold mb-3 text-gray-700">Soft Skills recherchés</h3>
        <div className="flex flex-wrap gap-2">
          {COMPANY_PROFILE.criteria.softSkills.map((crit, i) => (
            <Badge key={i} color="primary">{crit}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};


// ==================== COMPOSANT PRINCIPAL (ROUTER) ====================

// ### COMPOSANT MIS À JOUR ###
const App = () => {
    const [view, setView] = useState('landing');
    const [dataId, setDataId] = useState(null); // ID pour 'job', 'event', 'mentor', 'candidate'
    
    // Nouvel état pour suivre le mentor sélectionné dans la page Candidats
    const [mentorContextId, setMentorContextId] = useState(COMPANY_MENTORS[0].id); 

    const handleNavigate = (newView, id = null) => {
        setView(newView);
        setDataId(id);
        window.scrollTo(0, 0);
    };

    const renderView = () => {
        switch (view) {
            case 'landing':
                return <Landing onStart={() => handleNavigate('dashboard')} />;
            case 'dashboard':
                return <Dashboard onNavigate={handleNavigate} />;
            case 'candidates':
                // Passe l'état du mentor et son setter
                return <CandidatesPage 
                          onNavigate={handleNavigate} 
                          mentorContextId={mentorContextId} 
                          setMentorContextId={setMentorContextId} 
                       />;
            case 'candidate':
                // Passe l'ID de l'étudiant (dataId) et l'ID du mentor (mentorContextId)
                return <StudentProfile 
                          studentId={dataId} 
                          mentorContextId={mentorContextId} 
                          onNavigate={handleNavigate} 
                       />;
            case 'jobs':
                return <JobsPage onNavigate={handleNavigate} />;
            case 'job':
                return <JobApplicantsPage jobId={dataId} onNavigate={handleNavigate} />;
            case 'events':
                return <EventsPage onNavigate={handleNavigate} />;
            case 'event':
                return <EventDetailPage eventId={dataId} onNavigate={handleNavigate} />;
            case 'mentors':
                return <MentorsPage onNavigate={handleNavigate} />;
            case 'mentor':
                return <MentorDetailPage mentorId={dataId} onNavigate={handleNavigate} />;
            case 'messages':
                return <MessagesPage onNavigate={handleNavigate} />;
            case 'profile':
                return <CompanyProfilePage onNavigate={handleNavigate} />;
            default:
                return <Dashboard onNavigate={handleNavigate} />;
        }
    };
    // ##########################

    if (view === 'landing') {
        return <Landing onStart={() => handleNavigate('dashboard')} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <Navbar onNavigate={handleNavigate} currentView={view} />
            <main className="pt-16">
                {renderView()}
            </main>
        </div>
    );
};

export default App;

