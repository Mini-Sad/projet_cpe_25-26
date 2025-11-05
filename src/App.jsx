import React, { useState } from 'react';
import { Camera, Users, Briefcase, MessageSquare, User, Search, Filter, MapPin, Clock, Star, ArrowRight, Check, TrendingUp, Target, Heart, Send, Menu, X, ChevronRight, Building2, GraduationCap, Sparkles, AlertTriangle } from 'lucide-react';

// Configuration Tailwind CSS pour les couleurs du projet
// Note: Le système d'imagerie est désactivé pour la démonstration React car il nécessite des URLs externes.
const tailwindConfig = `
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'tm-indigo': '#6366F1', // Primary
                        'tm-pink': '#EC4899', // Secondary / Connection
                        'tm-teal': '#14B8A6', // Accent / Growth
                        'tm-success': '#10B981', // Match Success
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        poppins: ['Poppins', 'sans-serif'],
                    },
                }
            }
        }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
`;

// Injecte la configuration Tailwind et les polices
document.head.insertAdjacentHTML('beforeend', tailwindConfig);


// ==================== DONNÉES FAKE ====================

const STUDENT_PROFILE = {
  name: "Alex Martin",
  school: "IMT-BS",
  program: "Master in Management",
  graduationYear: 2026,
  photo: "https://i.pravatar.cc/400?img=33",
  interests: ["Product Management", "Startups", "SaaS", "IA/ML", "Innovation", "Data Analytics"],
  goals: ["Devenir PM dans une entreprise tech", "Lancer ma propre startup"],
  values: ["Innovation", "Équilibre vie pro/perso", "Apprentissage continu", "Impact"],
  personalityType: "L'Innovateur",
  personalityTraits: {
    analytique: 88,
    créatif: 85,
    autonome: 92,
    collaboratif: 78,
    détailOrienté: 81
  },
  cvUploaded: true,
  mentorConnections: {
    active: 7,
    limit: 10,
    remaining: 3
  }
};

