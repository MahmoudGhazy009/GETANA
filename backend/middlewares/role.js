function roleDetect(req, res, next) {
    if (req.user.role !== 'admin') {
        res.status(403).send("access is denied")

    }
    next()
}


module.exports = roleDetect