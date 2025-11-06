import React, { useState, useEffect } from 'react'; // Import corrigé
import { Camera, Users, Briefcase, MessageSquare, User, Search, Filter, MapPin, Clock, Star, ArrowRight, Check, TrendingUp, Target, Heart, Send, Menu, X, ChevronRight, Building2, GraduationCap, Sparkles, Sliders } from 'lucide-react';
// 'react-responsive' a été supprimé car il n'est pas disponible dans cet environnement.

// ==================== HOOKS (Corrigé) ====================
/**
 * Hook personnalisé pour détecter si la vue est mobile en fonction de la largeur de la fenêtre.
 * Remplace le paquet 'react-responsive' qui n'est pas disponible.
 */
const useIsMobile = (maxWidth = 768) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= maxWidth);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= maxWidth);
        };

        window.addEventListener('resize', handleResize);
        // Nettoyage au démontage du composant
        return () => window.removeEventListener('resize', handleResize);
    }, [maxWidth]); // Se ré-exécute si la largeur max change

    return isMobile;
};

// ==================== DONNÉES FAKE (Fit-In) ====================

const STUDENT_PROFILE = {
    name: "Alex Martin",
    school: "IMT-BS",
    program: "Master in Management",
    graduationYear: 2026,
    photo: "https://i.pravatar.cc/400?img=33",
    interests: ["Product Management", "Startups", "SaaS", "IA/ML", "Innovation", "Data Analytics"],
    // Nouveaux champs pour le match culturel
    culture: "Innovation & Autonomie",
    ambiance: "Équipe agile, Flexibilité",
    hobbies: ["Escalade", "Voyage", "Jeux vidéo"],
    
    // CORRECTION: Le champ 'goals' manquait, ce qui causait l'erreur sur la page Profil.
    goals: ["Devenir PM dans une entreprise tech", "Lancer ma propre startup"],
    
    values: ["Innovation", "Équilibre vie pro/perso", "Apprentissage continu", "Impact"],
    personalityType: "L'Innovateur (Profil D.I.S.C)",
    personalityTraits: {
        analytique: 88,
        créatif: 85,
        // Modifications pour des qualités moins robotiques
        curiosité: 90,
        empathie: 82,
        espritEquipe: 78, // 'collaboratif' renommé
        autonome: 92,
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
        // Nouveaux champs pour le mentor
        culture: "Forte autonomie, Méritocratie",
        hobbies: ["Course à pied", "Cuisine", "Lecture"],
        matchScore: { overall: 87, personality: 92, goals: 85, culture: 90, hobbies: 75, background: 84, expertise: 88 },
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
        culture: "Collaboratif, Travail à distance",
        hobbies: ["Football en équipe", "Musique", "Voyage"],
        matchScore: { overall: 82, personality: 85, goals: 80, culture: 82, hobbies: 95, background: 83, expertise: 79 },
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
        culture: "Exigence, Rythme soutenu",
        hobbies: ["Yoga", "Lecture", "Voyage"],
        matchScore: { overall: 79, personality: 81, goals: 78, culture: 75, hobbies: 70, background: 80, expertise: 75 },
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
        culture: "Transparence, Bien-être au travail",
        hobbies: ["Jeu de société", "Randonnée", "Cuisine"],
        matchScore: { overall: 85, personality: 87, goals: 84, culture: 88, hobbies: 82, background: 86, expertise: 83 },
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
        culture: "Mission forte, Agilité",
        hobbies: ["Dessin", "Cinéma", "Voyage"],
        matchScore: { overall: 76, personality: 79, goals: 75, culture: 76, hobbies: 70, background: 74, expertise: 76 },
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
        culture: "Hiérarchie, Conformité",
        hobbies: ["Golf", "Ski", "Lecture"],
        matchScore: { overall: 71, personality: 73, goals: 70, culture: 65, hobbies: 68, background: 72, expertise: 68 },
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
        culture: "Image, Vitesse",
        hobbies: ["Réseaux sociaux", "Cinéma", "Shopping"],
        matchScore: { overall: 74, personality: 76, goals: 73, culture: 70, hobbies: 78, background: 75, expertise: 72 },
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
        culture: "Technique, Innovation",
        hobbies: ["Jeux vidéo", "Technologie", "Musique"],
        matchScore: { overall: 83, personality: 86, goals: 81, culture: 84, hobbies: 80, background: 84, expertise: 80 },
        industry: "Tech",
        menteeCount: 7
    }
];

