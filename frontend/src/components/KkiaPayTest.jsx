// src/components/KkiaPayTest.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useKKiaPay } from 'kkiapay-react';
import { verifyTransaction } from '../services/kkiapayService';
import './KkiaPayTest.css';

const KkiaPayTest = () => {
    const { openKkiapayWidget, addKkiapayListener, removeKkiapayListener } = useKKiaPay();

    // États du formulaire
    const [formData, setFormData] = useState({
        amount: 4000,
        email: 'client@example.com',
        phone: '97000000',
    });

    // États de l'application
    const [transactionStatus, setTransactionStatus] = useState(null);
    const [transactionId, setTransactionId] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState([]);

    // Ajouter un log
    const addLog = useCallback((message, type = 'info') => {
        const newLog = {
            id: Date.now(),
            message,
            time: new Date().toLocaleTimeString(),
            type,
        };
        setLogs(prev => [newLog, ...prev.slice(0, 9)]); // Garder les 10 derniers logs
    }, []);

    // Gestionnaire de succès
    const successHandler = useCallback(async (response) => {
        addLog('Paiement réçu par KkiaPay', 'success');
        setTransactionStatus('success');
        setTransactionId(response.transactionId || response.id);

        // Log complet pour débogage
        console.log('Réponse de succès KkiaPay:', response);
        addLog(`Transaction ID: ${response.transactionId || response.id}`, 'success');

        // Vérification côté serveur
        try {
            addLog('Vérification côté serveur en cours...', 'info');
            const result = await verifyTransaction(response.transactionId || response.id);
            setVerificationResult(result);
            addLog('Vérification serveur réussie', 'success');
        } catch (error) {
            addLog(`Erreur vérification: ${error.message}`, 'error');
        }
    }, [addLog]);

    // Gestionnaire d'échec
    const failureHandler = useCallback((error) => {
        addLog(`Échec du paiement: ${error.message || 'Erreur inconnue'}`, 'error');
        setTransactionStatus('failed');
        console.error('Erreur KkiaPay:', error);
    }, [addLog]);

    // Configuration des listeners
    useEffect(() => {
        addKkiapayListener('success', successHandler);
        addKkiapayListener('failed', failureHandler);

        addLog('Listeners KkiaPay initialisés', 'info');

        return () => {
            removeKkiapayListener('success', successHandler);
            removeKkiapayListener('failed', failureHandler);
        };
    }, [addKkiapayListener, removeKkiapayListener, successHandler, failureHandler, addLog]);

    // Gestion des changements de formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'amount' ? parseInt(value) || 0 : value
        }));
    };

    // Ouvrir le widget KkiaPay
    const handleOpenWidget = () => {
        if (!formData.amount || formData.amount < 100) {
            addLog('Montant minimum: 100 FCFA', 'warning');
            return;
        }

        if (!formData.email || !formData.phone) {
            addLog('Email et téléphone requis', 'warning');
            return;
        }

        addLog('Ouverture du widget KkiaPay...', 'info');
        setLoading(true);
        setTransactionStatus(null);
        setVerificationResult(null);

        console.log('clé: ', import.meta.env.KKIAPAY_PUBLIC_API_KEY)

        // Ouvrir le widget avec les paramètres
        openKkiapayWidget({
            amount: formData.amount,
            api_key: '46191db0d39e11f0a05625aa9456e759' || 'votre_cle_publique',
            sandbox: true,
            email: formData.email,
            phone: formData.phone,
            callback: `${window.location.origin}/callback`,
            data: JSON.stringify({
                userId: '123',
                reference: `ref_${Date.now()}`
            }),
            theme: 'light', // ou 'dark'
            position: 'center' // 'top', 'center', 'bottom'
        });

        setTimeout(() => setLoading(false), 2000);
    };

    // Vérifier manuellement une transaction
    const handleManualVerify = async () => {
        if (!transactionId) {
            addLog('Veuillez entrer un Transaction ID', 'warning');
            return;
        }

        setLoading(true);
        try {
            addLog(`Vérification de la transaction: ${transactionId}`, 'info');
            const result = await verifyTransaction(transactionId);
            setVerificationResult(result);
            addLog('Vérification réussie', 'success');
        } catch (error) {
            addLog(`Erreur de vérification: ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Interface de Test KkiaPay
            </h2>

            {/* Formulaire de configuration */}
            <div className="space-y-4 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Montant (FCFA)
                    </label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="100"
                        placeholder="Montant minimum: 100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email du client
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="client@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro de téléphone
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="97000000 (MTN Bénin test)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Numéro de test: 97000000 (MTN Bénin)
                    </p>
                </div>

                {/* Bouton de paiement */}
                <button
                    onClick={handleOpenWidget}
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                        }`}
                >
                    {loading ? 'Chargement...' : `Payer ${formData.amount.toLocaleString()} FCFA`}
                </button>
            </div>

            {/* Vérification manuelle */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-3">Vérification manuelle</h3>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="Transaction ID"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <button
                        onClick={handleManualVerify}
                        disabled={loading || !transactionId}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                    >
                        Vérifier
                    </button>
                </div>
            </div>

            {/* Statut de la transaction */}
            {transactionStatus && (
                <div className={`p-4 rounded-lg mb-4 ${transactionStatus === 'success'
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                    }`}>
                    <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${transactionStatus === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="font-medium">
                            {transactionStatus === 'success' ? '✅ Paiement réussi' : '❌ Paiement échoué'}
                        </span>
                    </div>
                    {transactionId && (
                        <p className="text-sm text-gray-600 mt-2">
                            Transaction ID: <code className="bg-gray-100 px-2 py-1 rounded">{transactionId}</code>
                        </p>
                    )}
                </div>
            )}

            {/* Résultat de vérification */}
            {verificationResult && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">Résultat de vérification serveur</h4>
                    <pre className="text-sm bg-white p-3 rounded overflow-x-auto">
                        {JSON.stringify(verificationResult, null, 2)}
                    </pre>
                </div>
            )}

            {/* Logs en temps réel */}
            <div className="mt-8">
                <h3 className="font-medium text-gray-700 mb-3">Logs en temps réel</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {logs.map(log => (
                        <div key={log.id} className={`text-sm p-2 rounded ${log.type === 'success'
                            ? 'bg-green-100 text-green-800'
                            : log.type === 'error'
                                ? 'bg-red-100 text-red-800'
                                : log.type === 'warning'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                            }`}>
                            <span className="text-xs opacity-75">[{log.time}]</span> {log.message}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KkiaPayTest;