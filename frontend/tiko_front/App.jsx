// App.jsx - Composant principal
import React, { useState } from 'react';
import PaymentForm from './components/PaymentForm';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Test de Paiement KkiaPay</h1>
        <p>Simuler et vérifier des transactions</p>
      </header>
      <main>
        <PaymentForm />
      </main>
      <footer>
        <p className="info-note">
          <strong>Note :</strong> Utilisez les numéros de test KkiaPay (ex: 97000000)
          et assurez-vous que le backend fonctionne sur http://localhost:3000
        </p>
      </footer>
    </div>
  );
}

export default App;