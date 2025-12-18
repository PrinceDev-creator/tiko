// components/PaymentForm.jsx - Formulaire et logique
import React, { useState } from 'react';
import './PaymentForm.css';
import { verifyTransaction, simulatePayment } from '../services/kkiapayService';

const PaymentForm = () => {
    const [formData, setFormData] = useState({
        amount: 4000,
        email: 'client@example.com',
        phone: '97000000',
    });

    const [transactionId, setTransactionId] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'amount' ? parseInt(value) || 0 : value
        }));
    };

    const handleSimulatePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setVerificationResult(null);

        try {
            // Simuler un paiement (générer un ID de transaction fictif)
            const simulatedTransaction = await simulatePayment(formData);
            setTransactionId(simulatedTransaction.id);

            // Afficher les détails de la simulation
            setVerificationResult({
                type: 'simulation',
                data: simulatedTransaction,
                message: `Paiement simulé avec succès! Transaction ID: ${simulatedTransaction.id}`
            });
        } catch (err) {
            setError(`Erreur lors de la simulation: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyTransaction = async () => {
        if (!transactionId.trim()) {
            setError('Veuillez d\'abord simuler un paiement ou entrer un Transaction ID');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await verifyTransaction(transactionId);
            setVerificationResult({
                type: 'verification',
                data: result,
                message: `Transaction vérifiée avec succès! Statut: ${result.status}`
            });
        } catch (err) {
            setError(`Erreur lors de la vérification: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-container">
            <div className="payment-card">
                <h2>Simuler un Paiement</h2>

                <form onSubmit={handleSimulatePayment}>
                    <div className="form-group">
                        <label htmlFor="amount">Montant (FCFA)</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            min="100"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Téléphone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="97000000 (test MTN Benin)"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Simulation en cours...' : 'Simuler le Paiement'}
                    </button>
                </form>
            </div>

            <div className="verification-card">
                <h2>Vérifier une Transaction</h2>

                <div className="form-group">
                    <label htmlFor="transactionId">Transaction ID</label>
                    <input
                        type="text"
                        id="transactionId"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="Entrez l'ID de transaction"
                    />
                </div>

                <button
                    onClick={handleVerifyTransaction}
                    className="btn btn-secondary"
                    disabled={loading || !transactionId}
                >
                    {loading ? 'Vérification...' : 'Vérifier la Transaction'}
                </button>

                {error && (
                    <div className="alert alert-error">
                        <strong>Erreur :</strong> {error}
                    </div>
                )}

                {verificationResult && (
                    <div className="result-container">
                        <div className={`alert alert-${verificationResult.type === 'simulation' ? 'info' : 'success'}`}>
                            <strong>{verificationResult.type === 'simulation' ? 'Simulation' : 'Vérification'}</strong>
                            <p>{verificationResult.message}</p>
                        </div>

                        <div className="result-details">
                            <h4>Détails :</h4>
                            <pre>{JSON.stringify(verificationResult.data, null, 2)}</pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentForm;