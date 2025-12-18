require('dotenv')
const { kkiapay } = require("@kkiapay-org/nodejs-sdk");
const kkiapayObj = kkiapay({
    privatekey: process.env.KKIAPAY_PRIVATE_API_KEY,
    publickey: process.env.KKIAPAY_PUBLIC_API_KEY,
    secretkey: process.env.KKIAPAY_SECRET,
})

// exports.execTransaction = async (amount, email, phone) => {
//     const { kkiapay } = require("@kkiapay-org/nodejs-sdk");
//     const kkiapayObj = kkiapay({
//         privatekey: process.env.KKIAPAY_PRIVATE_API_KEY,
//         publickey: process.env.KKIAPAY_PUBLIC_API_KEY,
//         secretkey: process.env.KKIAPAY_SECRET,
//         // amount: amount || 4000,
//         // email: email || "randomgail@gmail.com",
//         // phone: phone || "97000000",
//         // sandbox: true,
//     })

//     console.log('kkobj: ', kkiapayObj)

//     return kkiapayObj
// }

module.exports = kkiapayObj