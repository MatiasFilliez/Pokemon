const { User } = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const singIn = (req, res) => {
    const { email, password } = req.body;
    User.findOne({
        where: {
            email: email
        }
    }).then(findUser => {
        if (!findUser) {
            res.status(404).json({ msg: "user not found" })
        }
        else if (!bcrypt.compareSync(password, findUser.password)) {
            res.status(404).json({ msg: "password incorrect" })
        } else {
            let token = jwt.sign({ user: findUser }, "token", { expiresIn: "7d" })
            res.json({ user: findUser, token: token, })
        }
    })
}

const singUp = (req, res) => {
    const { email, name, password } = req.body;
    let encryptPassword = bcrypt.hashSync(password, 10)
    User.create({ name: name, email: email, password: encryptPassword })
        .then(user => {
            let token = jwt.sign({ user: user }, "token", { expiresIn: "7d" })
            res.json({ user: user, token: token, })
        })
        .catch(err => res.status(404).json(err))
}

module.exports = {
    singIn,
    singUp
}
