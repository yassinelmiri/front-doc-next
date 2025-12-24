"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  Calendar,
  Clock,
  MessageSquare,
  Users,
  Upload,
  Smartphone,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Stethoscope,
  BarChart3,
  Settings,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Play,
  Sparkles,
  Send,
  Check,
  Star,
  Menu,
  X,
  TrendingUp,
  Award,
  Globe,
  Lock,
} from "lucide-react";

export default function HomePage() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    messages: 0,
    appointments: 0,
  });

  const features = [
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Notifications Automatiques",
      description: "Envoyez des SMS automatiques aux patients pour les rappels de rendez-vous, les retards et les confirmations.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Gestion Intelligente des RDV",
      description: "Organisez et suivez tous vos rendez-vous avec un système de planification intelligent et intuitif.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
    },
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Importation de Fichiers",
      description: "Importez facilement vos listes de patients depuis des fichiers Excel, CSV ou autres formats.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Tableaux de Bord Complets",
      description: "Visualisez vos statistiques et performances avec des tableaux de bord détaillés et personnalisables.",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Sécurité des Données",
      description: "Vos données sont protégées avec un chiffrement de bout en bout et des sauvegardes régulières.",
      color: "from-red-500 to-rose-500",
      bgColor: "bg-gradient-to-br from-red-50 to-rose-50",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Interface Mobile Optimisée",
      description: "Accédez à votre compte depuis n'importe quel appareil avec une interface responsive et moderne.",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-gradient-to-br from-indigo-50 to-blue-50",
    },
  ];

  const automationSteps = [
    {
      step: 1,
      title: "Importez vos patients",
      description: "Téléchargez votre fichier Excel ou CSV avec la liste des patients et leurs rendez-vous.",
      icon: <Upload className="w-6 h-6" />,
    },
    {
      step: 2,
      title: "Configurez les notifications",
      description: "Définissez les messages automatiques pour les rappels, retards et confirmations.",
      icon: <Settings className="w-6 h-6" />,
    },
    {
      step: 3,
      title: "Lancez l'automatisation",
      description: "Le système envoie automatiquement les SMS aux patients selon le planning défini.",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      step: 4,
      title: "Suivez les résultats",
      description: "Consultez en temps réel les statistiques d'envoi et les réponses des patients.",
      icon: <BarChart3 className="w-6 h-6" />,
    },
  ];

  const testimonials = [
    {
      name: "Dr. Sophie Martin",
      role: "Cardiologue, Paris",
      content: "Doc Notification a transformé ma gestion des rendez-vous. Je gagne 2 heures par jour et mes patients sont toujours informés.",
      rating: 5,
      avatar: "SM",
      color: "bg-gradient-to-br from-blue-500 to-purple-500",
    },
    {
      name: "Dr. Thomas Bernard",
      role: "Dentiste, Lyon",
      content: "L'envoi automatique de SMS a réduit mes rendez-vous manqués de 80%. Une solution indispensable pour tout professionnel de santé.",
      rating: 5,
      avatar: "TB",
      color: "bg-gradient-to-br from-green-500 to-teal-500",
    },
    {
      name: "Dr. Marie Dubois",
      role: "Pédiatre, Marseille",
      content: "Simple, efficace et sécurisé. Mes patients adorent recevoir des rappels par SMS. Je recommande vivement !",
      rating: 5,
      avatar: "MD",
      color: "bg-gradient-to-br from-orange-500 to-red-500",
    },
  ];

  const pricingPlans = [
    {
      name: "Basique",
      price: "Gratuit",
      period: "pour toujours",
      features: [
        "Jusqu'à 50 patients/mois",
        "100 SMS/mois inclus",
        "Importation de fichiers",
        "Tableau de bord basique",
        "Support par email",
      ],
      cta: "Commencer gratuitement",
      color: "border-gray-200",
    },
    {
      name: "Professionnel",
      price: "49€",
      period: "par mois",
      features: [
        "Patients illimités",
        "1000 SMS/mois inclus",
        "Importation avancée",
        "Tableau de bord complet",
        "Notifications personnalisées",
        "Support prioritaire",
        "Rapports détaillés",
      ],
      cta: "Essai gratuit 14 jours",
      popular: true,
    },
    {
      name: "Établissement",
      price: "99€",
      period: "par mois",
      features: [
        "Tout dans Professionnel",
        "SMS illimités",
        "Multi-utilisateurs",
        "API d'intégration",
        "Formation personnalisée",
        "Support 24/7",
        "Conformité santé",
      ],
      cta: "Contactez-nous",
      color: "border-gray-200",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Animation des statistiques
    const timer = setTimeout(() => {
      setStats({
        doctors: 1250,
        patients: 85000,
        messages: 1200000,
        appointments: 450000,
      });
    }, 300);

    // Animation des features
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
      clearInterval(featureInterval);
    };
  }, []);

  const StatCounter = ({ value, label, icon }: { value: number; label: string; icon: React.ReactNode }) => (
    <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-center mb-4">
        <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
          {icon}
        </div>
      </div>
      <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        {value.toLocaleString()}+
      </div>
      <div className="text-gray-600 text-sm md:text-base">{label}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-lg shadow-lg" : "bg-white/90 backdrop-blur-md"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Stethoscope className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Doc Notification
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Fonctionnalités
              </a>
              <a href="#automation" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Automatisation
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Tarifs
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Témoignages
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <a href="/dashboard" className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Connexion
              </a>
              <a href="/dashboard"  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Essai gratuit
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Fonctionnalités
              </a>
              <a href="#automation" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Automatisation
              </a>
              <a href="#pricing" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Tarifs
              </a>
              <a href="#testimonials" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Témoignages
              </a>
              <div className="pt-3 space-y-2">
                <a href="/dashboard" className="w-full px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Connexion
                </a>
                <a href="/dashboard" className="w-full px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg">
                  Essai gratuit
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center relative">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm font-medium mb-6 animate-fade-in shadow-md">
              <Sparkles className="w-4 h-4 mr-2" />
              Plateforme de gestion médicale innovante
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up">
              Simplifiez la
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> gestion de vos rendez-vous</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up animation-delay-200">
              Automatisez l'envoi de SMS à vos patients, gérez vos plannings en temps réel 
              et réduisez les rendez-vous manqués avec notre solution tout-en-un.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up animation-delay-400">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium text-lg flex items-center justify-center gap-2 group shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                Commencer gratuitement
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all font-medium text-lg flex items-center justify-center gap-2 group bg-white shadow-md hover:shadow-lg">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Voir la démo
              </button>
            </div>

            {/* Hero Image - Dashboard Preview */}
            <div className="relative max-w-5xl mx-auto mb-16 animate-fade-in-up animation-delay-600">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 md:p-8">
                  {/* Browser Chrome */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  
                  {/* Dashboard Content */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      {[
                        { label: "Patients", value: "24", icon: <Users className="w-5 h-5" /> },
                        { label: "SMS envoyés", value: "156", icon: <Send className="w-5 h-5" /> },
                        { label: "Retards", value: "3", icon: <Clock className="w-5 h-5" /> },
                        { label: "Taux", value: "98%", icon: <TrendingUp className="w-5 h-5" /> },
                      ].map((stat, i) => (
                        <div key={i} className="bg-gray-800/50 backdrop-blur rounded-xl p-3 md:p-4 border border-gray-700">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-400">{stat.label}</span>
                            <div className="text-blue-400">{stat.icon}</div>
                          </div>
                          <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 md:p-6 border border-gray-700">
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        Rendez-vous du jour
                      </h3>
                      <div className="space-y-2">
                        {[
                          { name: "Marie Martin", time: "09:00", status: "En cours", color: "blue" },
                          { name: "Pierre Bernard", time: "10:30", status: "En attente", color: "yellow" },
                          { name: "Sophie Dubois", time: "11:15", status: "Confirmé", color: "green" },
                        ].map((apt, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-${apt.color}-400 to-${apt.color}-600 flex items-center justify-center text-white text-xs font-bold`}>
                                {apt.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="text-white font-medium text-sm">{apt.name}</div>
                                <div className="text-xs text-gray-400">{apt.time}</div>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs bg-${apt.color}-500/20 text-${apt.color}-300`}>
                              {apt.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl animate-float shadow-xl flex items-center justify-center">
                <Bell className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl animate-float animation-delay-1000 shadow-xl flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              <StatCounter value={stats.doctors} label="Professionnels" icon={<Stethoscope className="w-6 h-6" />} />
              <StatCounter value={stats.patients} label="Patients gérés" icon={<Users className="w-6 h-6" />} />
              <StatCounter value={stats.messages} label="SMS envoyés" icon={<Send className="w-6 h-6" />} />
              <StatCounter value={stats.appointments} label="RDV planifiés" icon={<Calendar className="w-6 h-6" />} />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm mb-8 font-medium">Ils nous font confiance :</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {[
              { name: "Clinique", icon: <Stethoscope className="w-8 h-8" /> },
              { name: "Hôpital", icon: <Award className="w-8 h-8" /> },
              { name: "Cabinet", icon: <Users className="w-8 h-8" /> },
              { name: "Centre", icon: <Globe className="w-8 h-8" /> },
              { name: "Polyclinique", icon: <Shield className="w-8 h-8" /> },
              { name: "Labo", icon: <BarChart3 className="w-8 h-8" /> },
            ].map((partner, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-gray-400 mb-2">{partner.icon}</div>
                <div className="text-xs text-gray-500 font-medium">{partner.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Tout ce dont vous avez besoin pour
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> une gestion optimale</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Une suite complète d'outils conçus spécialement pour les professionnels de santé.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 md:p-8 rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  currentFeature === index ? 'ring-2 ring-blue-500 shadow-xl scale-105' : ''
                } ${feature.bgColor}`}
                onMouseEnter={() => setCurrentFeature(index)}
              >
                <div className={`p-3 rounded-xl w-fit mb-6 bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Section */}
      <section id="automation" className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white text-blue-700 text-sm font-medium mb-6 shadow-md">
              <Zap className="w-4 h-4 mr-2" />
              Système d'automatisation
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Comment fonctionne
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> l'envoi automatique de SMS</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Configurez une fois, et laissez notre système gérer toutes vos communications avec les patients.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 md:space-y-8">
              {automationSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-medium text-blue-600 bg-white px-3 py-1 rounded-full shadow-sm">
                        Étape {step.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200 transform hover:scale-105 transition-transform duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Exemple de SMS envoyé</h3>
                      <p className="text-sm text-gray-500">Envoyé automatiquement</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">14:30</div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200 transform hover:scale-105 transition-transform">
                    <div className="text-xs font-semibold text-blue-600 mb-2 flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Rappel de rendez-vous
                    </div>
                    <div className="text-gray-900 text-sm leading-relaxed">
                      Bonjour [Nom Patient], votre rendez-vous avec le Dr. [Nom Docteur] 
                      est prévu demain à [Heure RDV]. Merci de confirmer votre présence.
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border border-green-200 transform hover:scale-105 transition-transform">
                    <div className="text-xs font-semibold text-green-600 mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Notification de retard
                    </div>
                    <div className="text-gray-900 text-sm leading-relaxed">
                      Bonjour [Nom Patient], votre rendez-vous est retardé de 15 minutes. 
                      Nous vous prions de nous excuser pour ce contretemps.
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200 transform hover:scale-105 transition-transform">
                    <div className="text-xs font-semibold text-purple-600 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Confirmation automatique
                    </div>
                    <div className="text-gray-900 text-sm leading-relaxed">
                      Merci d'avoir confirmé votre rendez-vous. Nous vous attendons 
                      le [Date RDV] à [Heure RDV].
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-600 font-medium">SMS délivré avec succès</span>
                    </div>
                    <div className="text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">+33 6 XX XX XX XX</div>
                  </div>
                </div>
              </div>

              {/* Floating notification badges */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <Send className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Ce que disent
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> nos utilisateurs</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment Doc Notification transforme la gestion des cabinets médicaux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className={`w-14 h-14 ${testimonial.color} rounded-full mr-4 flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">&quot;{testimonial.content}&quot;</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Des tarifs
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> adaptés à votre pratique</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Choisissez le plan qui correspond à vos besoins. Aucun engagement, annulation à tout moment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg p-6 md:p-8 relative border-2 transition-all duration-300 ${
                  plan.popular 
                    ? 'border-blue-500 ring-4 ring-blue-100 transform md:scale-110 shadow-2xl' 
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
                      <Star className="w-4 h-4 fill-current" />
                      Plus populaire
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{plan.price}</span>
                    <span className="text-gray-600 ml-2 text-sm">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <span className="ml-3 text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full text-center py-3 md:py-4 px-4 rounded-xl font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                      : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-12 text-sm md:text-base">
            💳 Tous les plans incluent une garantie satisfait ou remboursé de 30 jours
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Offre limitée : 14 jours d'essai gratuit
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Prêt à transformer votre gestion des rendez-vous ?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Rejoignez des milliers de professionnels de santé qui font confiance à Doc Notification.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-all font-medium text-lg flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
              Essai gratuit 14 jours
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all font-medium text-lg shadow-lg">
              Demander une démo
            </button>
          </div>

          <p className="text-blue-100 text-sm flex items-center justify-center gap-4 flex-wrap">
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Aucune carte bancaire requise
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              Annulation à tout moment
            </span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold">Doc Notification</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                La solution tout-en-un pour la gestion intelligente des rendez-vous médicaux.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Produit</h3>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Fonctionnalités
                </a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Tarifs
                </a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Connexion
                </a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Inscription
                </a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Ressources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Documentation
                </a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Guide d'utilisation
                </a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Blog
                </a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Support
                </a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-400">
                  <Mail className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-blue-400" />
                  <a href="mailto:contact@docnotification.com" className="hover:text-white transition-colors">
                    contact@docnotification.com
                  </a>
                </li>
                <li className="flex items-start text-gray-400">
                  <Phone className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-blue-400" />
                  <a href="tel:+33123456789" className="hover:text-white transition-colors">
                    +33 1 23 45 67 89
                  </a>
                </li>
                <li className="flex items-start text-gray-400">
                  <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-blue-400" />
                  <span>123 Rue de la Santé, 75000 Paris</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Doc Notification. Tous droits réservés.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Confidentialité</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Conditions</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}