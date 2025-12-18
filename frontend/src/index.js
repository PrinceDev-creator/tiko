// // src/index.js
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { KKiaPayProvider } from '@kkiapay-org/react-sdk';
// import App from './App';
// import './index.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//     <React.StrictMode>
//         <KKiaPayProvider>
//             <App />
//         </KKiaPayProvider>
//     </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);