// Maintien des données JOBS, mais sans les scores de match directs
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
        whyMatch: [
            "Vos objectifs carrière (PM) sont alignés avec cette offre.",
            "La culture de l'entreprise (Transparence, Bien-être) correspond à vos valeurs.",
            "3 mentors Alan sont disponibles pour vous guider."
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
        whyMatch: [
            "Vos compétences techniques correspondent aux besoins.",
            "L'environnement scale-up correspond à vos ambitions.",
            "2 mentors BlaBlaCar sont disponibles."
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
        whyMatch: [
            "Vos compétences analytiques sont valorisées.",
            "Exposition à de multiples industries (grande opportunité d'apprentissage).",
            "1 mentor BCG est disponible."
        ],
        description: "Résous des problèmes stratégiques complexes pour des clients du CAC40. Formation continue et évolution rapide.",
        requirements: ["Top école (HEC, X, Centrale...)", "Excellentes compétences analytiques", "Anglais bilingue"],
        salary: "50-55K€",
        industry: "Conseil"
    },
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

// ==================== COMPOSANTS UI ====================

const Button = ({ children, variant = "primary", size = "medium", className = "", onClick, icon: Icon, disabled = false }) => {
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700",
        secondary: "bg-pink-500 text-white hover:bg-pink-600",
        outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
        ghost: "text-gray-700 hover:bg-gray-100"
    };
    
    const sizes = {
        small: "px-3 py-1.5 text-sm",
        medium: "px-4 py-2 text-base",
        large: "px-6 py-3 text-lg"
    };
    
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`${variants[variant]} ${sizes[size]} rounded-lg font-medium transition-all flex items-center gap-2 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {Icon && <Icon size={18} />}
            {children}
        </button>
    );
};

const Badge = ({ children, color = "primary", size = "medium" }) => {
    const colors = {
        primary: "bg-indigo-100 text-indigo-700",
        success: "bg-green-100 text-green-700",
        warning: "bg-amber-100 text-amber-700",
        secondary: "bg-pink-100 text-pink-700",
        gray: "bg-gray-100 text-gray-700",
        teal: "bg-teal-100 text-teal-700"
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
        if (score >= 85) return "text-green-600 border-green-600";
        if (score >= 70) return "text-amber-600 border-amber-600";
        return "text-red-600 border-red-600";
    };
    
    const sizes = {
        small: "w-16 h-16 text-sm",
        medium: "w-20 h-20 text-lg",
        large: "w-28 h-28 text-2xl"
    };
    
    return (
        <div className={`${sizes[size]} rounded-full border-4 ${getColor(score)} flex items-center justify-center font-bold flex-shrink-0`}>
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
                <img src={mentor.photo} alt={mentor.name} className="w-16 h-16 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{mentor.name}</h3>
                    <p className="text-sm text-gray-600 truncate">{mentor.title}</p>
                    <p className="text-sm text-indigo-600 font-medium truncate">{mentor.company}</p>
                </div>
                <MatchScore score={mentor.matchScore.overall} size="small" />
            </div>
            
            <div className="flex flex-wrap gap-1.5 mb-3">
                {mentor.expertise.slice(0, 2).map((exp, i) => (
                    <Badge key={i} color="gray" size="small">{exp}</Badge>
                ))}
                <Badge color="teal" size="small">{mentor.hobbies[0]}</Badge>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
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
    // SUPPRESSION du score de match direct avec l'offre.
    // const fitScore = job.company === 'Alan' ? 92 : job.company === 'BlaBlaCar' ? 88 : 75;

    return (
        <div 
            onClick={onClick}
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100 hover:scale-[1.02]"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">{job.title}</h3>
                    <p className="text-indigo-600 font-medium mb-2 truncate">{job.company}</p>
                    <div className="flex flex-wrap gap-2">
                        <Badge color="primary" size="small">{job.type}</Badge>
                        <Badge color="gray" size="small">{job.location}</Badge>
                        <Badge color="gray" size="small">{job.remote}</Badge>
                    </div>
                </div>
                {/* Le score de "Fit estimé" est supprimé pour clarifier le système de match unique (via mentor) */}
            </div>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{job.description}</p>
            
            <div className="flex items-center justify-between text-sm pt-2 border-t">
                <span className="text-green-600 font-semibold">{job.salary}</span>
                <span className="text-gray-500">{job.postedDate}</span>
            </div>
        </div>
    );
};

const Navbar = ({ view, setView, isMobile }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navItems = [
        { label: "Dashboard", view: "dashboard", icon: Sliders },
        { label: "Mon Profil", view: "profile", icon: User },
        { label: "Mentors", view: "mentors", icon: Users },
        { label: "Opportunités", view: "opportunities", icon: Briefcase },
        { label: "Messages", view: "messages", icon: MessageSquare },
        { label: "Quiz (Démo)", view: "quiz", icon: Sparkles },
    ];

    const MenuContent = (
        <nav className={`flex flex-col gap-1 p-3 ${isMobile ? 'bg-white' : 'md:flex-row md:gap-4'}`}>
            {navItems.map(item => (
                <button
                    key={item.view}
                    onClick={() => { setView(item.view); setIsMenuOpen(false); }}
                    className={`flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        view === item.view ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    <item.icon size={18} />
                    {item.label}
                </button>
            ))}
        </nav>
    );

    return (
        <header className="bg-white shadow-md sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                <div className="flex items-center gap-4">
                    {/* MODIFICATION: Cliquer sur le logo ramène au Dashboard */}
                    <button onClick={() => setView('dashboard')} className="cursor-pointer">
                        <h1 className="text-xl font-bold text-indigo-600 font-poppins">Fit-In.</h1>
                    </button>
                    {!isMobile && MenuContent}
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600 hidden sm:block">
                        Connexions: <Badge color="warning">{STUDENT_PROFILE.mentorConnections.active}/{STUDENT_PROFILE.mentorConnections.limit}</Badge>
                    </div>
                    {/* MODIFICATION: Cliquer sur la photo ramène au Profil */}
                    <button onClick={() => setView('profile')} className="cursor-pointer">
                        <img src={STUDENT_PROFILE.photo} alt={STUDENT_PROFILE.name} className="w-8 h-8 rounded-full object-cover border-2 border-indigo-500" />
                    </button>
                    {isMobile && (
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 md:hidden">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    )}
                </div>
            </div>
            {isMobile && isMenuOpen && (
                <div className="md:hidden border-t">
                    {MenuContent}
                </div>
            )}
        </header>
    );
};


// ==================== PAGES ====================

const Landing = ({ onStart }) => {
    return (
        <div className="min-h-screen">
            <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-pink-500 text-white py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
                        <Sparkles size={16} />
                        <span className="text-sm font-medium">Fit-In: L'Adéquation Humaine et Culturelle</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 font-poppins">
                        Le Matching de Carrière Basé sur la Science
                    </h1>
                    <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                        Nous connectons étudiants, mentors et opportunités non pas par CV, mais par **personnalité, valeurs et culture d'entreprise**.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Button onClick={onStart} size="large" variant="secondary" icon={ArrowRight}>
                            Accéder à la démo (Étudiant)
                        </Button>
                    </div>
                </div>
            </div>
            
            <div className="py-20 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 font-poppins">Notre Triple Valeur Ajoutée</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Bloc Étudiants */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all hover:shadow-xl">
                            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                                <GraduationCap className="text-pink-600" size={24} />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Pour les Étudiants</h3>
                            <p className="text-gray-600 text-sm mb-3">Accès démocratisé à des mentors parfaitement alignés culturellement.</p>
                            <ul className="text-sm text-gray-600 space-y-1 mt-3">
                                <li>• Fin de l'application à l'aveugle.</li>
                                <li>• Mentors basés sur le **Fit** (pas juste le réseau).</li>
                                <li>• Réduction des erreurs de carrière.</li>
                            </ul>
                        </div>
                        
                        {/* Bloc Entreprises */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all hover:shadow-xl">
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                <Building2 className="text-indigo-600" size={24} />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Pour les Entreprises</h3>
                            <p className="text-gray-600 text-sm mb-3">Pipeline de talents pré-vettés pour le **fit culturel** (réduction du turnover).</p>
                            <ul className="text-sm text-gray-600 space-y-1 mt-3">
                                <li>• Baisse du turnover de 30% (notre KPI).</li>
                                <li>• Engagement Alumni structuré (Employer Branding).</li>
                                <li>• Réduction du coût d'acquisition.</li>
                            </ul>
                        </div>
                        
                        {/* Bloc Écoles */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all hover:shadow-xl">
                            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                                <Target className="text-teal-600" size={24} />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">Pour les Écoles</h3>
                            <p className="text-gray-600 text-sm mb-3">Amélioration du Taux de Placement (leur KPI #1) grâce à la qualité du match.</p>
                            <ul className="text-sm text-gray-600 space-y-1 mt-3">
                                <li>• KPI de placement boosté.</li>
                                <li>• Engagement Alumni mesurable.</li>
                                <li>• Satisfaction étudiante accrue.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Dashboard = ({ onNavigate }) => {
    // Suppression de la boîte "Match Moyen"
    
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 font-poppins">Bienvenue, {STUDENT_PROFILE.name} ! 👋</h1>
                <Badge color="secondary">{STUDENT_PROFILE.personalityType}</Badge>
            </div>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {/* Garde ces cartes d'info sans le Match Moyen */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600 text-sm">Mentors Actifs</span>
                        <Users className="text-indigo-500" size={20} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{STUDENT_PROFILE.mentorConnections.active}/10</div>
                </div>
                
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600 text-sm">Opportunités</span>
                        <Briefcase className="text-pink-500" size={20} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{JOBS.length}</div>
                </div>
                
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600 text-sm">Messages</span>
                        <MessageSquare className="text-teal-500" size={20} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{MESSAGES.filter(m => m.unread).length} <span className="text-sm text-gray-500">nouveaux</span></div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600 text-sm">Prochainement</span>
                        <Sparkles className="text-amber-500" size={20} />
                    </div>
                    <div className="text-sm font-semibold text-gray-900 mt-2">AI Career Path</div>
                    <div className="text-xs text-gray-500">Prédiction des parcours</div>
                </div>

            </div>
            
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold font-poppins">Tes Meilleurs Mentors (Fit Personnel)</h2>
                    <Button variant="ghost" onClick={() => onNavigate('mentors')} icon={ArrowRight}>
                        Voir tous
                    </Button>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {MENTORS.slice(0, 3).map(mentor => (
                        <MentorCard key={mentor.id} mentor={mentor} onClick={() => onNavigate('mentor', mentor.id)} />
                    ))}
                </div>
            </div>
            
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold font-poppins">Opportunités Récemment Ajoutées</h2>
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
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-4 font-poppins">Mentors (Match Culturel & Humain)</h1>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-amber-800 text-sm">
                            Tu as fait 
                            <strong> {STUDENT_PROFILE.mentorConnections.active}/{STUDENT_PROFILE.mentorConnections.limit}</strong> demandes de mentorat cette année (Priorité Qualité).
                        </span>
                        <Badge color="warning" size="small">{STUDENT_PROFILE.mentorConnections.remaining} restantes</Badge>
                    </div>
                </div>
            </div>
            
            <div className="flex gap-6 flex-col md:flex-row">
                <div className="md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 md:sticky md:top-20">
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
    
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl p-6 md:p-8 mb-6">
                <button 
                    onClick={() => onNavigate('mentors')}
                    className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-1 text-sm"
                >
                    ← Retour aux mentors
                </button>
                
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <img src={mentor.photo} alt={mentor.name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg flex-shrink-0" />
                    
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl font-bold mb-2 font-poppins">{mentor.name}</h1>
                        <p className="text-xl text-gray-700 mb-1">{mentor.title}</p>
                        <p className="text-lg text-indigo-600 font-medium mb-3">{mentor.company}</p>
                        
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
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
                    </div>
                    
                    <div className="text-center">
                        <div 
                            className="cursor-pointer group"
                            onClick={() => setShowBreakdown(!showBreakdown)}
                        >
                            <MatchScore score={mentor.matchScore.overall} size="medium" />
                            <p className="text-sm text-gray-600 mt-2 group-hover:text-indigo-600 font-medium transition-colors">
                                Fit: Démontrer la Science
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {showBreakdown && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowBreakdown(false)}>
                    <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md mx-4 w-full" onClick={e => e.stopPropagation()}>
                        <h3 className="text-2xl font-bold mb-6 font-poppins">Détails du Fit (La Science)</h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Le score agrégé est calculé à partir de vos traits de personnalité, vos objectifs carrière et votre fit culturel/humain avec le mentor.
                        </p>
                        
                        {[
                            { label: '1. Personnalité (35%)', score: mentor.matchScore.personality, color: 'indigo', desc: "Convergence des traits psychométriques (DISC)." },
                            { label: '2. Fit Culturel (25%)', score: mentor.matchScore.culture, color: 'pink', desc: "Adéquation entre votre ambiance de travail souhaitée et la sienne." },
                            { label: '3. Objectifs Carrière (20%)', score: mentor.matchScore.goals, color: 'teal', desc: "Alignement des ambitions professionnelles." },
                            { label: '4. Hobbies & Humain (10%)', score: mentor.matchScore.hobbies, color: 'orange', desc: "Affinités personnelles (loisirs, valeurs)." },
                            { label: '5. Expertise/Background (10%)', score: mentor.matchScore.expertise, color: 'purple', desc: "Compétences techniques et parcours d'études." },
                        ].map((item, i) => (
                            <div key={i} className="mb-4">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium flex items-center gap-2">{item.label}</span>
                                    <span className="text-sm font-bold">{item.score}%</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-1">{item.desc}</p>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full bg-${item.color}-500 transition-all duration-500`}
                                        style={{ width: `${item.score}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                        
                        <Button onClick={() => setShowBreakdown(false)} className="w-full mt-6">
                            Fermer
                        </Button>
                    </div>
                </div>
            )}
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                <h2 className="text-xl font-bold mb-4 font-poppins">À propos & Fit Culturel</h2>
                <p className="text-gray-700 mb-6">{mentor.bio}</p>

                <div className="grid md:grid-cols-2 gap-4 border-t pt-4">
                    <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2"><Briefcase size={18} className="text-indigo-500" /> Culture & Ambiance</h3>
                        <div className="space-y-1 text-gray-700 text-sm">
                            <p><strong>Culture :</strong> {mentor.culture}</p>
                            <p><strong>Ambiance :</strong> Forte synergie d'équipe, {mentor.hobbies[0]} en activité.</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2"><Target size={18} className="text-pink-500" /> Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                            {mentor.expertise.map((exp, i) => (
                                <Badge key={i} color="primary">{exp}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                <h2 className="text-xl font-bold mb-4 font-poppins">Tes Hobbies en Commun</h2>
                <div className="flex flex-wrap gap-3">
                    {STUDENT_PROFILE.hobbies.filter(h => mentor.hobbies.includes(h)).map((hobby, i) => (
                        <Badge key={i} color="teal" size="medium">{hobby} (Hobby en commun!)</Badge>
                    ))}
                    {STUDENT_PROFILE.hobbies.filter(h => !mentor.hobbies.includes(h)).map((hobby, i) => (
                        <Badge key={i} color="gray" size="medium">{hobby}</Badge>
                    ))}
                </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                {STUDENT_PROFILE.mentorConnections.remaining > 0 ? (
                    <>
                        <h3 className="font-semibold mb-2 text-xl font-poppins">Démarre ta connexion</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Il te reste {STUDENT_PROFILE.mentorConnections.remaining} demandes de connexion pour cette année.
                        </p>
                        <Button size="large" className="w-full md:w-auto hover:scale-[1.02] transition-transform" onClick={() => alert("Simuler: Demande de mentorat envoyée à " + mentor.name)}>
                            Demander un mentorat
                        </Button>
                    </>
                ) : (
                    <>
                        <h3 className="font-semibold mb-2 text-xl font-poppins">Limite de connexions atteinte</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Tu as utilisé tes 10 connexions pour cette année. Concentre-toi sur tes mentors actuels !
                        </p>
                        <Button size="large" variant="outline" className="w-full md:w-auto" disabled>
                            Limite atteinte (10/10)
                        </Button>
                    </>
                )}
            </div>
            
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 font-poppins">Tu pourrais aussi aimer</h2>
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
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2 font-poppins">Opportunités (Focus Entreprise)</h1>
                <p className="text-gray-600">Découvre les postes qui correspondent à tes objectifs de carrière.</p>
            </div>
            
            <div className="flex gap-6 flex-col md:flex-row">
                <div className="md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 md:sticky md:top-20">
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

    // Trouver le mentor qui correspond à l'entreprise pour l'action "Contacter un Mentor"
    const companyMentor = MENTORS.find(m => m.company === job.company);
    
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <button 
                onClick={() => onNavigate('opportunities')}
                className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-1 text-sm"
            >
                ← Retour aux opportunités
            </button>
            
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-start justify-between mb-4 flex-col sm:flex-row">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-2 font-poppins">{job.title}</h1>
                        <p className="text-xl text-indigo-600 font-medium mb-3">{job.company}</p>
                        <div className="flex flex-wrap gap-2">
                            <Badge color="primary">{job.type}</Badge>
                            <Badge color="gray">{job.location}</Badge>
                            <Badge color="gray">{job.remote}</Badge>
                            {job.duration && <Badge color="gray">{job.duration}</Badge>}
                        </div>
                    </div>
                    {/* Retrait du MatchScore direct pour l'offre */}
                </div>
                
                <div className="flex items-center gap-6 text-sm text-gray-600 border-t pt-4">
                    <span className="flex items-center gap-1">
                        <MapPin size={16} /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock size={16} /> Publié le {job.postedDate}
                    </span>
                    <span className="text-green-600 font-semibold text-base">{job.salary}</span>
                </div>
            </div>
            
            {/* Nouveau panneau pour encourager le mentorat */}
            <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6 mb-6 border border-teal-200">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-teal-800 font-poppins">
                    <Check className="text-teal-600" />
                    Préparation : Pourquoi ce poste te correspond
                </h2>
                <ul className="space-y-3 list-disc pl-5 text-gray-700">
                    {job.whyMatch.map((reason, i) => (
                        <li key={i}>{reason}</li>
                    ))}
                </ul>
                
                {companyMentor && (
                    <div className="mt-6 p-4 bg-white rounded-lg border border-gray-100 flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            <img src={companyMentor.photo} alt={companyMentor.name} className="w-10 h-10 rounded-full object-cover" />
                            <p className="text-sm font-medium">
                                Contacte {companyMentor.name} (Mentor {job.company}) avant de postuler pour discuter du **Fit Culturel**.
                            </p>
                        </div>
                        <Button 
                            variant="secondary" 
                            size="small" 
                            icon={ArrowRight}
                            onClick={() => onNavigate('mentor', companyMentor.id)}
                        >
                            Voir son profil
                        </Button>
                    </div>
                )}
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                <h2 className="text-xl font-bold mb-4 font-poppins">Description du poste</h2>
                <p className="text-gray-700 mb-6 whitespace-pre-line">{job.description}</p>
                
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
                    <p className="text-sm text-gray-600">Nous recommandons de valider ton Fit Culturel via un mentor avant de candidater.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" icon={Heart}>
                        Sauvegarder
                    </Button>
                    <Button size="large" icon={Send} onClick={() => alert("Simuler: Redirection vers le site de Alan pour candidater.")}>
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
            <h1 className="text-3xl font-bold mb-6 font-poppins">Messages</h1>
            
            <div className="flex gap-4 h-[600px] flex-col md:flex-row">
                <div className="md:w-80 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col flex-shrink-0">
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
                                            <p className="text-xs text-gray-500 mb-1 truncate">{msg.company}</p>
                                            <p className="text-sm text-gray-600 truncate">{msg.lastMessage}</p>
                                            <p className="text-xs text-gray-400 mt-1">{msg.timestamp}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 bg-white rounded-xl shadow-md border border-gray-100 flex flex-col">
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
                                <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                                    {selectedMessage.mentor} a accepté ta demande de mentorat
                                </span>
                            </div>
                            
                            <div className="flex gap-2">
                                <img src={selectedMessage.photo} alt="" className="w-8 h-8 rounded-full flex-shrink-0" />
                                <div className="bg-white rounded-2xl rounded-tl-none p-3 max-w-md shadow-md">
                                    <p className="text-sm">{selectedMessage.lastMessage}</p>
                                    <span className="text-xs text-gray-400 mt-1 block text-right">{selectedMessage.timestamp}</span>
                                </div>
                            </div>
                            
                            <div className="flex gap-2 justify-end">
                                <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-none p-3 max-w-md shadow-md">
                                    <p className="text-sm">Merci beaucoup ! Je serais ravi d'en apprendre plus sur ton parcours chez Datadog.</p>
                                    <span className="text-xs text-indigo-200 mt-1 block text-right">Il y a 1h</span>
                                </div>
                                <img src={STUDENT_PROFILE.photo} alt="" className="w-8 h-8 rounded-full flex-shrink-0" />
                            </div>
                            
                            {selectedMessage.id === 1 && (
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                                    <p className="text-sm font-medium text-amber-900 mb-2">💡 Suggestions de discussion</p>
                                    <div className="space-y-1">
                                        <button className="text-sm text-amber-700 hover:text-amber-900 block text-left">
                                            • Demande à {selectedMessage.mentor.split(' ')[0]} son parcours d'ingénieur à PM
                                        </button>
                                        <button className="text-sm text-amber-700 hover:text-amber-900 block text-left">
                                            • Quelle est la culture chez {selectedMessage.company} et comment l'as-tu vécue ?
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="p-4 border-t bg-white">
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

const QuizPage = ({ onNavigate }) => {
    // Fausse page de quiz pour la démo
    const [step, setStep] = useState(1);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const quizData = [
        {
            id: 1,
            question: "Lors d'un projet, quelle est votre approche préférée ?",
            answers: [
                { text: "A. Analyse détaillée des données avant toute décision.", traits: "Analytique, Détail Orienté" },
                { text: "B. Réunir l'équipe et trouver un consensus créatif.", traits: "Collaboratif, Créatif" },
                { text: "C. Prendre une décision rapide et assumer la responsabilité.", traits: "Autonome, Leadership" },
            ]
        },
        {
            id: 2,
            question: "Quelle ambiance de travail vous motive le plus ?",
            answers: [
                { text: "A. Un environnement très structuré avec des objectifs clairs.", traits: "Sécurité, Organisation" },
                { text: "B. Une ambiance décontractée où l'autonomie est la règle d'or.", traits: "Flexibilité, Autonomie" },
                { text: "C. Un rythme soutenu où la compétition encourage l'excellence.", traits: "Exigence, Compétitif" },
            ]
        },
    ];

    const currentQuestion = quizData[step - 1];

    const handleNext = () => {
        if (step < quizData.length) {
            setStep(step + 1);
            setSelectedAnswer(null);
        } else {
            alert("Simuler: Quiz terminé! Calcul de votre 'Profil' et des Matchs Culturels.");
            onNavigate('dashboard');
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 font-poppins">Ton Profil Fit-In (Test Psychométrique)</h1>
            <p className="text-gray-600 mb-6 flex items-center gap-2">
                <Sliders size={20} className="text-indigo-500" /> Test basé sur le modèle DISC/psychométrique.
            </p>
            
            <div className="bg-white rounded-xl p-6 shadow-xl border border-gray-200">
                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                    <h2 className="text-xl font-semibold">Question {step}/{quizData.length}</h2>
                    <Badge color="secondary">Science-Backed</Badge>
                </div>
                
                <p className="text-lg font-medium mb-6 text-gray-800">{currentQuestion.question}</p>
                
                <div className="space-y-4">
                    {currentQuestion.answers.map((answer, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedAnswer(answer)}
                            className={`p-4 rounded-lg cursor-pointer transition-all border-2 
                                ${selectedAnswer === answer ? 'bg-indigo-50 border-indigo-600 shadow-md' : 'bg-gray-50 border-gray-200 hover:border-indigo-400'}`
                            }
                        >
                            <p className="font-medium">{answer.text}</p>
                            {selectedAnswer === answer && <p className="text-xs text-indigo-500 mt-1">→ Influence votre score de personnalité</p>}
                        </div>
                    ))}
                </div>
                
                <Button 
                    onClick={handleNext}
                    disabled={selectedAnswer === null}
                    className="w-full mt-6"
                    icon={step < quizData.length ? ArrowRight : Check}
                >
                    {step < quizData.length ? `Continuer (${step}/${quizData.length})` : "Terminer le Quiz"}
                </Button>
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                    <img src="https://placehold.co/100x20/F59E0B/FFFFFF?text=SHL/AssessFirst" alt="SHL/AssessFirst Logo Placeholder" className="inline-block h-4 align-middle mr-2" />
                    Propulsé par les modèles psychométriques SHL / AssessFirst.
                </p>
            </div>
        </div>
    );
};


const ProfilePage = ({ onNavigate }) => {
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 font-poppins">Mon Profil Personnel (Fit-In)</h1>
            
            <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-xl p-6 md:p-8 mb-6">
                <div className="flex items-start gap-6 flex-col sm:flex-row">
                    <div className="relative flex-shrink-0">
                        <img src={STUDENT_PROFILE.photo} alt={STUDENT_PROFILE.name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
                        <button className="absolute bottom-0 right-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700">
                            <Camera size={18} />
                        </button>
                    </div>
                    
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-2 font-poppins">{STUDENT_PROFILE.name}</h2>
                        <p className="text-gray-700 mb-1">{STUDENT_PROFILE.program}</p>
                        <p className="text-gray-600 mb-3">{STUDENT_PROFILE.school} • Promo {STUDENT_PROFILE.graduationYear}</p>
                        <Badge color="secondary" size="medium">Profil {STUDENT_PROFILE.personalityType}</Badge>
                    </div>
                    
                    <Button variant="outline">
                        Modifier le profil
                    </Button>
                </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
                
                {/* Bloc 1: Personnalité & Test */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    {/* MODIFICATION: Titre changé pour "Profil" */}
                    <h2 className="text-xl font-bold mb-4 font-poppins flex items-center gap-2">
                        <Sliders size={20} className="text-indigo-500" /> Profil & Personnalité
                    </h2>
                    {/* MODIFICATION: Bio moins robotique */}
                    <p className="text-gray-700 mb-6 text-sm">
                        Tu es identifié comme <strong>{STUDENT_PROFILE.personalityType}</strong>.
                        Basé sur tes réponses au quiz, tu es une personne créative et curieuse, qui s'épanouit dans des environnements autonomes tout en valorisant l'esprit d'équipe.
                    </p>
                    
                    <div className="space-y-3">
                        {/* MODIFICATION: Affiche les nouveaux traits de personnalité */}
                        {Object.entries(STUDENT_PROFILE.personalityTraits).map(([trait, score]) => (
                            <div key={trait}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium capitalize">{trait}</span>
                                    <span className="text-sm font-bold">{score}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500" style={{width: `${score}%`}} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button 
                        onClick={() => onNavigate('quiz')} 
                        className="w-full mt-6"
                        variant="outline"
                        icon={Sparkles}
                    >
                        Re-passer l'aperçu du Quiz
                    </Button>
                </div>

                {/* Bloc 2: Culture & Objectifs */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-4 font-poppins flex items-center gap-2">
                        <Target size={20} className="text-pink-500" /> Tes Valeurs & Objectifs
                    </h2>
                    
                    <h3 className="font-semibold mb-2 mt-4 text-gray-800">Culture de Travail Souhaitée</h3>
                    <div className="space-y-1 text-sm">
                        <p className="text-gray-700"><strong>Culture :</strong> {STUDENT_PROFILE.culture}</p>
                        <p className="text-gray-700"><strong>Ambiance :</strong> {STUDENT_PROFILE.ambiance}</p>
                    </div>

                    <h3 className="font-semibold mb-2 mt-4 text-gray-800">Objectifs de Carrière</h3>
                    <div className="space-y-3">
                        {/* CORRECTION: Vérification que STUDENT_PROFILE.goals existe avant de mapper */}
                        {STUDENT_PROFILE.goals && STUDENT_PROFILE.goals.map((goal, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Check className="text-white" size={16} />
                                </div>
                                <span className="text-gray-700 text-sm">{goal}</span>
                            </div>
                        ))}
                    </div>

                    {/* MODIFICATION: Ajout des "Intérêts Professionnels" */}
                    <h3 className="font-semibold mb-2 mt-4 text-gray-800">Intérêts Professionnels</h3>
                    <div className="flex flex-wrap gap-2">
                        {STUDENT_PROFILE.interests && STUDENT_PROFILE.interests.map((interest, i) => (
                            <Badge key={i} color="primary">{interest}</Badge>
                        ))}
                    </div>

                    <h3 className="font-semibold mb-2 mt-4 text-gray-800">Intérêts Humains (Hobbies)</h3>
                    <div className="flex flex-wrap gap-2">
                        {/* CORRECTION: Vérification que STUDENT_PROFILE.hobbies existe avant de mapper */}
                        {STUDENT_PROFILE.hobbies && STUDENT_PROFILE.hobbies.map((hobby, i) => (
                            <Badge key={i} color="teal">{hobby}</Badge>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
    );
};


// ==================== APP PRINCIPALE ====================

const App = () => {
    const [view, setView] = useState('landing');
    const [dataId, setDataId] = useState(null);
    const isMobile = useIsMobile(768); // Utilisation du hook local corrigé
    
    // Fonction de navigation gérant les IDs
    const handleNavigate = (newView, id = null) => {
        setDataId(id);
        setView(newView);
        window.scrollTo(0, 0); // Scroll to top on navigation
    };

    // Fonction de rendu de la vue
    const renderView = () => {
        switch (view) {
            case 'landing':
                return <Landing onStart={() => handleNavigate('dashboard')} />;
            case 'dashboard':
                return <Dashboard onNavigate={handleNavigate} />;
            case 'profile':
                return <ProfilePage onNavigate={handleNavigate} />;
            case 'mentors':
                return <MentorsPage onNavigate={handleNavigate} />;
            case 'mentor':
                return <MentorProfile mentorId={dataId} onNavigate={handleNavigate} />;
            case 'opportunities':
                return <OpportunitiesPage onNavigate={handleNavigate} />;
            case 'job':
                return <JobDetail jobId={dataId} onNavigate={handleNavigate} />;
            case 'messages':
                return <MessagesPage />;
            case 'quiz':
                return <QuizPage onNavigate={handleNavigate} />;
            default:
                return <Dashboard onNavigate={handleNavigate} />;
        }
    };

    const shouldShowNavbar = view !== 'landing';

    return (
        <>
            {shouldShowNavbar && <Navbar view={view} setView={handleNavigate} isMobile={isMobile} />}
            <main className={shouldShowNavbar ? 'pt-0' : ''}>
                {renderView()}
            </main>
        </>
    );
};

export default App;