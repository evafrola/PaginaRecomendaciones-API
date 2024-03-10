const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const {PASSWORD, USERNAME} = require("../config.js");

exports.login = (req, res) => {
    const { username, password } = req.body;
    if (username === USERNAME && password === PASSWORD) {
        const token = jwt.sign({ username }, SECRET_KEY);
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: "Usuario y/o contraseña incorrecta" });
    }
};
