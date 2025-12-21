exports.test = (req, res) => {
    console.log("successfully")
    res.status(200).json({
        "message": "Successfully"
    })
}