const MENTORS = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Product Manager",
    company: "Datadog",
    photo: "https://i.pravatar.cc/400?img=1",
    location: "Paris",
    school: "IMT-BS '15",
    expertise: ["Product Management", "B2B SaaS", "Data Analytics", "Leadership"],
    bio: "J'ai passé 7 ans à construire des produits qui évoluent chez Datadog. Je suis passionnée par l'accompagnement des jeunes talents vers des carrières en product management.",
    availability: "1h/mois",
    matchScore: { overall: 87, personality: 92, goals: 85, background: 84, expertise: 88 },
    industry: "Tech",
    menteeCount: 12
  },
  {
    id: 2,
    name: "Marc Dubois",
    title: "Engineering Manager",
    company: "BlaBlaCar",
    photo: "https://i.pravatar.cc/400?img=12",
    location: "Paris",
    school: "Télécom Paris '13",
    expertise: ["Engineering", "Team Management", "Architecture", "Startup Growth"],
    bio: "Ancien développeur devenu manager, je guide les ingénieurs juniors dans leur transition vers le leadership technique.",
    availability: "1h/mois",
    matchScore: { overall: 82, personality: 85, goals: 80, background: 83, expertise: 79 },
    industry: "Tech",
    menteeCount: 8
  },
  {
    id: 3,
    name: "Léa Rousseau",
    title: "Consultante Senior",
    company: "BCG",
    photo: "https://i.pravatar.cc/400?img=5",
    location: "Paris",
    school: "HEC '16",
    expertise: ["Stratégie", "Conseil", "Transformation Digitale", "Leadership"],
    bio: "Spécialisée en transformation digitale, j'aide les étudiants à comprendre le monde du conseil et à préparer leurs entretiens.",
    availability: "2h/mois",
    matchScore: { overall: 79, personality: 81, goals: 78, background: 80, expertise: 75 },
    industry: "Conseil",
    menteeCount: 15
  },
  {
    id: 4,
    name: "Thomas Bernard",
    title: "Data Scientist",
    company: "Alan",
    photo: "https://i.pravatar.cc/400?img=13",
    location: "Paris",
    school: "ENSIIE '17",
    expertise: ["Data Science", "Machine Learning", "Python", "IA"],
    bio: "Passionné par l'IA appliquée à la santé, je partage mon expérience en data science et aide à naviguer ce domaine en pleine expansion.",
    availability: "1h/mois",
    matchScore: { overall: 85, personality: 87, goals: 84, background: 86, expertise: 83 },
    industry: "Tech",
    menteeCount: 6
  },
  {
    id: 5,
    name: "Julie Moreau",
    title: "UX Designer Lead",
    company: "Doctolib",
    photo: "https://i.pravatar.cc/400?img=9",
    location: "Paris",
    school: "Gobelins '14",
    expertise: ["UX Design", "Product Design", "User Research", "Design Systems"],
    bio: "Je crée des expériences utilisateur centrées sur l'humain. Mon objectif : démystifier le design et aider les juniors à construire des portfolios impactants.",
    availability: "1h/mois",
    matchScore: { overall: 76, personality: 79, goals: 75, background: 74, expertise: 76 },
    industry: "Tech",
    menteeCount: 10
  },
  {
    id: 6,
    name: "Alexandre Martin",
    title: "Investment Associate",
    company: "BNP Paribas",
    photo: "https://i.pravatar.cc/400?img=15",
    location: "Paris",
    school: "ESSEC '15",
    expertise: ["Finance", "M&A", "Private Equity", "Valorisation"],
    bio: "Spécialiste en finance d'entreprise, je guide les étudiants intéressés par la banque d'investissement et le private equity.",
    availability: "1h/mois",
    matchScore: { overall: 71, personality: 73, goals: 70, background: 72, expertise: 68 },
    industry: "Finance",
    menteeCount: 9
  },
  {
    id: 7,
    name: "Camille Petit",
    title: "Marketing Manager",
    company: "L'Oréal",
    photo: "https://i.pravatar.cc/400?img=10",
    location: "Paris",
    school: "ESCP '16",
    expertise: ["Marketing Digital", "Brand Management", "Social Media", "Stratégie"],
    bio: "Experte en marketing digital et gestion de marque dans le luxe. Je partage les secrets d'une carrière marketing réussie.",
    availability: "1h/mois",
    matchScore: { overall: 74, personality: 76, goals: 73, background: 75, expertise: 72 },
    industry: "Luxe & Beauté",
    menteeCount: 13
  },
  {
    id: 8,
    name: "Pierre Lefevre",
    title: "Solutions Architect",
    company: "Contentsquare",
    photo: "https://i.pravatar.cc/400?img=18",
    location: "Paris",
    school: "CentraleSupélec '14",
    expertise: ["Architecture Cloud", "DevOps", "AWS", "Scalabilité"],
    bio: "J'aide les entreprises à construire des architectures scalables. Passionné par le mentorat technique et le partage de bonnes pratiques.",
    availability: "1h/mois",
    matchScore: { overall: 83, personality: 86, goals: 81, background: 84, expertise: 80 },
    industry: "Tech",
    menteeCount: 7
  }
];

