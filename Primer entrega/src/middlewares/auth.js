const admin = false

module.exports.isAuthorized = function (req, res, next) {
    if(admin) return next();
    res.status(401).send({ error : -1, descripción: `ruta ${req.path} método ${req.method} no autorizada` })
}
