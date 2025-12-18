// src/App.jsx
// import React, { useState } from 'react';
// import KkiaPayTest from './components/KkiaPayTest';
// import './App.css';

// function App() {
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
//             <div className="max-w-6xl mx-auto">
//                 <header className="text-center mb-10">
//                     <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
//                         Test d'Intégration KkiaPay
//                     </h1>
//                     <p className="text-gray-600">
//                         Interface de test pour les transactions financières avec KkiaPay
//                     </p>
//                 </header>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                     <KkiaPayTest />
//                     <TransactionLogs />
//                 </div>
//             </div>
//         </div>
//     );
// }

// function TransactionLogs() {
//     const [logs] = useState([
//         { id: 1, message: "Initialisation du widget KkiaPay", time: "10:30", type: "info" },
//         { id: 2, message: "Transaction #txn_123 en attente", time: "10:32", type: "warning" },
//         { id: 3, message: "Paiement réussi de 4000 FCFA", time: "10:33", type: "success" },
//     ]);

//     return (
//         <div className="bg-white rounded-2xl shadow-xl p-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                 Journal des Transactions
//             </h2>
//             <div className="space-y-3">
//                 {logs.map(log => (
//                     <div key={log.id} className={`p-3 rounded-lg border-l-4 ${log.type === 'success' ? 'border-green-500 bg-green-50' : log.type === 'warning' ? 'border-yellow-500 bg-yellow-50' : 'border-blue-500 bg-blue-50'}`}>
//                         <div className="flex justify-between items-center">
//                             <span className="font-medium text-gray-700">{log.message}</span>
//                             <span className="text-sm text-gray-500">{log.time}</span>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default App;

// import React from 'react';
// import QRCodeGenerator from './components/QRCodeGenerator.jsx';
// import './App.css';

// function App() {
//     return (
//         <div className="App">
//             <QRCodeGenerator />
//         </div>
//     );
// }

// export default App;


import QRCode from "qrcode.react";

function App() {
    return (
        // <div style={styles.container}>
        //     <QRCode value="http://localhost:3000/api/pass/verify-pass/693d7140a9cc10c7630c02c5" size={250} />
        //     <p style={styles.text}>Scannez-moi</p>
        // </div>
        <div>Bonjour</div>
    );
}

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    text: {
        marginTop: '20px',
        color: '#666',
        fontSize: '14px'
    }
};

export default App;