const JOBS = [
  {
    id: 1,
    title: "Stage Product Manager",
    company: "Alan",
    type: "Stage",
    duration: "6 mois",
    location: "Paris",
    remote: "Hybride",
    postedDate: "2025-10-28",
    matchScore: { overall: 89, skills: 91, culture: 88, goals: 87 },
    whyMatch: [
      "Votre objectif de carrière PM correspond parfaitement",
      "Fort fit culturel basé sur vos valeurs (Innovation, Impact)",
      "3 mentors Alan disponibles sur la plateforme"
    ],
    description: "Rejoins l'équipe produit d'Alan pour révolutionner l'assurance santé en France. Tu travailleras sur des fonctionnalités impactant 500K+ utilisateurs.",
    requirements: ["Bac+4/5 en Business ou Ingénierie", "Intérêt pour la healthtech", "Esprit analytique"],
    salary: "1 400€/mois",
    industry: "Tech"
  },
  {
    id: 2,
    title: "Développeur Full-Stack Junior",
    company: "BlaBlaCar",
    type: "CDI",
    location: "Paris",
    remote: "Hybride",
    postedDate: "2025-10-25",
    matchScore: { overall: 84, skills: 86, culture: 83, goals: 82 },
    whyMatch: [
      "Tes compétences techniques correspondent aux besoins",
      "Environnement startup scale-up (ton objectif)",
      "2 mentors BlaBlaCar disponibles"
    ],
    description: "Développe des fonctionnalités pour 100M d'utilisateurs à travers le monde. Stack moderne : React, Node.js, AWS.",
    requirements: ["Diplôme d'ingénieur", "Expérience React/Node", "Anglais courant"],
    salary: "42-48K€",
    industry: "Tech"
  },
  {
    id: 3,
    title: "Business Analyst",
    company: "BCG",
    type: "CDI",
    location: "Paris",
    remote: "Présentiel",
    postedDate: "2025-10-30",
    matchScore: { overall: 78, skills: 80, culture: 77, goals: 76 },
    whyMatch: [
      "Tes compétences analytiques sont valorisées",
      "Exposition à de multiples industries",
      "1 mentor BCG disponible"
    ],
    description: "Résous des problèmes stratégiques complexes pour des clients du CAC40. Formation continue et évolution rapide.",
    requirements: ["Top école (HEC, X, Centrale...)", "Excellentes compétences analytiques", "Anglais bilingue"],
    salary: "50-55K€",
    industry: "Conseil"
  },
  {
    id: 4,
    title: "Data Scientist Intern",
    company: "Datadog",
    type: "Stage",
    duration: "6 mois",
    location: "Paris",
    remote: "Hybride",
    postedDate: "2025-11-01",
    matchScore: { overall: 86, skills: 89, culture: 85, goals: 84 },
    whyMatch: [
      "Ton intérêt pour l'IA/ML est parfaitement aligné",
      "Environnement tech de pointe",
      "1 mentor Datadog (Sarah Chen) disponible"
    ],
    description: "Travaille sur des modèles de ML pour analyser des milliards de data points. Impact direct sur le produit.",
    requirements: ["École d'ingénieur", "Python/ML", "Passion pour les données"],
    salary: "1 500€/mois",
    industry: "Tech"
  },
  {
    id: 5,
    title: "UX Designer Junior",
    company: "Doctolib",
    type: "CDI",
    location: "Paris",
    remote: "Hybride",
    postedDate: "2025-10-20",
    matchScore: { overall: 75, skills: 77, culture: 74, goals: 73 },
    whyMatch: [
      "Ta créativité correspond au rôle",
      "Impact social (santé pour tous)",
      "1 mentor Doctolib disponible"
    ],
    description: "Conçois des interfaces utilisées par 80M d'Européens. Équipe design de 40+ personnes.",
    requirements: ["Portfolio solide", "Maîtrise Figma", "User-centric mindset"],
    salary: "40-45K€",
    industry: "Tech"
  }
];

const MESSAGES = [
  {
    id: 1,
    mentor: "Sarah Chen",
    company: "Datadog",
    photo: "https://i.pravatar.cc/400?img=1",
    lastMessage: "Merci de m'avoir contacté ! J'adorerais discuter des carrières PM.",
    timestamp: "Il y a 2h",
    unread: true,
    status: "accepted"
  },
  {
    id: 2,
    mentor: "Marc Dubois",
    company: "BlaBlaCar",
    photo: "https://i.pravatar.cc/400?img=12",
    lastMessage: "Quand es-tu disponible pour notre prochaine session ?",
    timestamp: "Il y a 1j",
    unread: false,
    status: "active"
  },
  {
    id: 3,
    mentor: "Thomas Bernard",
    company: "Alan",
    photo: "https://i.pravatar.cc/400?img=13",
    lastMessage: "Super ! Voici quelques ressources sur le ML...",
    timestamp: "Il y a 3j",
    unread: false,
    status: "active"
  }
];

