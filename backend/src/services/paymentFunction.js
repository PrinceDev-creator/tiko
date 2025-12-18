exports.paymentStatus = function (req, res) {
    let response = true
    try {
        const { transactionId } = req.body
        console.log('transactionId: ', { transactionId })
        if (!transactionId) {
            response = false
            console.log('error')
            return response
        }
        return response

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
    }
}