"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useRouter, usePathname } from "next/navigation";

interface Doctor {
  _id: string;
  nomComplet: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  specialties: string[];
  isActive: boolean;
  isAdmin: boolean;
  [key: string]: any;
}

interface Patient {
  _id: string;
  nomComplet: string;
  telephone: string;
  heureRendezVous: string;
  heureEstimee: string;
  termine: boolean;
  doctorId: string;
  doctorName: string;
  importFileName: string;
  importDate: string;
  statut: "en_attente" | "en_cours" | "retarde" | "termine";
  smsEnvoye: boolean;
  dateSMS?: string;
  messageSMS?: string;
  retardMinutes?: number;
  notes?: string;
}

interface AuthContextType {
  doctor: Doctor | null;
  patients: Patient[];
  loading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<void>;
  register: (
    nomComplet: string,
    email: string,
    password: string,
    additionalData: any
  ) => Promise<void>;
  logout: () => void;
  fetchPatients: () => Promise<void>;
  importPatients: (
    file: File
  ) => Promise<{ success: boolean; message: string; data?: Patient[] }>;
  exportPatients: (format: "csv" | "excel") => Promise<void>;
  sendBulkDelaySMS: () => Promise<{
    success: boolean;
    message: string;
    data?: any;
  }>;
  sendSMS: (
    patientId: string,
    message?: string
  ) => Promise<{ success: boolean; message: string }>;
  updatePatient: (
    patientId: string,
    data: Partial<Patient>
  ) => Promise<{ success: boolean; message: string }>;
  deletePatient: (
    patientId: string
  ) => Promise<{ success: boolean; message: string }>;
  checkUserStatusAndRedirect: () => void;
  isInitialized: boolean;
  useTestAccount: (role: 'doctor' | 'admin') => void;
  isTestMode: boolean;
  refreshPatients: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://backend-doc-delta.vercel.app";

// Données de test pour les comptes mock
const TEST_ACCOUNTS = {
  doctor: {
    email: 'docteur.test@example.com',
    password: 'Test123!',
    doctor: {
      _id: 'test-doctor-id-123',
      nomComplet: 'Dr. Jean Dupont',
      email: 'docteur.test@example.com',
      address: '123 Rue de la Santé',
      postalCode: '75000',
      city: 'Paris',
      specialties: ['Cardiologie', 'Médecine Générale'],
      isActive: true,
      isAdmin: false
    },
    token: 'mock-token-for-doctor-12345'
  },
  admin: {
    email: 'admin.test@example.com',
    password: 'Admin123!',
    doctor: {
      _id: 'test-admin-id-456',
      nomComplet: 'Admin System',
      email: 'admin.test@example.com',
      address: '456 Admin Street',
      postalCode: '75001',
      city: 'Paris',
      specialties: [],
      isActive: true,
      isAdmin: true
    },
    token: 'mock-token-for-admin-67890'
  }
};

// Données mockées pour les patients de test
const MOCK_PATIENTS: Patient[] = [
  {
    _id: 'patient-1',
    nomComplet: 'Marie Martin',
    telephone: '+33123456789',
    heureRendezVous: new Date(Date.now() + 36000000).toISOString(),
    heureEstimee: new Date(Date.now() + 54000000).toISOString(),
    termine: false,
    doctorId: 'test-doctor-id-123',
    doctorName: 'Dr. Jean Dupont',
    importFileName: 'patients-test.xlsx',
    importDate: new Date().toISOString(),
    statut: 'en_attente',
    smsEnvoye: false,
    notes: 'Première consultation - Suivi régulier'
  },
  {
    _id: 'patient-2',
    nomComplet: 'Pierre Bernard',
    telephone: '+33198765432',
    heureRendezVous: new Date(Date.now() + 7200000).toISOString(),
    heureEstimee: new Date(Date.now() + 8100000).toISOString(),
    termine: false,
    doctorId: 'test-doctor-id-123',
    doctorName: 'Dr. Jean Dupont',
    importFileName: 'patients-test.xlsx',
    importDate: new Date().toISOString(),
    statut: 'en_cours',
    smsEnvoye: true,
    dateSMS: new Date(Date.now() - 1800000).toISOString(),
    messageSMS: 'Bonjour, votre rendez-vous est dans 30 minutes.',
    notes: 'Patient régulier - À surveiller'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Charger les patients depuis localStorage
  const loadPatientsFromStorage = useCallback(() => {
    try {
      const storedPatients = localStorage.getItem("patients");
      if (storedPatients) {
        const parsedPatients = JSON.parse(storedPatients);
        console.log("📂 Patients chargés depuis localStorage:", parsedPatients.length);
        return parsedPatients;
      }
    } catch (error) {
      console.error("Erreur chargement patients localStorage:", error);
    }
    return [];
  }, []);

  // Sauvegarder les patients dans localStorage
  const savePatientsToStorage = useCallback((patientsData: Patient[]) => {
    try {
      localStorage.setItem("patients", JSON.stringify(patientsData));
      console.log("💾 Patients sauvegardés dans localStorage:", patientsData.length);
    } catch (error) {
      console.error("Erreur sauvegarde patients localStorage:", error);
    }
  }, []);

  // Fonction pour utiliser un compte de test
  const useTestAccount = useCallback((role: 'doctor' | 'admin') => {
    const testAccount = TEST_ACCOUNTS[role];
    localStorage.setItem("token", testAccount.token);
    localStorage.setItem("doctor", JSON.stringify(testAccount.doctor));
    localStorage.setItem("isTestMode", "true");
    setDoctor(testAccount.doctor);
    setIsTestMode(true);
    
    if (role === 'doctor') {
      console.log("📊 Mode test: Chargement des patients mockés");
      setPatients(MOCK_PATIENTS);
      savePatientsToStorage(MOCK_PATIENTS);
    } else {
      console.log("📊 Mode test admin: Pas de patients");
      setPatients([]);
      localStorage.removeItem("patients");
    }
    
    setIsInitialized(true);
    
    if (role === 'admin') {
      router.push("/dashboardAdmin");
    } else {
      router.push("/dashboard");
    }
  }, [router, savePatientsToStorage]);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      if (isInitialized) return;

      try {
        const token = localStorage.getItem("token");
        const doctorData = localStorage.getItem("doctor");
        const testMode = localStorage.getItem("isTestMode");

        if (token && doctorData) {
          const parsedDoctor = JSON.parse(doctorData);
          setDoctor(parsedDoctor);
          setIsTestMode(testMode === "true");
          
          // Charger les patients depuis localStorage
          const storedPatients = loadPatientsFromStorage();
          if (storedPatients.length > 0) {
            console.log("📂 Utilisation des patients stockés:", storedPatients.length);
            setPatients(storedPatients);
          } else if (testMode === "true" && parsedDoctor && !parsedDoctor.isAdmin) {
            console.log("📊 Mode test: Chargement patients mockés");
            setPatients(MOCK_PATIENTS);
          }
        }
      } catch (error) {
        console.error("Erreur vérification auth:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("doctor");
        localStorage.removeItem("patients");
        localStorage.removeItem("isTestMode");
        setDoctor(null);
        setPatients([]);
        setIsTestMode(false);
      } finally {
        setIsInitialized(true);
      }
    };

    checkAuth();
  }, [isInitialized, loadPatientsFromStorage]);