// ==================== COMPOSANTS UI PARTIELS ====================

const Button = ({ children, variant = "primary", size = "medium", className = "", onClick, icon: Icon, disabled = false }) => {
  const variants = {
    primary: "bg-tm-indigo text-white hover:bg-indigo-700",
    secondary: "bg-tm-pink text-white hover:bg-pink-600",
    outline: "border-2 border-tm-indigo text-tm-indigo hover:bg-indigo-50",
    ghost: "text-gray-700 hover:bg-gray-100"
  };
  
  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg"
  };
  
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button 
      onClick={!disabled ? onClick : null}
      className={`${variants[variant]} ${sizes[size]} rounded-lg font-medium transition-all flex items-center gap-2 ${className} ${disabledClass}`}
      disabled={disabled}
    >
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
    gray: "bg-gray-100 text-gray-700"
  };
  
  const sizes = {
    small: "px-2 py-0.5 text-xs",
    medium: "px-3 py-1 text-sm"
  };
  
  return (
    <span className={`${colors[color]} ${sizes[size]} rounded-full font-medium inline-block whitespace-nowrap`}>
      {children}
    </span>
  );
};

const MatchScore = ({ score, size = "medium" }) => {
  const getColor = (score) => {
    if (score >= 85) return "text-tm-success border-tm-success";
    if (score >= 70) return "text-amber-600 border-amber-600";
    return "text-red-600 border-red-600";
  };
  
  const sizes = {
    small: "w-12 h-12 text-sm",
    medium: "w-16 h-16 text-lg",
    large: "w-24 h-24 text-2xl"
  };
  
  return (
    <div className={`${sizes[size]} rounded-full border-4 ${getColor(score)} flex items-center justify-center font-bold font-poppins flex-shrink-0`}>
      {score}%
    </div>
  );
};

