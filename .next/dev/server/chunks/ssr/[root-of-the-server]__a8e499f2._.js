module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/context/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const API_URL = 'https://backend-docnotif.vercel.app';
function AuthProvider({ children }) {
    const [doctor, setDoctor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [patients, setPatients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [hasCheckedAuth, setHasCheckedAuth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false) // Nouvel état
    ;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // Fonction pour vérifier le statut et rediriger
    const checkUserStatusAndRedirect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!doctor) {
            router.push('/login');
            return;
        }
        if (!doctor.isActive) {
            router.push('/compte-en-attente');
            return;
        }
        if (doctor.isAdmin) {
            router.push('/dashboardAdmin');
        } else {
            router.push('/dashboard');
        }
    }, [
        doctor,
        router
    ]);
    // Vérifier l'authentification au chargement - VERSION CORRIGÉE
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkAuth = async ()=>{
            // Éviter de vérifier plusieurs fois
            if (hasCheckedAuth) return;
            try {
                const token = localStorage.getItem('token');
                const doctorData = localStorage.getItem('doctor');
                if (token && doctorData) {
                    const parsedDoctor = JSON.parse(doctorData);
                    setDoctor(parsedDoctor);
                    // Marquer comme vérifié
                    setHasCheckedAuth(true);
                } else {
                    setHasCheckedAuth(true);
                }
            } catch (error) {
                console.error('Erreur vérification auth:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('doctor');
                setHasCheckedAuth(true);
            }
        };
        checkAuth();
    }, [
        hasCheckedAuth
    ]); // Seulement dépend de hasCheckedAuth
    // Login - version corrigée
    const login = async (email, password)=>{
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_URL}/api/doctors/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Erreur de connexion');
            }
            let doctorData;
            let token;
            if (data.data && data.data.token) {
                token = data.data.token;
                doctorData = data.data.doctor || data.data;
            } else if (data.token) {
                token = data.token;
                doctorData = data.doctor || data;
            } else {
                throw new Error('Structure de réponse invalide');
            }
            localStorage.setItem('token', token);
            localStorage.setItem('doctor', JSON.stringify(doctorData));
            setDoctor(doctorData);
            // Rediriger selon le statut
            if (!doctorData.isActive) {
                router.push('/compte-en-attente');
            } else if (doctorData.isAdmin) {
                router.push('/dashboardAdmin');
            } else {
                router.push('/dashboard');
            }
        } catch (error) {
            setError(error.message);
            throw error;
        } finally{
            setLoading(false);
        }
    };
    // Register
    const register = async (nomComplet, email, password, additionalData)=>{
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_URL}/api/doctors/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nomComplet,
                    email,
                    password,
                    ...additionalData
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Erreur d\'inscription');
            }
            localStorage.setItem('token', data.token);
            localStorage.setItem('doctor', JSON.stringify(data.doctor));
            setDoctor(data.doctor);
            router.push('/compte-en-attente');
        } catch (error) {
            setError(error.message);
            throw error;
        } finally{
            setLoading(false);
        }
    };
    // Logout
    const logout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('doctor');
        setDoctor(null);
        setPatients([]);
        setHasCheckedAuth(false); // Réinitialiser
        router.push('/login');
    };
    // Fetch patients - version avec useCallback pour éviter les boucles
    const fetchPatients = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const doctorData = localStorage.getItem('doctor');
            if (!token || !doctorData) {
                setPatients([]);
                return;
            }
            const response = await fetch(`${API_URL}/api/patients`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 404 || response.status === 204) {
                setPatients([]);
                return;
            }
            if (!response.ok) {
                try {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erreur récupération patients');
                } catch  {
                    throw new Error(`Erreur ${response.status}: ${response.statusText}`);
                }
            }
            const data = await response.json();
            if (data.success && Array.isArray(data.data)) {
                setPatients(data.data);
            } else if (Array.isArray(data)) {
                setPatients(data);
            } else {
                setPatients([]);
            }
        } catch (error) {
            console.error('Erreur fetch patients:', error);
            if (!error.message.includes('404')) {
                setError(error.message);
            }
            setPatients([]);
        } finally{
            setLoading(false);
        }
    }, []) // Pas de dépendances
    ;
    // Import patients
    const importPatients = async (file)=>{
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch(`${API_URL}/api/patients/import`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Erreur import');
            }
            // Rafraîchir les patients
            await fetchPatients();
            return {
                success: true,
                message: data.message,
                data: data.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        } finally{
            setLoading(false);
        }
    };
    // Export patients
    const exportPatients = async (format)=>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/patients/export/${format}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Erreur export');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `patients_${Date.now()}.${format === 'csv' ? 'csv' : 'xlsx'}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Erreur export:', error);
            throw error;
        }
    };
    // Send bulk delay SMS
    const sendBulkDelaySMS = async ()=>{
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/patients/sms/delay-bulk`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Erreur envoi SMS');
            }
            await fetchPatients();
            return {
                success: true,
                message: data.message,
                data: data.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        } finally{
            setLoading(false);
        }
    };
    // Send SMS to single patient
    const sendSMS = async (patientId, message)=>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/patients/${patientId}/sms`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Erreur envoi SMS');
            }
            await fetchPatients();
            return {
                success: true,
                message: data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    };
    // Update patient
    const updatePatient = async (patientId, data)=>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/patients/${patientId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Erreur mise à jour');
            }
            await fetchPatients();
            return {
                success: true,
                message: responseData.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    };
    // Delete patient
    const deletePatient = async (patientId)=>{
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/patients/${patientId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Erreur suppression');
            }
            await fetchPatients();
            return {
                success: true,
                message: data.message
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    };
    const value = {
        doctor,
        patients,
        loading: loading || !hasCheckedAuth,
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
        checkUserStatusAndRedirect
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/context/AuthContext.tsx",
        lineNumber: 497,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a8e499f2._.js.map