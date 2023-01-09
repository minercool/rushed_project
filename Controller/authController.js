const express = require('express')
const router = express.Router()
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const User = require('../Models/user')

module.exports = router


router.post('/signin', async (req, res) => {
    try {
        if (validator.isEmail(req.body.email)) {
            await User.find({ email: req.body.email })
                .exec()
                .then(
                    async result => {
                        if (result != 0) {
                            if (await bcrypt.compare(req.body.password, result[0].password)) {
                                if (result[0].status == "desactive") {
                                    res.status(401).json("Votre compte a été désactivé !")
                                }
                                else {
                                    id = result[0]._id.valueOf()
                                    role = result[0].role.valueOf()
                                    email = result[0].email.valueOf()
                                    req.session.user = result[0]
                                    const token = jwt.sign({ id }, process.env.TOKEN_KEY);
                                    res.status(201).json({ token, result })
                                }
                            } else {
                                res.status(401).json("Mauvais email ou mot de passe")
                            }
                        } else {
                            res.status(404).json('Mauvais email ou mot de passe')
                        }
                    }
                )
        } else {
            res.status(401).json("Format d'email invalide")
        }

    } catch (error) {
        res.status(500).json(error.message)
    }

})