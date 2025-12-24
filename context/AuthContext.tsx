"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useRef,
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
  checkAndUpdateOverdueAppointments: () => void;
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
const createMockPatients = (): Patient[] => {
  const now = new Date();
  const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);
  const inTwoHours = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  return [
    {
      _id: 'patient-1',
      nomComplet: 'Marie Martin',
      telephone: '+33123456789',
      heureRendezVous: inTwoHours.toISOString(),
      heureEstimee: inTwoHours.toISOString(),
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
      heureRendezVous: inOneHour.toISOString(),
      heureEstimee: inOneHour.toISOString(),
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
    },
    {
      _id: 'patient-3',
      nomComplet: 'Sophie Dubois',
      telephone: '+33155556666',
      heureRendezVous: twoHoursAgo.toISOString(),
      heureEstimee: twoHoursAgo.toISOString(),
      termine: false,
      doctorId: 'test-doctor-id-123',
      doctorName: 'Dr. Jean Dupont',
      importFileName: 'patients-test.xlsx',
      importDate: new Date().toISOString(),
      statut: 'en_attente',
      smsEnvoye: false,
      notes: 'Consultation initiale'
    },
    {
      _id: 'patient-4',
      nomComplet: 'Thomas Leroy',
      telephone: '+33177778888',
      heureRendezVous: oneHourAgo.toISOString(),
      heureEstimee: oneHourAgo.toISOString(),
      termine: false,
      doctorId: 'test-doctor-id-123',
      doctorName: 'Dr. Jean Dupont',
      importFileName: 'patients-test.xlsx',
      importDate: new Date().toISOString(),
      statut: 'en_cours',
      smsEnvoye: true,
      dateSMS: oneHourAgo.toISOString(),
      messageSMS: 'Bonjour, votre rendez-vous est maintenant.',
      notes: 'Suivi mensuel'
    }
  ];
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Refs pour éviter les boucles infinies
  const fetchPatientsInProgressRef = useRef(false);
  const hasLoadedPatientsRef = useRef(false);
  const lastDoctorIdRef = useRef<string | null>(null);

  // ============= FONCTIONS UTILITAIRES (PAS DE DÉPENDANCES) =============
  
  const loadPatientsFromStorage = (): Patient[] => {
    try {
      const storedPatients = localStorage.getItem("patients");
      if (storedPatients) {
        return JSON.parse(storedPatients);
      }
    } catch (error) {
      console.error("Erreur chargement patients localStorage:", error);
    }
    return [];
  };

  const savePatientsToStorage = (patientsData: Patient[]) => {
    try {
      localStorage.setItem("patients", JSON.stringify(patientsData));
    } catch (error) {
      console.error("Erreur sauvegarde patients localStorage:", error);
    }
  };

  // ============= LOGOUT (FONCTION STABLE) =============
  
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("doctor");
    localStorage.removeItem("patients");
    localStorage.removeItem("isTestMode");
    setDoctor(null);
    setPatients([]);
    setIsTestMode(false);
    setIsInitialized(false);
    fetchPatientsInProgressRef.current = false;
    hasLoadedPatientsRef.current = false;
    lastDoctorIdRef.current = null;
    router.push("/login");
  }, [router]);

  // ============= FETCH PATIENTS (AVEC PROTECTION CONTRE BOUCLES) =============
  
  const fetchPatients = useCallback(async () => {
    // Protection contre les appels multiples simultanés
    if (fetchPatientsInProgressRef.current) {
      console.log("⏸️ fetchPatients déjà en cours, annulation");
      return;
    }

    if (!doctor || doctor.isAdmin) {
      console.log("❌ fetchPatients annulé: pas de docteur ou admin");
      return;
    }

    console.log("🚀 Début de fetchPatients");
    fetchPatientsInProgressRef.current = true;
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const testMode = localStorage.getItem("isTestMode");

      // Mode test
      if (testMode === "true") {
        console.log("📊 Mode test: Chargement patients mockés");
        const storedPatients = loadPatientsFromStorage();
        if (storedPatients.length > 0) {
          setPatients(storedPatients);
        } else {
          const mockPatients = createMockPatients();
          setPatients(mockPatients);
          savePatientsToStorage(mockPatients);
        }
        hasLoadedPatientsRef.current = true;
        return;
      }

      // Mode normal - vérifier le token
      if (!token) {
        console.log("❌ Pas de token, chargement depuis localStorage");
        const storedPatients = loadPatientsFromStorage();
        setPatients(storedPatients);
        hasLoadedPatientsRef.current = true;
        return;
      }

      console.log("📡 Appel API pour récupérer les patients...");
      const response = await fetch(`${API_URL}/api/patients`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        console.log("🔒 Token invalide, déconnexion");
        logout();
        return;
      }

      if (response.status === 404 || response.status === 204) {
        console.log("ℹ️ Aucun patient trouvé sur le serveur");
        const storedPatients = loadPatientsFromStorage();
        setPatients(storedPatients);
        hasLoadedPatientsRef.current = true;
        return;
      }

      if (!response.ok) {
        console.error("❌ Erreur API patients:", response.status);
        const storedPatients = loadPatientsFromStorage();
        setPatients(storedPatients);
        hasLoadedPatientsRef.current = true;
        return;
      }

      const data = await response.json();
      console.log("✅ Patients reçus du serveur");
      
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
      
      setPatients(patientsData);
      savePatientsToStorage(patientsData);
      hasLoadedPatientsRef.current = true;
      
    } catch (error: any) {
      console.error("❌ Erreur fetch patients:", error.message);
      const storedPatients = loadPatientsFromStorage();
      setPatients(storedPatients);
      hasLoadedPatientsRef.current = true;
    } finally {
      console.log("✅ fetchPatients terminé");
      setLoading(false);
      fetchPatientsInProgressRef.current = false;
    }
  }, [doctor, logout]);

  // ============= REFRESH PATIENTS =============
  
  const refreshPatients = useCallback(async () => {
    console.log("🔄 Rafraîchissement manuel des patients");
    hasLoadedPatientsRef.current = false;
    await fetchPatients();
  }, [fetchPatients]);

  // ============= CHECK OVERDUE APPOINTMENTS =============
  
  const checkAndUpdateOverdueAppointments = useCallback(() => {
    if (!patients.length) return;

    const now = new Date();
    let hasUpdates = false;
    
    const updatedPatients = patients.map(patient => {
      const rdvTime = new Date(patient.heureRendezVous);
      
      if (rdvTime < now && patient.statut !== 'termine') {
        hasUpdates = true;
        return {
          ...patient,
          statut: 'termine' as const,
          termine: true
        };
      }
      return patient;
    });

    if (hasUpdates) {
      setPatients(updatedPatients);
      savePatientsToStorage(updatedPatients);
    }
  }, [patients]);

  // ============= USE TEST ACCOUNT =============
  
  const useTestAccount = useCallback((role: 'doctor' | 'admin') => {
    console.log("🔄 Activation du mode test pour:", role);
    
    const testAccount = TEST_ACCOUNTS[role];
    localStorage.setItem("token", testAccount.token);
    localStorage.setItem("doctor", JSON.stringify(testAccount.doctor));
    localStorage.setItem("isTestMode", "true");
    
    setDoctor(testAccount.doctor);
    setIsTestMode(true);
    
    if (role === 'doctor') {
      console.log("📊 Création des patients de test");
      const mockPatients = createMockPatients();
      setPatients(mockPatients);
      savePatientsToStorage(mockPatients);
    } else {
      console.log("📊 Mode admin: pas de patients");
      setPatients([]);
      localStorage.removeItem("patients");
    }
    
    setIsInitialized(true);
    hasLoadedPatientsRef.current = true;
    lastDoctorIdRef.current = testAccount.doctor._id;
    
    if (role === 'admin') {
      router.push("/dashboardAdmin");
    } else {
      router.push("/dashboard");
    }
  }, [router]);

  // ============= LOGIN =============
  
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError("");

    try {
      // Vérifier les comptes de test
      if (email === TEST_ACCOUNTS.doctor.email && password === TEST_ACCOUNTS.doctor.password) {
        useTestAccount('doctor');
        return;
      }

      if (email === TEST_ACCOUNTS.admin.email && password === TEST_ACCOUNTS.admin.password) {
        useTestAccount('admin');
        return;
      }

      // Appel API réel
      const response = await fetch(`${API_URL}/api/doctors/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.message || `Erreur ${response.status}`);
        } catch {
          throw new Error(`Erreur ${response.status}`);
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
      localStorage.removeItem("patients");
      
      setDoctor(doctorData);
      setIsTestMode(false);
      setIsInitialized(true);
      hasLoadedPatientsRef.current = false;
      lastDoctorIdRef.current = doctorData._id;

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

  // ============= REGISTER =============
  
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
          throw new Error(errorData.message || `Erreur ${response.status}`);
        } catch {
          throw new Error(`Erreur ${response.status}`);
        }
      }

      const data = await response.json();

      if (!data.token || !data.doctor) {
        throw new Error("Réponse d'inscription invalide");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("doctor", JSON.stringify(data.doctor));
      localStorage.removeItem("isTestMode");
      localStorage.removeItem("patients");
      
      setDoctor(data.doctor);
      setIsTestMode(false);
      setIsInitialized(true);
      hasLoadedPatientsRef.current = false;
      lastDoctorIdRef.current = data.doctor._id;

      router.push("/compte-en-attente");
    } catch (error: any) {
      console.error("Register error:", error);
      setError(error.message || "Erreur d'inscription");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ============= IMPORT PATIENTS =============
  
  const importPatients = async (
    file: File
  ): Promise<{ success: boolean; message: string; data?: Patient[] }> => {
    if (!doctor) {
      return {
        success: false,
        message: "Veuillez vous connecter d'abord",
      };
    }

    const testMode = localStorage.getItem("isTestMode");
    
    // Mode test
    if (testMode === "true") {
      console.log("📁 Mode test: Simulation d'import de fichier", file.name);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newPatients: Patient[] = [];
      for (let i = 1; i <= 3; i++) {
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 15);
        const newId = `imported-${timestamp}-${randomId}-${i}`;
        
        const rdvDate = new Date(timestamp + 86400000 * i);
        const now = new Date();
        const statut = rdvDate < now ? 'termine' : 'en_attente';
        
        const newPatient: Patient = {
          _id: newId,
          nomComplet: `Patient Importé ${i}`,
          telephone: `+331${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`,
          heureRendezVous: rdvDate.toISOString(),
          heureEstimee: new Date(timestamp + 86400000 * i + 1800000).toISOString(),
          termine: rdvDate < now,
          doctorId: doctor._id,
          doctorName: doctor.nomComplet,
          importFileName: file.name,
          importDate: new Date().toISOString(),
          statut: statut as any,
          smsEnvoye: false,
          notes: `Importé depuis ${file.name}`
        };
        
        newPatients.push(newPatient);
      }
      
      const updatedPatients = [...patients, ...newPatients];
      setPatients(updatedPatients);
      savePatientsToStorage(updatedPatients);
      
      return {
        success: true,
        message: `Fichier "${file.name}" importé avec succès. ${newPatients.length} patients ajoutés (mode test).`,
        data: updatedPatients
      };
    }

    // Mode réel
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/api/patients/import`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'import");
      }

      const data = await response.json();
      
      // Recharger les patients après import
      hasLoadedPatientsRef.current = false;
      await fetchPatients();

      return {
        success: true,
        message: data.message || "Import réussi",
        data: data.data,
      };
    } catch (error: any) {
      console.error("Import error:", error);
      return {
        success: false,
        message: error.message || "Erreur lors de l'import",
      };
    } finally {
      setLoading(false);
    }
  };

  // ============= EXPORT PATIENTS =============
  
  const exportPatients = async (format: "csv" | "excel") => {
    if (!doctor) {
      throw new Error("Veuillez vous connecter d'abord");
    }

    const testMode = localStorage.getItem("isTestMode");
    if (testMode === "true") {
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

  // ============= SEND BULK SMS =============
  
  const sendBulkDelaySMS = async (): Promise<{
    success: boolean;
    message: string;
    data?: any;
  }> => {
    if (!doctor) {
      return {
        success: false,
        message: "Veuillez vous connecter d'abord",
      };
    }

    const testMode = localStorage.getItem("isTestMode");
    if (testMode === "true") {
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

      // Recharger les patients après envoi SMS
      hasLoadedPatientsRef.current = false;
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

  // ============= SEND SINGLE SMS (SUITE) =============
  
  const sendSMS = async (
    patientId: string,
    message?: string
  ): Promise<{ success: boolean; message: string }> => {
    if (!doctor) {
      return {
        success: false,
        message: "Veuillez vous connecter d'abord",
      };
    }

    const testMode = localStorage.getItem("isTestMode");
    if (testMode === "true") {
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

      // Recharger les patients
      hasLoadedPatientsRef.current = false;
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

  // ============= UPDATE PATIENT =============
  
  const updatePatient = async (
    patientId: string,
    data: Partial<Patient>
  ): Promise<{ success: boolean; message: string }> => {
    if (!doctor) {
      return {
        success: false,
        message: "Veuillez vous connecter d'abord",
      };
    }

    const testMode = localStorage.getItem("isTestMode");
    
    const updatedPatients = patients.map(patient => {
      if (patient._id === patientId) {
        return { ...patient, ...data };
      }
      return patient;
    });
    
    setPatients(updatedPatients);
    savePatientsToStorage(updatedPatients);

    if (testMode === "true") {
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
      
      // Recharger les patients
      hasLoadedPatientsRef.current = false;
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

  // ============= DELETE PATIENT =============
  
  const deletePatient = async (
    patientId: string
  ): Promise<{ success: boolean; message: string }> => {
    if (!doctor) {
      return {
        success: false,
        message: "Veuillez vous connecter d'abord",
      };
    }

    const testMode = localStorage.getItem("isTestMode");
    
    const updatedPatients = patients.filter(patient => patient._id !== patientId);
    setPatients(updatedPatients);
    savePatientsToStorage(updatedPatients);

    if (testMode === "true") {
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
        console.error("Erreur suppression API:", errorData);
        throw new Error(errorData.message || "Erreur lors de la suppression");
      }

      const data = await response.json();
      
      return {
        success: true,
        message: data.message || "Patient supprimé avec succès",
      };
    } catch (error: any) {
      console.error("Delete patient error:", error);
      return {
        success: false,
        message: "Patient supprimé localement (erreur serveur: " + error.message + ")"
      };
    }
  };

  // ============= CHECK USER STATUS =============
  
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

  // ============= EFFECT: CHECK AUTH ON MOUNT =============
  
  useEffect(() => {
    if (isInitialized) return;

    const checkAuth = () => {
      try {
        const token = localStorage.getItem("token");
        const doctorData = localStorage.getItem("doctor");
        const testMode = localStorage.getItem("isTestMode");

        if (token && doctorData) {
          const parsedDoctor = JSON.parse(doctorData);
          setDoctor(parsedDoctor);
          setIsTestMode(testMode === "true");
          lastDoctorIdRef.current = parsedDoctor._id;
          
          const storedPatients = loadPatientsFromStorage();
          if (storedPatients.length > 0) {
            setPatients(storedPatients);
            hasLoadedPatientsRef.current = true;
          } else if (testMode === "true" && parsedDoctor && !parsedDoctor.isAdmin) {
            const mockPatients = createMockPatients();
            setPatients(mockPatients);
            hasLoadedPatientsRef.current = true;
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
  }, [isInitialized]);

  // ============= EFFECT: LOAD PATIENTS WHEN DOCTOR CHANGES =============
  
  useEffect(() => {
    // Ne charger les patients que si:
    // 1. L'app est initialisée
    // 2. Il y a un docteur
    // 3. Le docteur est actif
    // 4. Le docteur n'est pas admin
    // 5. Les patients n'ont pas déjà été chargés pour ce docteur
    // 6. Le docteur a changé
    
    if (!isInitialized || !doctor || !doctor.isActive || doctor.isAdmin) {
      return;
    }

    // Si le docteur a changé, réinitialiser le flag
    if (lastDoctorIdRef.current !== doctor._id) {
      hasLoadedPatientsRef.current = false;
      lastDoctorIdRef.current = doctor._id;
    }

    // Charger les patients seulement si pas déjà chargés
    if (!hasLoadedPatientsRef.current && !fetchPatientsInProgressRef.current) {
      console.log("🔄 Chargement automatique des patients pour le docteur:", doctor._id);
      fetchPatients();
    }
  }, [isInitialized, doctor, fetchPatients]);

  // ============= EFFECT: CHECK OVERDUE APPOINTMENTS =============
  
  useEffect(() => {
    if (!isInitialized || !doctor || doctor.isAdmin) return;

    const interval = setInterval(() => {
      checkAndUpdateOverdueAppointments();
    }, 60000);

    return () => clearInterval(interval);
  }, [isInitialized, doctor, checkAndUpdateOverdueAppointments]);

  // ============= EFFECT: CHECK USER STATUS =============
  
  useEffect(() => {
    if (isInitialized) {
      checkUserStatusAndRedirect();
    }
  }, [isInitialized, pathname, checkUserStatusAndRedirect]);

  // ============= CONTEXT VALUE =============
  
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
    checkAndUpdateOverdueAppointments,
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