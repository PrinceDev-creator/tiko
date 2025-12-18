require('dotenv')
const paymentServices = require('../services/payment')
const kkiapay = require('../services/payment')


exports.payment = (req, res, next) => {
    const amount = req.body.amount
    const email = req.body.email
    const phone = req.body.phone
    console.log('beforeKkiay')
    const kkiapay = paymentServices.execTransaction(amount, email, phone)
    console.log('kkiaPay: ', kkiapay)

    kkiapay.verify("transactionId")
        .then((response) => {
            console.log('response: ', response)
            return res.status(200).json({
                sucess: true,
                data: response
            })

        })
        .catch((error) => {
            console.error('Error: ', error)
            return res.status(500).json({ error: error })

        })

    // kkiapay.refund("transactionId")
    //     .then((response) => {
    //         console.log('response: ', response)
    //         res.status(200).json({
    //             sucess: true,
    //             data: response
    //         })

    //     })
    //     .catch((error) => {
    //         console.error('Error: ', error)
    //         res.status(500).json({ error: error })

    //     })
}

exports.paymentTest = async (req, res) => {
    try {
        console.log('req.body: ', req.body)
        const { transactionId } = req.body;
        console.log('transactionId: ', { transactionId })
        if (!transactionId) {
            console.log('error')
            return res.status(400).json({
                success: false,
                error: 'Transaction ID requis'
            });
        }
        return res.status(200).json({
            success: true
        })

        // console.log('transactionIdString: ', transactionId)
        // console.log(`type de transactionIdString: ${typeof transactionId}`)
        // console.log('kkiapay: ', kkiapay)
        // kkiapay.verify(transactionId.trim()).
        //     then((response) => {
        //         console.log('response-kkia: ', response)
        //         return res.status(200).json({ data: response })
        //     }).
        //     catch((error) => {
        //         console.error('error: ', error)
        //         return res.status(500).json({ error: error })
        //     })

        //const result = await kkiapayClient.verify(transactionId);

    } catch (error) {
        console.error('Erreur backend:', error);
        res.status(500).json({
            error: 'Échec de vérification',
            details: error.message
        });
    }
}