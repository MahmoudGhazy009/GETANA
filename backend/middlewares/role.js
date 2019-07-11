function roleDetect(role) {
    return function (req, res, next) {
        if (req.user.role === "admin") next()
        else if (role !== req.user.role) res.status(403).send({
            "msg": "access is denied"
        });
        else next();
    }
}
module.exports = roleDetect




/*
function roleDetect(req, res, next) {
    if (req.user.role !== 'admin') {
        res.status(403).send("access is denied")

    }
    next()
}

*/