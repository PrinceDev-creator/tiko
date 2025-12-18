const Pass = require('../models/pass')
const Event = require('../models/event')
const PassInfos = require('../models/passInfos')


exports.isEventCreator = async (authId, eventId) => {
    try {
        if (!authId || !eventId) {
            throw new Error('authId et eventId sont requis')
        }

        const event = await Event.findById(eventId);

        if (!event) {
            throw new Error('Ressource mnquante')
        }

        return event.creatorId.toString() == authId.toString()

    } catch (error) {
        throw new Error('Authenfication requise' + error)
    }
}

/**
 * Vérifie la validité du pass
 * @param {Pass} pass - Instance de Pass
 * @returns {boolean} La validité du pass
 */
exports.validityPass = (pass) => pass.isActive

/**
 * Met à jour le nombre de scan et le statut du pass
 * @param {Pass} pass - Instance de pass
 * @returns {void}
 */

exports.updateValidity = (pass) => {
    updateScanNumber(pass)
    updateActiveStatus(pass)
}


// try {
//     if (pass.validUntil > pass.validFrom) {
//         console.log('validityIf')
//         validityFromUpdated(pass)
//         await pass.save()
//     } else {
//         console.log('validityFalse')
//         pass.isActive = false
//         await pass.save()
//     }

// }
// catch (error) {
//     console.error('Update error: ', error)
//     throw new Error('Vérifier les informations')
// }


/**
 * Génère la date de mise à jour
 * @param {Date} validFrom - La date à mettre à jour
 * @returns {Date} La date mis à jour
 */

function validityFromGenerated(validFrom) {
    let originalDate = validFrom
    const newDate = new Date(originalDate.getTime() + 24 * 60 * 60 * 1000)
    return newDate
}

/**
 * Met à jour la date de début de validité du pass
 * @param {Pass} pass - Instance de Pass
 * @returns {void}
 */

// function validityFromUpdated(pass) {
//     pass.validFrom = validityFromGenerated(pass.validFrom)
// }

/**
 * Met à jour le nombre de scan du pass
 * @param {Pass} pass - Instance de pass
 * @returns {void}
 */
async function updateScanNumber(pass) {
    try {
        if (pass.isActive) {
            pass.scanNumberAtTheMoment += 1;
            await pass.save()
        } else {
            await pass.save()
        }
    } catch (error) {
        throw new Error('L\'opération de mise à jour a rencontré un problème : ' + error)
    }
}
/**
 * Met à jour le nombre de scan du pass
 * @param {Pass} pass - Instance de pass
 * @returns {void}
 */
async function updateActiveStatus(pass) {
    try {
        await Pass.findByIdAndUpdate(
            pass._id,
            {
                isActive: pass.scanNumberAtTheMoment >= pass.scanTotalNumber ? false : pass.isActive
            }
        );
    } catch (error) {
        throw new Error('L\'opération de mise à jour a rencontré un problème: ' + error)
    }
}

/**
 * Calcule le nombre total de scans autorisés
 * @param {PassInfos} passInfos - Instance de pass
 * @returns {Number} Nombre de scans (basé sur la durée en jours)
 */
exports.calculScanTotalNumber = function (passInfos) {
    if (!passInfos || !passInfos.validUntil || !passInfos.validFrom) {
        return 0; // Valeur par défaut sécurisée
    }

    // S'assurer que ce sont des objets Date valides
    const from = new Date(passInfos.validFrom);
    const until = new Date(passInfos.validUntil);

    if (isNaN(from.getTime()) || isNaN(until.getTime())) {
        return 0;
    }

    // Calculer la différence en jours
    const diffTime = Math.abs(until - from);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    console.log('until - from : ', until, from)

    // Retourner le nombre de jours (au moins 1)
    return diffDays + 1;
}

exports.recoverEvent = async (pass) => {
    try {
        const passInfos = await PassInfos.findById(pass.typePassEvent);
        console.log('passInfos: ', passInfos)
        if (!passInfos) {
            throw new Error('Les infos du pass sont introuvables')
        } else {
            const event = await Event.findById(passInfos.eventId)
            console.log('Event: ', event)
            if (!event) {
                throw new Error('Evenement introuvable')
            } else {
                return event
            }
        }
    } catch (error) {
        throw new Error('Une erreur est survenue ' + error)
    }
}

exports.recoverPasses = async (eventId) => {
    try {
        const passes = await PassInfos.find({ eventId: eventId });
        console.log('passes: ', passes)
        if (!passes) {
            throw new Error('Les passInfos sont introuvables')
        } else {
            return passes
        }
    } catch (error) {
        throw new Error('Une erreur est survenue ' + error)
    }
}

