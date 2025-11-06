import React from 'react';
import { Users, Briefcase, TrendingUp, BarChart, CheckCircle, GraduationCap, Target } from 'lucide-react';

// Données FAKE pour le tableau de bord de l'école
const SCHOOL_DATA = {
    schoolName: "IMT-BS",
    kpis: {
        placementRate: 92, // %
        alumniMentors: 320,
        studentEngagement: 85, // %
        avgCultureFit: 8.2, // sur 10
    },
    recentPlacements: [
        { name: "Alex Martin", company: "Alan", role: "Stagiaire PM" },
        { name: "Léa Dubois", company: "BCG", role: "Business Analyst" },
        { name: "Omar K.", company: "Datadog", role: "Stagiaire Data" },
    ],
    topCompanies: [
        { name: "Alan", students: 12 },
        { name: "BCG", students: 9 },
        { name: "Datadog", students: 7 },
        { name: "BlaBlaCar", students: 5 },
    ]
};

// ==================== COMPOSANTS UI (Miniatures) ====================
// Ces composants sont auto-contenus pour ce fichier de démo.

const Badge = ({ children, color = "primary" }) => {
    const colors = {
        primary: "bg-indigo-100 text-indigo-700",
        success: "bg-green-100 text-green-700",
        warning: "bg-amber-100 text-amber-700",
    };
    return (
        <span className={`${colors[color]} px-3 py-1 text-sm rounded-full font-medium inline-block`}>
            {children}
        </span>
    );
};

const KpiCard = ({ title, value, unit, icon: Icon, colorClass = "text-indigo-600" }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">{title}</span>
            <Icon className={`${colorClass} opacity-70`} size={24} />
        </div>
        <div className="text-4xl font-bold text-gray-900">{value}{unit}</div>
        <div className="text-xs text-gray-500 mt-1">
            {colorClass === 'text-green-600' ? "+5.2% vs N-1" : "Objectif 2025"}
        </div>
    </div>
);

// ==================== COMPOSANT PRINCIPAL (École) ====================

const SchoolDashboard = () => {
    const { schoolName, kpis, recentPlacements, topCompanies } = SCHOOL_DATA;

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
                {/* En-tête */}
                <div className="mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 font-poppins">Tableau de Bord (Admin)</h1>
                        <p className="text-lg text-indigo-600 font-medium">Partenariat Fit-In x {schoolName}</p>
                    </div>
                    <button className="bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                        Exporter les données (Accréditation)
                    </button>
                </div>

                {/* KPIs Principaux */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <KpiCard 
                        title="Taux de Placement" 
                        value={kpis.placementRate} 
                        unit="%" 
                        icon={CheckCircle} 
                        colorClass="text-green-600" 
                    />
                    <KpiCard 
                        title="Alumni Mentors Actifs" 
                        value={kpis.alumniMentors} 
                        unit="" 
                        icon={Users} 
                        colorClass="text-indigo-600" 
                    />
                    <KpiCard 
                        title="Engagement Étudiant" 
                        value={kpis.studentEngagement} 
                        unit="%" 
                        icon={GraduationCap} 
                        colorClass="text-pink-500" 
                    />
                    <KpiCard 
                        title="Score de Fit Culturel (Moyen)" 
                        value={kpis.avgCultureFit} 
                        unit="/10" 
                        icon={Target} 
                        colorClass="text-teal-600" 
                    />
                </div>

                {/* Contenu Principal (2 colonnes) */}
                <div className="grid lg:grid-cols-3 gap-6">
                    
                    {/* Colonne Gauche (Activités) */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 font-poppins">Statistiques d'Engagement (6 derniers mois)</h2>
                        {/* Faux graphique (placeholder) */}
                        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                            <BarChart size={48} className="text-gray-400" />
                            <p className="text-gray-500 ml-4">Graphique: Connexions vs. Placements</p>
                        </div>
                    </div>

                    {/* Colonne Droite (Listes Rapides) */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* Meilleurs Partenaires */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 font-poppins">Top Entreprises Partenaires</h2>
                            <ul className="space-y-3">
                                {topCompanies.map((company, i) => (
                                    <li key={i} className="flex items-center justify-between">
                                        <span className="font-medium">{company.name}</span>
                                        <Badge color={i === 0 ? "primary" : "gray"}>
                                            {company.students} étudiants placés
                                        </Badge>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Placements Récents */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 font-poppins">Placements Récents (via Fit-In)</h2>
                            <ul className="space-y-4">
                                {recentPlacements.map((student, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <img 
                                            src={`https://i.pravatar.cc/150?img=${i + 30}`} 
                                            alt={student.name} 
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-medium text-sm">{student.name}</p>
                                            <p className="text-xs text-gray-600">{student.role} @ <strong>{student.company}</strong></p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

// Exporte le composant pour pouvoir l'utiliser dans d'autres fichiers de démo
export default SchoolDashboard;