  // Login
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError("");

    try {
      // Vérifier si c'est un compte de test
      if (email === TEST_ACCOUNTS.doctor.email && password === TEST_ACCOUNTS.doctor.password) {
        console.log("🔧 Mode test activé: Compte Docteur");
        useTestAccount('doctor');
        return;
      }

      if (email === TEST_ACCOUNTS.admin.email && password === TEST_ACCOUNTS.admin.password) {
        console.log("🔧 Mode test activé: Compte Admin");
        useTestAccount('admin');
        return;
      }

      // API normale
      const response = await fetch(`${API_URL}/api/doctors/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.message || `Erreur ${response.status}: ${response.statusText}`);
        } catch {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
      }

      const data = await response.json();

      let doctorData: Doctor;
      let token: string;

      if (data.data && data.data.token) {
        token = data.data.token;
        doctorData = data.data.doctor || data.data;
      } else if (data.token) {
        token = data.token;
        doctorData = data.doctor || data;
      } else {
        throw new Error("Structure de réponse invalide");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("doctor", JSON.stringify(doctorData));
      localStorage.removeItem("isTestMode");
      
      setDoctor(doctorData);
      setIsTestMode(false);
      setIsInitialized(true);

      // Rediriger
      if (!doctorData.isActive) {
        router.push("/compte-en-attente");
      } else if (doctorData.isAdmin) {
        router.push("/dashboardAdmin");
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Erreur de connexion");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (
    nomComplet: string,
    email: string,
    password: string,
    additionalData: any
  ) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/doctors/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomComplet,
          email,
          password,
          ...additionalData,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.message || `Erreur ${response.status}: ${response.statusText}`);
        } catch {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
      }

      const data = await response.json();

      if (!data.token || !data.doctor) {
        throw new Error("Réponse d'inscription invalide");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("doctor", JSON.stringify(data.doctor));
      localStorage.removeItem("isTestMode");
      
      setDoctor(data.doctor);
      setIsTestMode(false);
      setIsInitialized(true);

      router.push("/compte-en-attente");
    } catch (error: any) {
      console.error("Register error:", error);
      setError(error.message || "Erreur d'inscription");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("doctor");
    localStorage.removeItem("patients");
    localStorage.removeItem("isTestMode");
    setDoctor(null);
    setPatients([]);
    setIsTestMode(false);
    setIsInitialized(false);
    router.push("/login");
  };

  // Fetch patients
  const fetchPatients = useCallback(async () => {
    if (!isInitialized || !doctor || doctor.isAdmin) {
      console.log("Fetch patients skipped: not initialized or no doctor or admin");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const testMode = localStorage.getItem("isTestMode");

      // Mode test: utiliser les données du localStorage
      if (testMode === "true") {
        console.log("📊 Mode test: Chargement patients depuis localStorage");
        const storedPatients = loadPatientsFromStorage();
        if (storedPatients.length > 0) {
          setPatients(storedPatients);
        } else {
          setPatients(MOCK_PATIENTS);
          savePatientsToStorage(MOCK_PATIENTS);
        }
        return;
      }

      if (!token) {
        console.log("❌ Pas de token, chargement depuis localStorage");
        const storedPatients = loadPatientsFromStorage();
        setPatients(storedPatients);
        return;
      }

      // Appel API pour récupérer les patients
      console.log("📡 Récupération des patients depuis l'API...");
      const response = await fetch(`${API_URL}/api/patients`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        console.log("❌ Token invalide, déconnexion");
        logout();
        return;
      }

      if (response.status === 404 || response.status === 204) {
        console.log("ℹ️ Aucun patient trouvé sur le serveur");
        const storedPatients = loadPatientsFromStorage();
        setPatients(storedPatients);
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Erreur API patients:", errorText);
        const storedPatients = loadPatientsFromStorage();
        setPatients(storedPatients);
        return;
      }

      const data = await response.json();
      console.log("✅ Patients reçus du serveur:", data);

      let patientsData: Patient[] = [];
      
      if (data.success && Array.isArray(data.data)) {
        patientsData = data.data;
      } else if (Array.isArray(data)) {
        patientsData = data;
      } else if (data.data && Array.isArray(data.data)) {
        patientsData = data.data;
      } else if (data.patients && Array.isArray(data.patients)) {
        patientsData = data.patients;
      }

      console.log(`📊 ${patientsData.length} patients chargés`);
      
      // Mettre à jour l'état et le localStorage
      setPatients(patientsData);
      savePatientsToStorage(patientsData);
      
    } catch (error: any) {
      console.error("❌ Erreur fetch patients:", error);
      const storedPatients = loadPatientsFromStorage();
      setPatients(storedPatients);
    } finally {
      setLoading(false);
    }
  }, [isInitialized, doctor, logout, loadPatientsFromStorage, savePatientsToStorage]);

  // Fonction de rafraîchissement
  const refreshPatients = useCallback(async () => {
    console.log("🔄 Rafraîchissement manuel des patients");
    await fetchPatients();
  }, [fetchPatients]);

  // Charger les patients automatiquement
  useEffect(() => {
    if (isInitialized && doctor && doctor.isActive && !doctor.isAdmin) {
      console.log("🚀 Chargement initial des patients");
      fetchPatients();
    }
  }, [isInitialized, doctor, fetchPatients]);

  // Import patients - CORRIGÉ POUR MODE TEST
  const importPatients = async (
    file: File
  ): Promise<{ success: boolean; message: string; data?: Patient[] }> => {
    if (!isInitialized || !doctor) {
      return {
        success: false,
        message: "Veuillez vous connecter d'abord",
      };
    }

    const testMode = localStorage.getItem("isTestMode");
    
    // EN MODE TEST - CORRECTION CRITIQUE
    if (testMode === "true") {
      console.log("📁 Mode test: Simulation d'import de fichier", file.name);
      
      // Simuler un délai d'import
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Générer 3 nouveaux patients simulés
      const newPatients: Patient[] = [];
      for (let i = 1; i <= 3; i++) {
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 15);
        const newId = `imported-${timestamp}-${randomId}-${i}`;
        
        const newPatient: Patient = {
          _id: newId,
          nomComplet: `Patient Importé ${i}`,
          telephone: `+331${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`,
          heureRendezVous: new Date(timestamp + 86400000 * i).toISOString(),
          heureEstimee: new Date(timestamp + 86400000 * i + 1800000).toISOString(),
          termine: false,
          doctorId: doctor._id,
          doctorName: doctor.nomComplet,
          importFileName: file.name,
          importDate: new Date().toISOString(),
          statut: 'en_attente' as const,
          smsEnvoye: false,
          notes: `Importé depuis ${file.name}`
        };
        
        newPatients.push(newPatient);
      }
      
      console.log("✅ Patients générés en mode test:", newPatients);
      
      // CORRECTION: Ajouter les nouveaux patients à la liste existante
      const currentPatients = patients; // Utiliser l'état actuel
      const updatedPatients = [...currentPatients, ...newPatients];
      
      console.log("📊 Avant import:", currentPatients.length, "patients");
      console.log("📊 Après import:", updatedPatients.length, "patients");
      
      // Mettre à jour l'état IMMÉDIATEMENT
      setPatients(updatedPatients);
      
      // Sauvegarder dans localStorage
      savePatientsToStorage(updatedPatients);
      
      console.log("💾 Patients sauvegardés dans localStorage:", updatedPatients.length);
      
      return {
        success: true,
        message: `Fichier "${file.name}" importé avec succès. ${newPatients.length} patients ajoutés (mode test).`,
        data: updatedPatients
      };
    }

    // MODE RÉEL (API)
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", file);

      console.log("📤 Envoi du fichier à l'API...");
      const response = await fetch(`${API_URL}/api/patients/import`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Erreur import API:", errorData);
        throw new Error(errorData.message || "Erreur lors de l'import");
      }

      const data = await response.json();
      console.log("✅ Import réussi:", data);

      // Rafraîchir les patients depuis l'API
      await fetchPatients();

      return {
        success: true,
        message: data.message || "Import réussi",
        data: data.data,
      };
    } catch (error: any) {
      console.error("❌ Import error:", error);
      return {
        success: false,
        message: error.message || "Erreur lors de l'import",
      };
    } finally {
      setLoading(false);
    }
  };

  // Export patients
  const exportPatients = async (format: "csv" | "excel") => {
    if (!isInitialized || !doctor) {
      throw new Error("Veuillez vous connecter d'abord");
    }

    const testMode = localStorage.getItem("isTestMode");
    if (testMode === "true") {
      console.log("📤 Mode test: Simulation d'export", format);
      
      const content = "Nom,Téléphone,Heure RDV,Statut\n" +
        patients.map(p => 
          `${p.nomComplet},${p.telephone},${new Date(p.heureRendezVous).toLocaleString()},${p.statut}`
        ).join("\n");
      
      const blob = new Blob([content], { type: format === "csv" ? "text/csv" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `patients_${new Date().toISOString().split('T')[0]}.${format === "csv" ? "csv" : "xlsx"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/patients/export/${format}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'export");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `patients_${new Date().toISOString().split('T')[0]}.${
        format === "csv" ? "csv" : "xlsx"
      }`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error("Erreur export:", error);
      throw error;
    }
  };

  // Send bulk delay SMS
  const sendBulkDelaySMS = async (): Promise<{
    success: boolean;
    message: string;
    data?: any;
  }> => {
    if (!isInitialized || !doctor) {
      return {
        success: false,
        message: "Veuillez vous connecter d'abord",
      };
    }

    const testMode = localStorage.getItem("isTestMode");
    if (testMode === "true") {
      console.log("📱 Mode test: Simulation d'envoi de SMS en masse");
      
      const waitingPatients = patients.filter(p => p.statut === "en_attente");
      
      if (waitingPatients.length === 0) {
        return {
          success: false,
          message: "Aucun patient en attente pour envoyer des SMS (mode test)"
        };
      }
      
      const updatedPatients = patients.map(patient => {
        if (patient.statut === "en_attente") {
          return {
            ...patient,
            smsEnvoye: true,
            dateSMS: new Date().toISOString(),
            messageSMS: `Bonjour ${patient.nomComplet}, votre rendez-vous est prévu à ${new Date(patient.heureRendezVous).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}.`
          };
        }
        return patient;
      });
      
      setPatients(updatedPatients);
      savePatientsToStorage(updatedPatients);
      
      return {
        success: true,
        message: `${waitingPatients.length} SMS envoyés avec succès (mode test)`,
        data: { count: waitingPatients.length }
      };
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/patients/sms/delay-bulk`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'envoi des SMS");
      }

      const data = await response.json();

      await fetchPatients();

      return {
        success: true,
        message: data.message || "SMS envoyés avec succès",
        data: data.data,
      };
    } catch (error: any) {
      console.error("Bulk SMS error:", error);
      return {
        success: false,
        message: error.message || "Erreur lors de l'envoi des SMS",
      };
    } finally {
      setLoading(false);
    }
  };

