(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/context/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL ?? "https://backend-doc-delta.vercel.app";
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
            specialties: [
                'Cardiologie',
                'Médecine Générale'
            ],
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
const MOCK_PATIENTS = [
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
    },
    {
        _id: 'patient-3',
        nomComplet: 'Sophie Laurent',
        telephone: '+33155556677',
        heureRendezVous: new Date(Date.now() - 7200000).toISOString(),
        heureEstimee: new Date(Date.now() - 6300000).toISOString(),
        termine: false,
        doctorId: 'test-doctor-id-123',
        doctorName: 'Dr. Jean Dupont',
        importFileName: 'patients-test.xlsx',
        importDate: new Date().toISOString(),
        statut: 'termine',
        smsEnvoye: true,
        dateSMS: new Date(Date.now() - 2400000).toISOString(),
        messageSMS: 'Désolé du retard, arrivée dans 15 minutes.',
        retardMinutes: 45,
        notes: 'Nouveau patient - Premier examen'
    },
    {
        _id: 'patient-4',
        nomComplet: 'Thomas Dubois',
        telephone: '+33122223333',
        heureRendezVous: new Date(Date.now() - 7200000).toISOString(),
        heureEstimee: new Date(Date.now() - 6300000).toISOString(),
        termine: true,
        doctorId: 'test-doctor-id-123',
        doctorName: 'Dr. Jean Dupont',
        importFileName: 'patients-test.xlsx',
        importDate: new Date().toISOString(),
        statut: 'termine',
        smsEnvoye: true,
        dateSMS: new Date(Date.now() - 10800000).toISOString(),
        messageSMS: 'Bonjour, rappel: votre RDV est à 10h.',
        notes: 'Consultation terminée - Suivi dans 3 mois'
    },
    {
        _id: 'patient-5',
        nomComplet: 'Isabelle Moreau',
        telephone: '+33144445555',
        heureRendezVous: new Date(Date.now() + 14400000).toISOString(),
        heureEstimee: new Date(Date.now() + 15300000).toISOString(),
        termine: false,
        doctorId: 'test-doctor-id-123',
        doctorName: 'Dr. Jean Dupont',
        importFileName: 'patients-test.xlsx',
        importDate: new Date().toISOString(),
        statut: 'en_attente',
        smsEnvoye: false,
        notes: 'Patient VIP - Examen approfondi'
    }
];
function AuthProvider({ children }) {
    _s();
    const [doctor, setDoctor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [patients, setPatients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isInitialized, setIsInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isTestMode, setIsTestMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    // Fonction pour utiliser un compte de test
    const useTestAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[useTestAccount]": (role)=>{
            const testAccount = TEST_ACCOUNTS[role];
            localStorage.setItem("token", testAccount.token);
            localStorage.setItem("doctor", JSON.stringify(testAccount.doctor));
            localStorage.setItem("isTestMode", "true");
            setDoctor(testAccount.doctor);
            setIsTestMode(true);
            // Charger les patients mockés uniquement pour le docteur
            if (role === 'doctor') {
                console.log("📊 Mode test: Chargement des patients mockés");
                setPatients(MOCK_PATIENTS);
            } else {
                console.log("📊 Mode test admin: Pas de patients");
                setPatients([]);
            }
            setIsInitialized(true);
            // Rediriger selon le rôle
            if (role === 'admin') {
                router.push("/dashboardAdmin");
            } else {
                router.push("/dashboard");
            }
        }
    }["AuthProvider.useCallback[useTestAccount]"], [
        router
    ]);
    // Fonction pour vérifier le statut et rediriger
    const checkUserStatusAndRedirect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[checkUserStatusAndRedirect]": ()=>{
            if (!doctor || !isInitialized) return;
            // Pages publiques qui ne nécessitent pas de redirection
            const publicPages = [
                '/login',
                '/register',
                '/compte-en-attente'
            ];
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
        }
    }["AuthProvider.useCallback[checkUserStatusAndRedirect]"], [
        doctor,
        isInitialized,
        router,
        pathname
    ]);
    // Charger les patients depuis localStorage au démarrage
    const loadPatientsFromStorage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[loadPatientsFromStorage]": ()=>{
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
        }
    }["AuthProvider.useCallback[loadPatientsFromStorage]"], []);
    // Sauvegarder les patients dans localStorage
    const savePatientsToStorage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[savePatientsToStorage]": (patientsData)=>{
            try {
                localStorage.setItem("patients", JSON.stringify(patientsData));
                console.log("💾 Patients sauvegardés dans localStorage:", patientsData.length);
            } catch (error) {
                console.error("Erreur sauvegarde patients localStorage:", error);
            }
        }
    }["AuthProvider.useCallback[savePatientsToStorage]"], []);
    // Vérifier l'authentification au chargement
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const checkAuth = {
                "AuthProvider.useEffect.checkAuth": async ()=>{
                    if (isInitialized) return;
                    try {
                        const token = localStorage.getItem("token");
                        const doctorData = localStorage.getItem("doctor");
                        const testMode = localStorage.getItem("isTestMode");
                        if (token && doctorData) {
                            const parsedDoctor = JSON.parse(doctorData);
                            setDoctor(parsedDoctor);
                            setIsTestMode(testMode === "true");
                            // Charger les patients depuis localStorage pour mode test ou normal
                            const storedPatients = loadPatientsFromStorage();
                            if (storedPatients.length > 0) {
                                console.log("📂 Utilisation des patients stockés:", storedPatients.length);
                                setPatients(storedPatients);
                            } else if (testMode === "true" && parsedDoctor && !parsedDoctor.isAdmin) {
                                // Mode test: charger les patients mockés
                                console.log("📊 Mode test: Chargement patients mockés");
                                setPatients(MOCK_PATIENTS);
                                savePatientsToStorage(MOCK_PATIENTS);
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
                    } finally{
                        setIsInitialized(true);
                    }
                }
            }["AuthProvider.useEffect.checkAuth"];
            checkAuth();
        }
    }["AuthProvider.useEffect"], [
        isInitialized,
        loadPatientsFromStorage,
        savePatientsToStorage
    ]);
    // Appeler checkUserStatusAndRedirect quand l'authentification est initialisée
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            if (isInitialized) {
                checkUserStatusAndRedirect();
            }
        }
    }["AuthProvider.useEffect"], [
        isInitialized,
        checkUserStatusAndRedirect
    ]);
    // Fonction pour vérifier la validité du token
    const verifyToken = async (token)=>{
        if (isTestMode) {
            return true;
        }
        try {
            const response = await fetch(`${API_URL}/api/doctors/verify-token`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.ok;
        } catch  {
            return false;
        }
    };
    // Login
    const login = async (email, password)=>{
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
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            if (!response.ok) {
                const errorText = await response.text();
                try {
                    const errorData = JSON.parse(errorText);
                    throw new Error(errorData.message || `Erreur ${response.status}: ${response.statusText}`);
                } catch  {
                    throw new Error(`Erreur ${response.status}: ${response.statusText}`);
                }
            }
            const data = await response.json();
            let doctorData;
            let token;
            if (data.data && data.data.token) {
                token = data.data.token;
                doctorData = data.data.doctor || data.data;
            } else if (data.token) {
                token = data.token;
                doctorData = data.doctor || data;
            } else {
                throw new Error("Structure de réponse invalide");
            }
            // Vérifier le token
            const isValidToken = await verifyToken(token);
            if (!isValidToken) {
                throw new Error("Token invalide");
            }
            localStorage.setItem("token", token);
            localStorage.setItem("doctor", JSON.stringify(doctorData));
            localStorage.removeItem("isTestMode");
            localStorage.removeItem("patients"); // Nettoyer les anciens patients
            setDoctor(doctorData);
            setIsTestMode(false);
            setIsInitialized(true);
            // Rediriger selon le statut
            if (!doctorData.isActive) {
                router.push("/compte-en-attente");
            } else if (doctorData.isAdmin) {
                router.push("/dashboardAdmin");
            } else {
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError(error.message || "Erreur de connexion");
            throw error;
        } finally{
            setLoading(false);
        }
    };
    // Register
    const register = async (nomComplet, email, password, additionalData)=>{
        setLoading(true);
        setError("");
        try {
            const response = await fetch(`${API_URL}/api/doctors/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nomComplet,
                    email,
                    password,
                    ...additionalData
                })
            });
            if (!response.ok) {
                const errorText = await response.text();
                try {
                    const errorData = JSON.parse(errorText);
                    throw new Error(errorData.message || `Erreur ${response.status}: ${response.statusText}`);
                } catch  {
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
            localStorage.removeItem("patients");
            setDoctor(data.doctor);
            setIsTestMode(false);
            setIsInitialized(true);
            router.push("/compte-en-attente");
        } catch (error) {
            console.error("Register error:", error);
            setError(error.message || "Erreur d'inscription");
            throw error;
        } finally{
            setLoading(false);
        }
    };
    // Logout
    const logout = ()=>{
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
    // Fetch patients - version améliorée avec localStorage
    const fetchPatients = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[fetchPatients]": async ()=>{
            if (!isInitialized || !doctor) {
                console.log("Fetch patients skipped: not initialized or no doctor");
                return;
            }
            // En mode test, utiliser les données mockées
            if (isTestMode && doctor && !doctor.isAdmin) {
                console.log("📊 Mode test: Utilisation patients mockés");
                setPatients(MOCK_PATIENTS);
                savePatientsToStorage(MOCK_PATIENTS);
                return;
            }
            // Pour un vrai docteur, vérifier d'abord le localStorage
            const storedPatients = loadPatientsFromStorage();
            if (storedPatients.length > 0) {
                console.log("📂 Utilisation patients localStorage:", storedPatients.length);
                setPatients(storedPatients);
            }
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setPatients([]);
                    return;
                }
                // Vérifier le token d'abord
                const isValidToken = await verifyToken(token);
                if (!isValidToken) {
                    logout();
                    return;
                }
                const controller = new AbortController();
                const timeoutId = setTimeout({
                    "AuthProvider.useCallback[fetchPatients].timeoutId": ()=>controller.abort()
                }["AuthProvider.useCallback[fetchPatients].timeoutId"], 15000);
                const response = await fetch(`${API_URL}/api/patients`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
                if (response.status === 404 || response.status === 204) {
                    console.log("Aucun patient trouvé sur le serveur");
                    // Garder les patients du localStorage s'il y en a
                    if (storedPatients.length === 0) {
                        setPatients([]);
                    }
                    return;
                }
                if (response.status === 401) {
                    logout();
                    return;
                }
                if (!response.ok) {
                    throw new Error(`Erreur ${response.status}: ${response.statusText}`);
                }
                const data = await response.json();
                console.log("📡 Patients reçus du serveur:", data);
                let patientsData = [];
                if (data.success && Array.isArray(data.data)) {
                    patientsData = data.data;
                } else if (Array.isArray(data)) {
                    patientsData = data;
                } else if (data.data && Array.isArray(data.data)) {
                    patientsData = data.data;
                }
                // Sauvegarder dans localStorage
                savePatientsToStorage(patientsData);
                setPatients(patientsData);
                console.log("✅ Patients chargés avec succès:", patientsData.length);
            } catch (error) {
                console.error("Erreur fetch patients:", error);
                if (error.name === 'AbortError') {
                    console.warn("Timeout serveur, utilisation des données locales");
                    // Utiliser les données locales
                    if (storedPatients.length > 0) {
                        console.log("🔄 Utilisation données locales après timeout");
                    }
                } else if (error.message.includes("401")) {
                    logout();
                } else if (!error.message.includes("404")) {
                    setError(error.message);
                }
            } finally{
                setLoading(false);
            }
        }
    }["AuthProvider.useCallback[fetchPatients]"], [
        isInitialized,
        doctor,
        isTestMode,
        logout,
        loadPatientsFromStorage,
        savePatientsToStorage
    ]);
    // Fonction de rafraîchissement des patients
    const refreshPatients = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[refreshPatients]": async ()=>{
            await fetchPatients();
        }
    }["AuthProvider.useCallback[refreshPatients]"], [
        fetchPatients
    ]);
    // Importer automatiquement les patients quand le docteur est connecté
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            if (isInitialized && doctor && doctor.isActive && !doctor.isAdmin) {
                console.log("🔄 Chargement initial des patients");
                fetchPatients();
            }
        }
    }["AuthProvider.useEffect"], [
        isInitialized,
        doctor,
        fetchPatients
    ]);
    // Import patients
    const importPatients = async (file)=>{
        if (!isInitialized || !doctor) {
            return {
                success: false,
                message: "Veuillez vous connecter d'abord"
            };
        }
        // En mode test, simuler un import
        if (isTestMode) {
            console.log("📁 Mode test: Simulation d'import de fichier", file.name);
            await new Promise((resolve)=>setTimeout(resolve, 1000));
            const newPatient = {
                _id: `imported-${Date.now()}`,
                nomComplet: `Patient Importé ${Math.floor(Math.random() * 100)}`,
                telephone: `+331${Math.floor(Math.random() * 100000000).toString().padStart(9, '0')}`,
                heureRendezVous: new Date(Date.now() + 86400000).toISOString(),
                heureEstimee: new Date(Date.now() + 86400000 + 1800000).toISOString(),
                termine: false,
                doctorId: doctor._id,
                doctorName: doctor.nomComplet,
                importFileName: file.name,
                importDate: new Date().toISOString(),
                statut: 'en_attente',
                smsEnvoye: false,
                notes: 'Importé depuis ' + file.name
            };
            const updatedPatients = [
                ...patients,
                newPatient
            ];
            setPatients(updatedPatients);
            savePatientsToStorage(updatedPatients);
            return {
                success: true,
                message: `Fichier "${file.name}" importé avec succès (mode test)`,
                data: updatedPatients
            };
        }
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("file", file);
            const response = await fetch(`${API_URL}/api/patients/import`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de l'import");
            }
            const data = await response.json();
            // Rafraîchir les patients
            await fetchPatients();
            return {
                success: true,
                message: data.message || "Import réussi",
                data: data.data
            };
        } catch (error) {
            console.error("Import error:", error);
            return {
                success: false,
                message: error.message || "Erreur lors de l'import"
            };
        } finally{
            setLoading(false);
        }
    };
    // Export patients
    const exportPatients = async (format)=>{
        if (!isInitialized || !doctor) {
            throw new Error("Veuillez vous connecter d'abord");
        }
        // En mode test, simuler un export
        if (isTestMode) {
            console.log("📤 Mode test: Simulation d'export", format);
            const content = "Nom,Téléphone,Heure RDV,Statut\n" + patients.map((p)=>`${p.nomComplet},${p.telephone},${new Date(p.heureRendezVous).toLocaleString()},${p.statut}`).join("\n");
            const blob = new Blob([
                content
            ], {
                type: format === "csv" ? "text/csv" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `patients_${Date.now()}.${format === "csv" ? "csv" : "xlsx"}`;
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
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error("Erreur lors de l'export");
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `patients_${Date.now()}.${format === "csv" ? "csv" : "xlsx"}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Erreur export:", error);
            throw error;
        }
    };
    // Send bulk delay SMS
    const sendBulkDelaySMS = async ()=>{
        if (!isInitialized || !doctor) {
            return {
                success: false,
                message: "Veuillez vous connecter d'abord"
            };
        }
        // En mode test, simuler l'envoi de SMS
        if (isTestMode) {
            console.log("📱 Mode test: Simulation d'envoi de SMS en masse");
            const waitingPatients = patients.filter((p)=>p.statut === "en_attente");
            if (waitingPatients.length === 0) {
                return {
                    success: false,
                    message: "Aucun patient en attente pour envoyer des SMS (mode test)"
                };
            }
            // Mettre à jour les patients en attente
            const updatedPatients = patients.map((patient)=>{
                if (patient.statut === "en_attente") {
                    return {
                        ...patient,
                        smsEnvoye: true,
                        dateSMS: new Date().toISOString(),
                        messageSMS: `Bonjour ${patient.nomComplet}, votre rendez-vous est prévu à ${new Date(patient.heureRendezVous).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}.`
                    };
                }
                return patient;
            });
            setPatients(updatedPatients);
            savePatientsToStorage(updatedPatients);
            return {
                success: true,
                message: `${waitingPatients.length} SMS envoyés avec succès (mode test)`,
                data: {
                    count: waitingPatients.length
                }
            };
        }
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/api/patients/sms/delay-bulk`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
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
                data: data.data
            };
        } catch (error) {
            console.error("Bulk SMS error:", error);
            return {
                success: false,
                message: error.message || "Erreur lors de l'envoi des SMS"
            };
        } finally{
            setLoading(false);
        }
    };
    // Send SMS to single patient
    const sendSMS = async (patientId, message)=>{
        if (!isInitialized || !doctor) {
            return {
                success: false,
                message: "Veuillez vous connecter d'abord"
            };
        }
        // En mode test, simuler l'envoi de SMS
        if (isTestMode) {
            console.log("📱 Mode test: Simulation d'envoi de SMS à un patient");
            const patient = patients.find((p)=>p._id === patientId);
            if (!patient) {
                return {
                    success: false,
                    message: "Patient non trouvé (mode test)"
                };
            }
            const updatedPatients = patients.map((p)=>{
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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de l'envoi du SMS");
            }
            const data = await response.json();
            await fetchPatients();
            return {
                success: true,
                message: data.message || "SMS envoyé avec succès"
            };
        } catch (error) {
            console.error("Send SMS error:", error);
            return {
                success: false,
                message: error.message || "Erreur lors de l'envoi du SMS"
            };
        }
    };
    // Update patient
    const updatePatient = async (patientId, data)=>{
        if (!isInitialized || !doctor) {
            return {
                success: false,
                message: "Veuillez vous connecter d'abord"
            };
        }
        // En mode test, mettre à jour localement
        if (isTestMode) {
            console.log("🔄 Mode test: Mise à jour patient", patientId, data);
            const updatedPatients = patients.map((patient)=>{
                if (patient._id === patientId) {
                    const updatedPatient = {
                        ...patient,
                        ...data
                    };
                    return updatedPatient;
                }
                return patient;
            });
            setPatients(updatedPatients);
            savePatientsToStorage(updatedPatients);
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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de la mise à jour");
            }
            const responseData = await response.json();
            await fetchPatients();
            return {
                success: true,
                message: responseData.message || "Patient mis à jour avec succès"
            };
        } catch (error) {
            console.error("Update patient error:", error);
            return {
                success: false,
                message: error.message || "Erreur lors de la mise à jour"
            };
        }
    };
    // Delete patient
    const deletePatient = async (patientId)=>{
        if (!isInitialized || !doctor) {
            return {
                success: false,
                message: "Veuillez vous connecter d'abord"
            };
        }
        // En mode test, supprimer localement
        if (isTestMode) {
            console.log("🗑️ Mode test: Suppression patient", patientId);
            const updatedPatients = patients.filter((patient)=>patient._id !== patientId);
            setPatients(updatedPatients);
            savePatientsToStorage(updatedPatients);
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
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erreur lors de la suppression");
            }
            const data = await response.json();
            await fetchPatients();
            return {
                success: true,
                message: data.message || "Patient supprimé avec succès"
            };
        } catch (error) {
            console.error("Delete patient error:", error);
            return {
                success: false,
                message: error.message || "Erreur lors de la suppression"
            };
        }
    };
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
        refreshPatients
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/context/AuthContext.tsx",
        lineNumber: 1089,
        columnNumber: 10
    }, this);
}
_s(AuthProvider, "4sI6r9g9CSv1XrMwJPZrFcLloXU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=context_AuthContext_tsx_66cdd820._.js.map