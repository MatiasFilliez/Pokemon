const { User } = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const singIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ where: { email: email } })
        if (!findUser) { res.status(404).json({ msg: "user not found" }) }
        else if (!bcrypt.compareSync(password, findUser.password)) {
            res.status(404).json({ msg: "password incorrect" })
        } else {
            let token = jwt.sign({ user: findUser }, "token", { expiresIn: "7d" })
            res.json({ user: findUser, token: token, })
        }
    } catch (err) { console.log(err) }
}

const singUp = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        let encryptPassword = bcrypt.hashSync(password, 10)
        const userCreated = await User.create({ name: name, email: email, password: encryptPassword })
        let token = jwt.sign({ user: userCreated }, "token", { expiresIn: "7d" })
        res.json({ user: userCreated, token: token, })
    } catch (err) {
        console.log(err)
    }

}


module.exports = {
    singIn,
    singUp
}
