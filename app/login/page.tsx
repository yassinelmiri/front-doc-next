"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  AlertCircle,
  Stethoscope,
  User,
  TestTube,
  Shield,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, useTestAccount } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (error: any) {
      setError(error.message || "Email ou mot de passe incorrect");
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour utiliser les comptes de test
  const handleTestLogin = (role: "doctor" | "admin") => {
    setError("");
    setIsLoading(true);

    // Remplir les champs avec les identifiants de test
    if (role === "doctor") {
      setEmail("docteur.test@example.com");
      setPassword("Test123!");
    } else {
      setEmail("admin.test@example.com");
      setPassword("Admin123!");
    }

    // Utiliser la fonction de test du AuthContext
    setTimeout(() => {
      useTestAccount(role);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bon retour !
          </h2>
          <p className="text-gray-600">Connectez-vous à votre compte</p>
        </div>

        {/* Boutons de test rapide */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <TestTube className="w-5 h-5 text-blue-600" />
              <p className="text-sm font-medium text-blue-700">Mode test</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleTestLogin("doctor")}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-blue-200 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
              >
                <User className="w-4 h-4" />
                Docteur Test
              </button>
              <button
                type="button"
                onClick={() => handleTestLogin("admin")}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-white border border-purple-200 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50 transition-colors shadow-sm"
              >
                <Shield className="w-4 h-4" />
                Admin Test
              </button>
            </div>
          </div>
        </div>

        {/* Carte du formulaire */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Message d'erreur */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="jean.dupont@exemple.com"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:opacity-70 transition-opacity"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Mot de passe oublié */}
            <div className="flex items-center justify-end">
              <Link
                href="/reset-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Connexion en cours...
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>
          {/* Lien vers inscription */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Vous n'avez pas de compte ?{" "}
              <Link
                href="/register"
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </div>

        {/* Footer avec info comptes test */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 mb-2">© 2025 Créé par Anntel </p>
        </div>
      </div>
    </div>
  );
}
