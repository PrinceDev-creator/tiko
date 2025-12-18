require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs') // Ajouter fs
const QRCode = require('qrcode') // Ajouter qrcode
const { v4: uuidv4 } = require('uuid') // Ajouter uuid
const userRoutes = require('./routes/user')
const eventRoutes = require('./routes/event')
const passInfosRoutes = require('./routes/passInfos')
const passRoutes = require('./routes/pass')
const paymentRoutes = require('./routes/paymentTest')
const path = require('path')

const app = express()
const hostname = process.env.HOSTNAME
const port = process.env.DB_PORT
const db = process.env.DB_NAME

// Configuration du moteur de template EJS
// app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, 'views')) // Spécifier le dossier des vues

// mongoose.connect(`mongodb://${hostname}:${port}/${db}`)
//     .then(() => console.log('Connexion à MongoDB réussie'))
//     .catch((error) => console.log('Connexion à MongoDB échouée : ', error))

mongoose.connect('mongodb://atlas-sql-69088410f2f3995cea074d8a-2vnqaq.a.query.mongodb.net/tiko_db?ssl=true&authSource=admin')
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch((error) => console.log('Connexion à MongoDB échouée : ', error))

app.use(express.json())
// app.use(express.urlencoded({ extended: true })) // Ajouter pour les formulaires
// app.use(express.static('public')) // Servir les fichiers statiques

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', userRoutes)
app.use('/api/event', eventRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/pass-infos', passInfosRoutes)
app.use('/api/pass', passRoutes)
app.use('/api/payment/verify', paymentRoutes)




// Créer le dossier views s'il n'existe pas
// const viewsDir = path.join(__dirname, 'views');
// if (!fs.existsSync(viewsDir)) {
//     fs.mkdirSync(viewsDir, { recursive: true });
// }

// // Créer le dossier public s'il n'existe pas
// const publicDir = path.join(__dirname, 'public');
// if (!fs.existsSync(publicDir)) {
//     fs.mkdirSync(publicDir, { recursive: true });
// }

// // Vos routes existantes (décommenter si nécessaires)
// // app.get('/', (req, res, next) => {
// //     res.status(200).json(console.log('Serveur démarré'))
// //     next()
// // })

// // app.use('/api/auth', userRoutes)
// // app.use('/api/event', eventRoutes)
// // app.use('/images', express.static(path.join(__dirname, 'images')))

// // Base de données simple (fichier JSON)
// const DATA_FILE = path.join(__dirname, 'data', 'objects.json');

// // Initialiser le fichier de données
// function initializeDataFile() {
//     if (!fs.existsSync(path.dirname(DATA_FILE))) {
//         fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
//     }
//     if (!fs.existsSync(DATA_FILE)) {
//         fs.writeFileSync(DATA_FILE, JSON.stringify([]));
//     }
// }

// // Lire les données
// function readData() {
//     try {
//         const data = fs.readFileSync(DATA_FILE, 'utf8');
//         return JSON.parse(data);
//     } catch (error) {
//         return [];
//     }
// }

// // Écrire les données
// function writeData(data) {
//     fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
// }

// // Routes QR Code

// // Page d'accueil
// app.get('/', (req, res) => {
//     res.render('index');
// });

// // Générer un QR code - Route GET
// app.get('/generate', (req, res) => {
//     // Passer des valeurs par défaut pour éviter l'erreur
//     res.render('generate', {
//         success: false,
//         qrCode: null,
//         verificationUrl: null,
//         object: null,
//         error: null
//     });
// });

// // Générer un QR code - Route POST
// app.post('/generate', async (req, res) => {
//     const { objectName, description, manufacturer, productionDate, expiryDate } = req.body;

//     // Vérifier que tous les champs sont remplis
//     if (!objectName || !description || !manufacturer || !productionDate || !expiryDate) {
//         return res.render('generate', {
//             success: false,
//             error: 'Tous les champs sont obligatoires',
//             qrCode: null,
//             verificationUrl: null,
//             object: null
//         });
//     }

//     // Générer un ID unique pour l'objet
//     const objectId = uuidv4();
//     const verificationUrl = `${req.protocol}://${req.get('host')}/verify/${objectId}`;

//     try {
//         // Générer le QR code
//         const qrCodeDataURL = await QRCode.toDataURL(verificationUrl);

//         // Stocker les informations de l'objet
//         const objects = readData();
//         const newObject = {
//             id: objectId,
//             name: objectName,
//             description: description,
//             manufacturer: manufacturer,
//             productionDate: productionDate,
//             expiryDate: expiryDate,
//             verificationUrl: verificationUrl,
//             createdAt: new Date().toISOString(),
//             isValid: true
//         };

//         objects.push(newObject);
//         writeData(objects);

//         // RENDER avec TOUTES les variables
//         res.render('generate', {
//             success: true,
//             qrCode: qrCodeDataURL,
//             verificationUrl: verificationUrl,
//             object: newObject,  // Assurez-vous que object est bien défini
//             error: null
//         });

//     } catch (error) {
//         console.error('Erreur génération QR code:', error);
//         res.render('generate', {
//             success: false,
//             error: 'Erreur lors de la génération du QR code: ' + error.message,
//             qrCode: null,
//             verificationUrl: null,
//             object: null
//         });
//     }
// });

// // Vérifier un objet
// app.get('/verify/:objectId', (req, res) => {
//     const { objectId } = req.params;
//     const objects = readData();
//     const object = objects.find(obj => obj.id === objectId);

//     if (!object) {
//         return res.render('verify', {
//             valid: false,
//             message: 'Objet non trouvé',
//             object: null
//         });
//     }

//     // Vérifier la validité (exemple: vérification de date d'expiration)
//     const currentDate = new Date();
//     const expiryDate = new Date(object.expiryDate);
//     const isValid = object.isValid && expiryDate > currentDate;

//     res.render('verify', {
//         valid: isValid,
//         message: isValid ? 'Cet objet est valide' : 'Cet objet a expiré ou est invalide',
//         object: object,
//         currentDate: currentDate.toLocaleDateString('fr-FR')
//     });
// });

// // API pour obtenir les informations d'un objet (pour applications mobiles)
// app.get('/api/object/:objectId', (req, res) => {
//     const { objectId } = req.params;
//     const objects = readData();
//     const object = objects.find(obj => obj.id === objectId);

//     if (!object) {
//         return res.status(404).json({ error: 'Objet non trouvé' });
//     }

//     const currentDate = new Date();
//     const expiryDate = new Date(object.expiryDate);
//     const isValid = object.isValid && expiryDate > currentDate;

//     res.json({
//         ...object,
//         currentValidity: isValid,
//         daysUntilExpiry: Math.ceil((expiryDate - currentDate) / (1000 * 60 * 60 * 24))
//     });
// });

// // Marquer un objet comme invalide
// app.post('/api/object/:objectId/invalidate', (req, res) => {
//     const { objectId } = req.params;
//     const objects = readData();
//     const objectIndex = objects.findIndex(obj => obj.id === objectId);

//     if (objectIndex === -1) {
//         return res.status(404).json({ error: 'Objet non trouvé' });
//     }

//     objects[objectIndex].isValid = false;
//     objects[objectIndex].invalidatedAt = new Date().toISOString();
//     writeData(objects);

//     res.json({ success: true, message: 'Objet marqué comme invalide' });
// });

// // Route pour signaler un problème
// app.post('/api/report', (req, res) => {
//     const { objectId, description, timestamp } = req.body;

//     console.log('Rapport reçu:', {
//         objectId,
//         description,
//         timestamp,
//         ip: req.ip
//     });

//     res.json({
//         success: true,
//         message: 'Rapport enregistré',
//         reportId: uuidv4()
//     });
// });

module.exports = app