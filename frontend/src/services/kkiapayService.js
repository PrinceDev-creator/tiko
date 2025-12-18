// services/kkiapayService.js - Service API
const API_BASE_URL = 'http://localhost:3000/api';

// Simuler un paiement (à remplacer par un appel à votre vrai endpoint de création)
export const simulatePayment = async (paymentData) => {
    // Dans un vrai scénario, vous appelleriez votre backend
    // const response = await fetch(`${API_BASE_URL}/payment/create`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(paymentData)
    // });

    // Pour la simulation, générons un ID fictif
    return new Promise((resolve) => {

        setTimeout(() => {
            resolve({
                //id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                amount: paymentData.amount,
                email: paymentData.email,
                phone: paymentData.phone,
                status: 'PENDING',
                timestamp: new Date().toISOString()
            });
        }, 1000);
    });
};

// Vérifier une transaction (appel réel à votre backend)
export const verifyTransaction = async (transactionId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/pass`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transactionId })
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la vérification:', error);
        throw error;
    }
};