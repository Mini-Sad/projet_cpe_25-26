import React, { useState } from 'react';
// Icônes nécessaires pour la vue Mentor
import { Users, MessageSquare, User, Search, Filter, MapPin, Clock, Star, ArrowRight, Check, Target, Send, Menu, X, ChevronRight, GraduationCap, Sparkles, Edit2, Camera } from 'lucide-react';

// La configuration Tailwind est supposée être chargée globalement


// ==================== DONNÉES FAKE (CÔTÉ MENTOR) ====================

// Le profil de l'employé/mentor connecté
// ### MIS À JOUR ###
const MENTOR_PROFILE = {
  id: 1,
  name: "Thomas Bernard",
  title: "Principal Product Manager (AWS)",
  photo: "https://i.pravatar.cc/400?img=13",
  bio: "Passionné par le cloud et la stratégie produit, je lance des services AWS à grande échelle. Je guide sur la préparation aux entretiens PM d'Amazon.",
  expertise: ["Product Management", "Cloud (AWS)", "Go-to-Market", "Narrative writing", "Stratégie"],
  availability: "1-2h / mois",
  
  // ### SECTION MISE À JOUR (plus spécifique) ###
  personalInterests: {
    topics: ["Football", "Piano (Jazz)", "Voyages (Asie)", "Python"],
    details: "Je suis un grand fan de football (je joue 3 fois par semaine en club amateur) et je joue du piano, surtout du jazz. J'adore voyager en Asie (Vietnam et Chine récemment). Côté tech, même si je suis PM, j'aime scripter en Python pour analyser des données."
  }
  // #############################
};
// ################

// Les étudiants qui "matchent" avec Thomas
const STUDENT_MATCHES = [
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
    matchScore: { overall: 92, expertise: 95, goals: 90, personality: 88 },
    status: "Connecté" // Déjà en contact
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
    matchScore: { overall: 75, expertise: 70, goals: 78, personality: 77 },
    status: "Nouveau Match" // Pas encore en contact
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
    matchScore: { overall: 70, expertise: 65, goals: 72, personality: 74 },
    status: "Nouveau Match" // Match plus faible, mais tech
  }
];

// Messages du point de vue du Mentor
const MESSAGES = [
  {
    id: 1,
    studentName: "Alex Martin",
    school: "IMT-BS",
    photo: "https://i.pravatar.cc/400?img=33",
    lastMessage: "Merci ! J'ai hâte d'en discuter. Je suis dispo...",
    timestamp: "Il y a 20min",
    unread: true,
  },
  {
    id: 2,
    studentName: "Chloé Dubois",
    school: "HETIC",
    photo: "https://i.pravatar.cc/400?img=31",
    lastMessage: "Bonjour M. Bernard, j'ai vu votre profil et...",
    timestamp: "Il y a 2j",
    unread: true, // Nouvelle demande
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

// ==================== COMPOSANTS SPÉCIFIQUES (MENTOR) ====================

const StudentMatchCard = ({ student, onClick }) => {
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
        <MatchScore score={student.matchScore.overall} size="small" />
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

// ==================== COMPOSANT DE NAVIGATION (MENTOR) ====================

const Navbar = ({ onNavigate, currentView }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Mes Matchs', view: 'dashboard', icon: Sparkles },
        { name: 'Messages', view: 'messages', icon: MessageSquare, badge: MESSAGES.filter(m => m.unread).length },
        { name: 'Mon Profil', view: 'profile', icon: User },
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
                        <span className="ml-2 text-sm text-tm-teal hidden md:inline">| Espace Mentor</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-2 lg:space-x-4">
                        {navItems.map(item => (
                            <NavLink key={item.view} item={item} />
                        ))}
                    </div>
                    
                    <div className="hidden md:flex items-center gap-3">
                      <img src={MENTOR_PROFILE.photo} alt={MENTOR_PROFILE.name} className="w-8 h-8 rounded-full" />
                      <span className="text-sm font-medium text-gray-700">{MENTOR_PROFILE.name}</span>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} icon={isOpen ? X : Menu} className="!p-1.5 text-gray-700" />
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-100">
                    {navItems.map(item => (
                        <NavLink key={item.view} item={item} isMobile={true} />
                    ))}
                    <div className="pt-2 border-t mt-2 px-4">
                        <p className="text-sm font-medium text-gray-700">{MENTOR_PROFILE.name}</p>
                        <p className="text-xs text-gray-500">{MENTOR_PROFILE.title}</p>
                    </div>
                </div>
            )}
        </nav>
    );
};


// ==================== PAGES (MENTOR) ====================

const DashboardPage = ({ onNavigate }) => {
  const [filter, setFilter] = useState('all');
  
  const filteredMatches = STUDENT_MATCHES.filter(student => {
    if (filter === 'all') return true;
    return student.status === filter;
  }).sort((a, b) => b.matchScore.overall - a.matchScore.overall);
  
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-poppins mb-2">Vos Matchs Étudiants</h1>
        <p className="text-gray-600">Voici les étudiants dont le profil correspond le mieux à votre expertise.</p>
      </div>
      
      <div className="flex gap-2 mb-4 border-b border-gray-200">
        <button 
          onClick={() => setFilter('all')}
          className={`py-2 px-4 text-sm font-medium ${filter === 'all' ? 'border-b-2 border-tm-indigo text-tm-indigo' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Tous ({STUDENT_MATCHES.length})
        </button>
        <button 
          onClick={() => setFilter('Nouveau Match')}
          className={`py-2 px-4 text-sm font-medium ${filter === 'Nouveau Match' ? 'border-b-2 border-tm-indigo text-tm-indigo' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Nouveaux Matchs ({STUDENT_MATCHES.filter(s => s.status === 'Nouveau Match').length})
        </button>
         <button 
          onClick={() => setFilter('Connecté')}
          className={`py-2 px-4 text-sm font-medium ${filter === 'Connecté' ? 'border-b-2 border-tm-indigo text-tm-indigo' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Connectés ({STUDENT_MATCHES.filter(s => s.status === 'Connecté').length})
        </button>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMatches.map(student => (
          <StudentMatchCard key={student.id} student={student} onClick={() => onNavigate('student', student.id)} />
        ))}
      </div>
    </div>
  );
};

const StudentProfilePage = ({ studentId, onNavigate }) => {
  const student = STUDENT_MATCHES.find(s => s.id === studentId);
  
  if (!student) return <div className="p-6">Étudiant non trouvé</div>;

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl p-8 mb-6">
        <button 
          onClick={() => onNavigate('dashboard')}
          className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-1 text-sm"
        >
          <ChevronRight size={16} className='transform rotate-180' /> Retour aux matchs
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
            <MatchScore score={student.matchScore.overall} size="large" />
            <p className="text-sm text-gray-600 mt-2">Match avec vous</p>
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
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold mb-2">Contacter {student.name.split(' ')[0]}</h3>
        <p className="text-sm text-gray-600 mb-4">
          {student.status === 'Connecté' ? 'Vous êtes déjà en contact.' : 'Cet étudiant semble être un bon match pour vous.'}
        </p>
        <Button size="large" onClick={() => onNavigate('messages')} className="w-full md:w-auto" icon={Send}>
          {student.status === 'Connecté' ? 'Voir la conversation' : 'Envoyer un message'}
        </Button>
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
        {/* Liste des conversations */}
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
                  <img src={msg.photo} alt={msg.studentName} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-semibold text-sm truncate ${msg.unread ? 'text-gray-900' : 'text-gray-700'}`}>{msg.studentName}</h4>
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
        
        {/* Fenêtre de chat */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-4 border-b flex items-center gap-3">
            <img src={selectedMessage.photo} alt={selectedMessage.studentName} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <h3 className="font-semibold">{selectedMessage.studentName}</h3>
              <p className="text-sm text-gray-600">{selectedMessage.school}</p>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {/* Simulation de chat */}
            <div className="flex gap-2 items-end mb-4">
              <img src={selectedMessage.photo} alt="" className="w-8 h-8 rounded-full flex-shrink-0" />
              <div className="bg-white rounded-2xl rounded-tl-none p-3 max-w-md shadow-md">
                <p className="text-sm">Bonjour M. Bernard, j'ai vu votre profil et votre expertise en PM chez AWS m'intéresse beaucoup...</p>
              </div>
            </div>
            <div className="flex gap-2 justify-end items-end mb-4">
              <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-none p-3 max-w-md shadow-md">
                <p className="text-sm">Bonjour Alex, ravi de te rencontrer. Bien sûr, parlons-en. Quelles sont tes questions ?</p>
              </div>
              <img src={MENTOR_PROFILE.photo} alt="" className="w-8 h-8 rounded-full flex-shrink-0" />
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
              <input type="text" placeholder={`Écrire à ${selectedMessage.studentName}...`} className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <button className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors"><Send size={18} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ### COMPOSANT MIS À JOUR ###
const MentorProfilePage = () => {
  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-poppins">Mon Profil Mentor</h1>
        <Button variant="outline" icon={Edit2}>Modifier</Button>
      </div>
      
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
          <div className="relative flex-shrink-0">
            <img src={MENTOR_PROFILE.photo} alt={MENTOR_PROFILE.name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
            <button className="absolute bottom-1 right-1 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 border-2 border-white">
              <Camera size={18} />
            </button>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold font-poppins mb-2">{MENTOR_PROFILE.name}</h2>
            <p className="text-lg text-gray-700 mb-3">{MENTOR_PROFILE.title}</p>
            <Badge color="gray"><Clock size={12} className="inline mr-1" /> {MENTOR_PROFILE.availability}</Badge>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2 text-lg">Ma biographie (vue par les étudiants)</h3>
          <p className="text-gray-700 mb-6 pb-6 border-b border-gray-100">{MENTOR_PROFILE.bio}</p>
          
          <h3 className="font-semibold mb-3 text-lg">Mes domaines d'expertise</h3>
          <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-gray-100">
            {MENTOR_PROFILE.expertise.map((exp, i) => (
              <Badge key={i} color="primary" size="medium">{exp}</Badge>
            ))}
          </div>
          
          {/* ### SECTION MISE À JOUR ### */}
          <h3 className="font-semibold mb-3 text-lg flex items-center gap-2">
            <Sparkles size={20} className="text-tm-pink" />
            Mes centres d'intérêt personnels
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {MENTOR_PROFILE.personalInterests.topics.map((topic, i) => (
              <Badge key={i} color="secondary" size="medium">{topic}</Badge>
            ))}
          </div>
          <p className="text-gray-700 text-sm">
            {MENTOR_PROFILE.personalInterests.details}
          </p>
          {/* ############################## */}
          
        </div>
      </div>
    </div>
  );
};
// ##########################


// ==================== COMPOSANT PRINCIPAL (ROUTER) ====================

const App = () => {
    // view state: 'dashboard' (matches), 'student' (profil d'un étudiant), 'messages', 'profile' (profil du mentor)
    const [view, setView] = useState('dashboard');
    const [dataId, setDataId] = useState(null); // For studentId

    const handleNavigate = (newView, id = null) => {
        setView(newView);
        setDataId(id);
        window.scrollTo(0, 0);
    };

    const renderView = () => {
        switch (view) {
            case 'dashboard':
                return <DashboardPage onNavigate={handleNavigate} />;
            case 'student':
                return <StudentProfilePage studentId={dataId} onNavigate={handleNavigate} />;
            case 'messages':
                return <MessagesPage onNavigate={handleNavigate} />;
            case 'profile':
                return <MentorProfilePage onNavigate={handleNavigate} />;
            default:
                return <DashboardPage onNavigate={handleNavigate} />;
        }
    };

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
