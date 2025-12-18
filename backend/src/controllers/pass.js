const Pass = require('../models/pass')
const PassInfos = require('../models/passInfos')
const passServices = require('../services/pass')
const Event = require('../models/event')
const paymentStatus = require('../services/paymentFunction')

exports.createPass = (req, res, next) => {
    let testValidResponse = paymentStatus.paymentStatus(req, res)
    testValidResponse = true
    if (testValidResponse) {
        const passInfosId = req.params.passInfosId.trim()
        let scanTotalNumber = 0
        //     function successHandler(response) {
        //     console.log(response);
        //   }
        PassInfos.findById(passInfosId)
            .then(passInfos => {
                if (!passInfos) {
                    return res.status(404).json({ message: 'Vérifier les informations' })
                } else {
                    scanTotalNumber = passServices.calculScanTotalNumber(passInfos)
                    console.log('scanTotalNumber: ', scanTotalNumber)
                    const pass = new Pass({
                        typePassEvent: passInfosId,
                        attendeeId: req.auth.userId,
                        editTime: Date.now(),
                        scanTotalNumber: scanTotalNumber,
                    })
                    console.log('pass: ', pass)
                    pass.save()
                        .then(() => res.status(200).json({ message: 'Pass créé avec succès' }))
                        .catch(error => res.status(500).json({ message: 'Une erreur est survenue: ' + error }))
                }
            })
            .catch(error => res.status(400).json({ error: error }))
    } else (
        res.status(401).json({
            message: "Opération impossible"
        })
    )
}

exports.getAllPasses = (req, res, next) => {
    const eventId = req.params.eventId.trim()
    const passes = passServices.recoverPasses(eventId)
    return res.status(200).json({
        success: true,
        data: passes
    })

}

exports.verifyPass = async (req, res, next) => {
    console.log('pass-vrf');

    try {
        // 1. Trouver le pass
        const pass = await Pass.findById(req.params.passId.trim());

        if (!pass) {
            return res.status(404).json({
                success: false,
                message: 'Pass non trouvé'
            });
        }

        console.log('pass: ', pass);

        const event = await passServices.recoverEvent(pass)
        console.log('Event: ', event)
        console.log('eventId: ', event._id)

        // 3. Vérifier si l'utilisateur est le créateur
        console.log('Vérification créateur...');
        const isCreator = await passServices.isEventCreator(
            req.auth.userId,
            event._id.toString()
        );

        console.log('isEventCreator result:', isCreator);

        if (!isCreator) {
            return res.status(403).json({
                success: false,
                message: 'Vous n\'êtes pas autorisé à vérifier ce pass'
            });
        }

        // 4. Vérifier la validité du pass
        const isValid = passServices.validityPass(pass);
        console.log('Pass valide?', isValid);

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: 'Pass invalide ou expiré'
            });
        }

        // 5. Mettre à jour la validité
        passServices.updateValidity(pass);

        // 6. Réponse réussie
        res.status(200).json({
            success: true,
            message: 'Vérification effectuée avec succès',
            data: {
                passId: pass._id,
                eventId: event._id,
                eventTitle: event.title,
                isValid: true,
                checkedAt: new Date()
            }
        });

    } catch (error) {
        console.error('Erreur dans verifyPass:', error);

        // Gestion d'erreurs spécifiques
        if (error.message.includes('Authentification requise')) {
            return res.status(401).json({
                success: false,
                message: 'Authentification requise'
            });
        }

        if (error.message.includes('Ressource manquante')) {
            return res.status(404).json({
                success: false,
                message: 'Ressource non trouvée'
            });
        }

        // Erreur générique
        res.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};