const MentorCard = ({ mentor, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100 hover:scale-[1.02]"
    >
      <div className="flex items-start gap-3 mb-3">
        <img src={mentor.photo} alt={mentor.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{mentor.name}</h3>
          <p className="text-sm text-gray-600 truncate">{mentor.title}</p>
          <p className="text-sm text-indigo-600 font-medium truncate">{mentor.company}</p>
        </div>
        <MatchScore score={mentor.matchScore.overall} size="small" />
      </div>
      
      <div className="flex flex-wrap gap-1.5 mb-3">
        {mentor.expertise.slice(0, 3).map((exp, i) => (
          <Badge key={i} color="gray" size="small">{exp}</Badge>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <MapPin size={12} /> {mentor.location}
        </span>
        <span className="flex items-center gap-1">
          <Users size={12} /> {mentor.menteeCount} étudiants
        </span>
      </div>
    </div>
  );
};

const JobCard = ({ job, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100 hover:scale-[1.02]"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">{job.title}</h3>
          <p className="text-indigo-600 font-medium mb-2 truncate">{job.company}</p>
          <div className="flex flex-wrap gap-2">
            <Badge color="primary" size="small">{job.type}</Badge>
            <Badge color="gray" size="small">{job.location}</Badge>
            <Badge color="gray" size="small">{job.remote}</Badge>
          </div>
        </div>
        <MatchScore score={job.matchScore.overall} size="small" />
      </div>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{job.description}</p>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-green-600 font-semibold">{job.salary}</span>
        <span className="text-gray-500 text-xs">{job.postedDate}</span>
      </div>
    </div>
  );
};

// ==================== COMPOSANT DE NAVIGATION ====================

const Navbar = ({ onNavigate, currentView }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', view: 'dashboard', icon: Briefcase },
        { name: 'Profile', view: 'profile', icon: User },
        { name: 'Mentors', view: 'mentors', icon: Users },
        { name: 'Opportunités', view: 'opportunities', icon: Search },
        { name: 'Messages', view: 'messages', icon: MessageSquare, badge: MESSAGES.filter(m => m.unread).length }
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
                        <h1 className="text-2xl font-poppins font-bold text-indigo-600">TalentMatch</h1>
                        <span className="ml-2 text-sm text-gray-500 hidden md:inline">| {STUDENT_PROFILE.school}</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-2 lg:space-x-4">
                        {navItems.map(item => (
                            <NavLink key={item.view} item={item} />
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} icon={isOpen ? X : Menu} className="!p-1.5 text-gray-700">
                            {/* Hidden text for better touch target */}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-100">
                    {navItems.map(item => (
                        <NavLink key={item.view} item={item} isMobile={true} />
                    ))}
                    <div className="pt-2 border-t mt-2">
                        <p className="text-sm text-gray-500 px-4">Connexions: {STUDENT_PROFILE.mentorConnections.active}/{STUDENT_PROFILE.mentorConnections.limit}</p>
                    </div>
                </div>
            )}
        </nav>
    );
};


// ==================== PAGES ====================

const Landing = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Sparkles size={16} />
            <span className="text-sm font-medium">Matching scientifique par personnalité</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6">
            Trouve Ton Fit Professionnel Parfait
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Le matching basé sur la science connecte étudiants, mentors et opportunités. Fini les candidatures à l'aveugle.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button onClick={onStart} size="large" variant="secondary" icon={ArrowRight}>
              Essayer la démo
            </Button>
            <Button size="large" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
              En savoir plus
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-sm opacity-80">Écoles partenaires</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-sm opacity-80">Entreprises</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5K</div>
              <div className="text-sm opacity-80">Étudiants</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold font-poppins text-center mb-12">Le Problème</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="text-tm-pink" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Étudiants</h3>
              <p className="text-gray-600 text-sm mb-3">78% candidatent sans comprendre la culture d'entreprise</p>
              <ul className="text-sm text-gray-600 space-y-1 list-disc ml-4">
                <li>Pas de mentors accessibles</li>
                <li>Conseils carrière génériques</li>
                <li>Mauvais choix de carrière</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Building2 className="text-tm-indigo" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Entreprises</h3>
              <p className="text-gray-600 text-sm mb-3">€15K+ coût moyen par mauvais recrutement</p>
              <ul className="text-sm text-gray-600 space-y-1 list-disc ml-4">
                <li>30% partent la 1ère année</li>
                <li>Pas de fit culturel</li>
                <li>Ressources gaspillées</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <Target className="text-tm-teal" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Écoles</h3>
              <p className="text-gray-600 text-sm mb-3">Taux d'emploi = KPI #1 mais services limités</p>
              <ul className="text-sm text-gray-600 space-y-1 list-disc ml-4">
                <li>Alumni sous-utilisés</li>
                <li>Étudiants insatisfaits</li>
                <li>Baisse de classement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ onNavigate }) => {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-poppins mb-2 text-gray-900">Bienvenue, {STUDENT_PROFILE.name} ! 👋</h1>
        <div className='flex items-center gap-3'>
            <Badge color="secondary">{STUDENT_PROFILE.personalityType}</Badge>
            <p className='text-sm text-gray-500'>Prêt à matcher ton potentiel.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Match Moyen</span>
            <TrendingUp className="text-tm-success" size={20} />
          </div>
          <div className="text-3xl font-bold font-poppins text-gray-900">87%</div>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Mentors Actifs</span>
            <Users className="text-tm-indigo" size={20} />
          </div>
          <div className="text-3xl font-bold font-poppins text-gray-900">{STUDENT_PROFILE.mentorConnections.active}/10</div>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Opportunités</span>
            <Briefcase className="text-tm-pink" size={20} />
          </div>
          <div className="text-3xl font-bold font-poppins text-gray-900">{JOBS.length}</div>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Messages</span>
            <MessageSquare className="text-tm-teal" size={20} />
          </div>
          <div className="text-3xl font-bold font-poppins text-gray-900">{MESSAGES.filter(m => m.unread).length} <span className="text-sm text-gray-500">nouveaux</span></div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-poppins">Top Matches Pour Toi</h2>
          <Button variant="ghost" onClick={() => onNavigate('mentors')} icon={ArrowRight}>
            Voir tous
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MENTORS.slice(0, 3).map(mentor => (
            <MentorCard key={mentor.id} mentor={mentor} onClick={() => onNavigate('mentor', mentor.id)} />
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-poppins">Opportunités Qui Te Correspondent</h2>
          <Button variant="ghost" onClick={() => onNavigate('opportunities')} icon={ArrowRight}>
            Voir toutes
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {JOBS.slice(0, 2).map(job => (
            <JobCard key={job.id} job={job} onClick={() => onNavigate('job', job.id)} />
          ))}
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
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-poppins mb-4">Mentors</h1>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-amber-800 text-sm md:text-base">
              <strong>{STUDENT_PROFILE.mentorConnections.active}/{STUDENT_PROFILE.mentorConnections.limit}</strong> connexions mentors utilisées cette année
            </span>
            <Badge color="warning">{STUDENT_PROFILE.mentorConnections.remaining} restantes</Badge>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 sticky top-20">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
  
  const handleRequestMentorship = () => {
    // Simulation: check limit and navigate to messages
    if (STUDENT_PROFILE.mentorConnections.remaining > 0) {
        // In a real app, this would update the database and reduce the remaining count
        alert(`Demande de mentorat envoyée à ${mentor.name} !`); // Use alert for simple demo state
        onNavigate('messages');
    }
  }

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl p-8 mb-6">
        <button 
          onClick={() => onNavigate('mentors')}
          className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-1 text-sm"
        >
          <ChevronRight size={16} className='transform rotate-180' /> Retour aux mentors
        </button>
        
        <div className="flex flex-col md:flex-row items-start gap-6">
          <img src={mentor.photo} alt={mentor.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg flex-shrink-0" />
          
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold font-poppins mb-2">{mentor.name}</h1>
            <p className="text-lg md:text-xl text-gray-700 mb-1">{mentor.title}</p>
            <p className="text-base text-indigo-600 font-medium mb-3">{mentor.company}</p>
            
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
          
          <div className="md:text-right flex flex-col items-start md:items-end">
            <div 
              className="cursor-pointer"
              onClick={() => setShowBreakdown(true)}
            >
              <MatchScore score={mentor.matchScore.overall} size="large" />
              <p className="text-sm text-gray-600 mt-2 hover:underline">Voir détails</p>
            </div>
          </div>
        </div>
      </div>
      
      {showBreakdown && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowBreakdown(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold font-poppins mb-6">Détails du Match</h3>
            
            {[
              { label: 'Personnalité (35% du poids)', score: mentor.matchScore.personality, color: 'indigo' },
              { label: 'Objectifs carrière (25% du poids)', score: mentor.matchScore.goals, color: 'pink' },
              { label: 'Background (20% du poids)', score: mentor.matchScore.background, color: 'teal' },
              { label: 'Expertise (15% du poids)', score: mentor.matchScore.expertise, color: 'purple' }
            ].map((item, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm font-bold text-gray-900">{item.score}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-${item.color}-500`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
            
            <p className='text-xs text-gray-500 mt-6'>Ces scores sont pondérés par un facteur pratique (5%) non affiché.</p>
            
            <Button onClick={() => setShowBreakdown(false)} className="w-full mt-4">
              Fermer
            </Button>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-bold font-poppins mb-4">À propos</h2>
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
            <Button size="large" onClick={handleRequestMentorship} className="w-full md:w-auto" icon={Send}>
              Demander un mentorat
            </Button>
          </>
        ) : (
          <div className='p-3 bg-red-50 border border-red-200 rounded-lg'>
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-red-800"><AlertTriangle size={20} /> Limite atteinte</h3>
            <p className="text-sm text-red-700">
              Tu as utilisé tes {STUDENT_PROFILE.mentorConnections.limit} connexions pour cette année. Reviens en 2026 !
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold font-poppins mb-4">Tu pourrais aussi aimer</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-poppins mb-2">Opportunités</h1>
        <p className="text-gray-600">Découvre les postes qui correspondent à ton profil</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 sticky top-20">
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
                {/* Altternance is not in mock data but is good practice to include */}
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
          <div className="grid sm:grid-cols-2 gap-4">
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
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <button 
        onClick={() => onNavigate('opportunities')}
        className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-1 text-sm"
      >
        <ChevronRight size={16} className='transform rotate-180' /> Retour aux opportunités
      </button>
      
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold font-poppins mb-2">{job.title}</h1>
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
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-4 mt-4">
          <span className="flex items-center gap-1">
            <MapPin size={16} /> {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={16} /> Publié le {job.postedDate}
          </span>
          <span className="text-tm-success font-semibold text-base ml-auto">{job.salary}</span>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 mb-6 border border-green-200">
        <h2 className="text-xl font-bold font-poppins mb-4 flex items-center gap-2 text-gray-900">
          <Check className="text-tm-success" />
          Pourquoi ce poste te correspond
        </h2>
        <div className="space-y-3">
          {job.whyMatch.map((reason, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-tm-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
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
                    <div className="h-full bg-tm-success" style={{width: `${item.score}%`}} />
                  </div>
                  <span className="text-sm font-bold">{item.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-bold font-poppins mb-4">Description du poste</h2>
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
          <Button size="large" icon={Send} onClick={() => alert(`Postuler à ${job.title} chez ${job.company}`)}>
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
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold font-poppins mb-6">Messages</h1>
      
      <div className="flex flex-col md:flex-row gap-4 h-[600px]">
        <div className="w-full md:w-80 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col flex-shrink-0">
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
                    <img src={msg.photo} alt={msg.mentor} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-semibold text-sm truncate ${msg.unread ? 'text-gray-900' : 'text-gray-700'}`}>{msg.mentor}</h4>
                        {msg.unread && <div className="w-2 h-2 bg-tm-pink rounded-full flex-shrink-0" />}
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
                <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full shadow-md">
                  {selectedMessage.mentor} a accepté ta demande de mentorat
                </span>
              </div>
              
              <div className="flex gap-2 items-end">
                <img src={selectedMessage.photo} alt="" className="w-8 h-8 rounded-full flex-shrink-0" />
                <div className="bg-white rounded-2xl rounded-tl-none p-3 max-w-md shadow-md">
                  <p className="text-sm">{selectedMessage.lastMessage}</p>
                  <span className="text-xs text-gray-400 mt-1 block text-right">Il y a 2h</span>
                </div>
              </div>
              
              <div className="flex gap-2 justify-end items-end">
                <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-none p-3 max-w-md shadow-md">
                  <p className="text-sm">Merci beaucoup ! Je serais ravi d'en apprendre plus sur ton parcours chez Datadog.</p>
                  <span className="text-xs text-indigo-200 mt-1 block text-right">Il y a 1h</span>
                </div>
                <img src={STUDENT_PROFILE.photo} alt="" className="w-8 h-8 rounded-full flex-shrink-0" />
              </div>
              
              {selectedMessage.id === 1 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-2"><Sparkles size={16} /> Suggestions de discussion</p>
                  <div className="space-y-1">
                    <button className="text-sm text-amber-700 hover:text-amber-900 block text-left">
                      • Demande à {selectedMessage.mentor.split(' ')[0]} son parcours d'ingénieur à PM
                    </button>
                    <button className="text-sm text-amber-700 hover:text-amber-900 block text-left">
                      • Quelle est la culture chez {selectedMessage.company} et ses valeurs ?
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
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold font-poppins mb-6">Mon Profil</h1>
      
      <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-xl p-8 mb-6">
        <div className="flex items-start gap-6">
          <div className="relative flex-shrink-0">
            <img src={STUDENT_PROFILE.photo} alt={STUDENT_PROFILE.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg" />
            <button className="absolute bottom-0 right-0 w-8 h-8 md:w-10 md:h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 border-2 border-white">
              <Camera size={18} />
            </button>
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold font-poppins mb-2">{STUDENT_PROFILE.name}</h2>
            <p className="text-gray-700 mb-1">{STUDENT_PROFILE.program}</p>
            <p className="text-gray-600 mb-3">{STUDENT_PROFILE.school} • Promotion {STUDENT_PROFILE.graduationYear}</p>
            <Badge color="secondary" size="medium">{STUDENT_PROFILE.personalityType}</Badge>
          </div>
          
          <Button variant="outline" className='flex-shrink-0'>
            Modifier le profil
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-bold font-poppins mb-4">Ta Personnalité (Match Scientifique)</h2>
        <p className="text-gray-700 mb-6">
          Tu es <strong>{STUDENT_PROFILE.personalityType}</strong> : créatif, analytique et autonome. 
          Tu excelles dans les environnements innovants et aimes résoudre des problèmes complexes.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(STUDENT_PROFILE.personalityTraits).map(([trait, score]) => (
            <div key={trait}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium capitalize text-gray-700">{trait}</span>
                <span className="text-sm font-bold text-gray-900">{score}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-tm-indigo" style={{width: `${score}%`}} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-bold font-poppins mb-4">Objectifs de Carrière</h2>
        <div className="space-y-3">
          {STUDENT_PROFILE.goals.map((goal, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-tm-indigo rounded-full flex items-center justify-center flex-shrink-0">
                <Target size={18} className="text-white" />
              </div>
              <span className="text-gray-700 font-medium">{goal}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-xl font-bold font-poppins mb-4">Intérêts & Valeurs</h2>
        <div className="mb-4">
          <h3 className="font-semibold mb-2 text-gray-700">Domaines d'intérêt</h3>
          <div className="flex flex-wrap gap-2">
            {STUDENT_PROFILE.interests.map((interest, i) => (
              <Badge key={i} color="teal">{interest}</Badge>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2 text-gray-700">Valeurs professionnelles</h3>
          <div className="flex flex-wrap gap-2">
            {STUDENT_PROFILE.values.map((value, i) => (
              <Badge key={i} color="pink">{value}</Badge>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold font-poppins mb-4">Statut CV</h2>
        <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <Check className="text-tm-success" size={24} />
          <p className="text-sm font-medium text-green-800">
            Ton CV a été analysé (NLP) et est prêt pour le matching.
          </p>
        </div>
      </div>
    </div>
  );
};


// ==================== COMPOSANT PRINCIPAL (ROUTER) ====================

const App = () => {
    // view state: 'landing', 'dashboard', 'mentors', 'mentor', 'opportunities', 'job', 'messages', 'profile'
    const [view, setView] = useState('landing');
    const [dataId, setDataId] = useState(null); // For mentorId or jobId

    const handleNavigate = (newView, id = null) => {
        setView(newView);
        setDataId(id);
        window.scrollTo(0, 0); // Scroll to top on navigation
    };

    const renderView = () => {
        switch (view) {
            case 'landing':
                return <Landing onStart={() => handleNavigate('dashboard')} />;
            case 'dashboard':
                return <Dashboard onNavigate={handleNavigate} />;
            case 'mentors':
                return <MentorsPage onNavigate={handleNavigate} />;
            case 'mentor':
                return <MentorProfile mentorId={dataId} onNavigate={handleNavigate} />;
            case 'opportunities':
                return <OpportunitiesPage onNavigate={handleNavigate} />;
            case 'job':
                return <JobDetail jobId={dataId} onNavigate={handleNavigate} />;
            case 'messages':
                return <MessagesPage onNavigate={handleNavigate} />;
            case 'profile':
                return <ProfilePage onNavigate={handleNavigate} />;
            default:
                return <Dashboard onNavigate={handleNavigate} />;
        }
    };

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