  // Send SMS to single patient
  const sendSMS = async (
    patientId: string,
    message?: string
  ): Promise<{ success: boolean; message: string }> => {
    if (!isInitialized || !doctor) {
      return {
        success: false,
        message: "Veuillez vous connecter d'abord",
      };
    }

    const testMode = localStorage.getItem("isTestMode");
    if (testMode === "true") {
      console.log("📱 Mode test: Simulation d'envoi de SMS à un patient");
      
      const patient = patients.find(p => p._id === patientId);
      if (!patient) {
        return {
          success: false,
          message: "Patient non trouvé (mode test)"
        };
      }
      
      const updatedPatients = patients.map(p => {
        if (p._id === patientId) {
          return {
            ...p,
            smsEnvoye: true,
            dateSMS: new Date().toISOString(),
            messageSMS: message || `Bonjour ${p.nomComplet}, rappel de votre rendez-vous.`
          };
        }
        return p;
      });
      
      setPatients(updatedPatients);
      savePatientsToStorage(updatedPatients);
      
      return {
        success: true,
        message: `SMS envoyé à ${patient.nomComplet} (mode test)`
      };
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/patients/${patientId}/sms`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'envoi du SMS");
      }

      const data = await response.json();

      await fetchPatients();

      return {
        success: true,
        message: data.message || "SMS envoyé avec succès",
      };
    } catch (error: any) {
      console.error("Send SMS error:", error);
      return {
        success: false,
        message: error.message || "Erreur lors de l'envoi du SMS",
      };
    }
  };

  // Update patient
  const updatePatient = async (
    patientId: string,
    data: Partial<Patient>
  ): Promise<{ success: boolean; message: string }> => {
    if (!isInitialized || !doctor) {
      return {
        success: false,
        message: "Veuillez vous connecter d'abord",
      };
    }

    const testMode = localStorage.getItem("isTestMode");
    
    // Mettre à jour localement
    const updatedPatients = patients.map(patient => {
      if (patient._id === patientId) {
        return { ...patient, ...data };
      }
      return patient;
    });
    
    setPatients(updatedPatients);
    savePatientsToStorage(updatedPatients);

    if (testMode === "true") {
      console.log("🔄 Mode test: Mise à jour patient", patientId, data);
      return {
        success: true,
        message: "Patient mis à jour avec succès (mode test)"
      };
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/patients/${patientId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la mise à jour");
      }

      const responseData = await response.json();
      
      await fetchPatients();

      return {
        success: true,
        message: responseData.message || "Patient mis à jour avec succès",
      };
    } catch (error: any) {
      console.error("Update patient error:", error);
      return {
        success: false,
        message: error.message || "Erreur lors de la mise à jour",
      };
    }
  };

  // Delete patient
  const deletePatient = async (
    patientId: string
  ): Promise<{ success: boolean; message: string }> => {
    if (!isInitialized || !doctor) {
      return {
        success: false,
        message: "Veuillez vous connecter d'abord",
      };
    }

    const testMode = localStorage.getItem("isTestMode");
    
    // Supprimer localement
    const updatedPatients = patients.filter(patient => patient._id !== patientId);
    setPatients(updatedPatients);
    savePatientsToStorage(updatedPatients);

    if (testMode === "true") {
      console.log("🗑️ Mode test: Suppression patient", patientId);
      return {
        success: true,
        message: "Patient supprimé avec succès (mode test)"
      };
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/patients/${patientId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Erreur suppression API:", errorData);
        throw new Error(errorData.message || "Erreur lors de la suppression");
      }

      const data = await response.json();
      console.log("✅ Suppression API réussie:", data);
      
      return {
        success: true,
        message: data.message || "Patient supprimé avec succès",
      };
    } catch (error: any) {
      console.error("❌ Delete patient error:", error);
      return {
        success: false,
        message: "Patient supprimé localement (erreur serveur: " + error.message + ")"
      };
    }
  };

  // Fonction pour vérifier le statut et rediriger
  const checkUserStatusAndRedirect = useCallback(() => {
    if (!doctor || !isInitialized) return;

    const publicPages = ['/login', '/register', '/compte-en-attente'];
    const currentPath = pathname || '/';

    if (publicPages.includes(currentPath)) return;

    if (!doctor.isActive) {
      router.push("/compte-en-attente");
      return;
    }

    if (doctor.isAdmin && !currentPath.includes('dashboardAdmin')) {
      router.push("/dashboardAdmin");
    } else if (!doctor.isAdmin && !currentPath.includes('dashboard')) {
      router.push("/dashboard");
    }
  }, [doctor, isInitialized, router, pathname]);

  useEffect(() => {
    if (isInitialized) {
      checkUserStatusAndRedirect();
    }
  }, [isInitialized, checkUserStatusAndRedirect]);

  const value = {
    doctor,
    patients,
    loading: loading || !isInitialized,
    error,
    login,
    register,
    logout,
    fetchPatients,
    importPatients,
    exportPatients,
    sendBulkDelaySMS,
    sendSMS,
    updatePatient,
    deletePatient,
    checkUserStatusAndRedirect,
    isInitialized,
    useTestAccount,
    isTestMode,
    refreshPatients,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}