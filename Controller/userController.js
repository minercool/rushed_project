const router = require('express').Router()
const User = require('../Models/user')
const Report = require('../Models/report')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator');
const mailer = require('./email/mailer')

module.exports = router

router.post('/register', async (req, res) => {
    try {
        if (validator.isEmail(req.body.email)) {
            User.find({ email: req.body.email })
                .exec()
                .then(async result => {
                    if (result == 0) {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            name: req.body.name,
                            birth_day: req.body.birth_day,
                            email: req.body.email,
                            password: await bcrypt.hash(req.body.password, 10),
                            phone: req.body.phone,
                        });
                        user
                            .save()
                            .then(result => {
                                if(req.session.answers != null){
                                    const report = new Report({
                                        _id: mongoose.Types.ObjectId(),
                                        user_id: result._id,
                                        Q1 : req.session.answers.Q1,
                                        Q2 : req.session.answers.Q2,
                                        Q3 : req.session.answers.Q3,
                                        Q4 : req.session.answers.Q4,
                                        Q5 : req.session.answers.Q5,
                                        Q6 : req.session.answers.Q6,
                                        Q7 : req.session.answers.Q7,
                                        Q8 : req.session.answers.Q8,
                                        Q9 : req.session.answers.Q9,
                                        Q10 : req.session.answers.Q10,
                                        Q11 : req.session.answers.Q11,
                                        Q12 : req.session.answers.Q12,
                                        Q13 : req.session.answers.Q13,
                                        Q14 : req.session.answers.Q14,
                                        Q15 : req.session.answers.Q15,
                                        Q16 : req.session.answers.Q16,
                                        Q17 : req.session.answers.Q17,
                                        Q18 : req.session.answers.Q18,
                                        Q19 : req.session.answers.Q19,
                                        Q20 : req.session.answers.Q20,
                                        Q21 : req.session.answers.Q21,
                                        Q22 : req.session.answers.Q22,
                                        time : req.session.answers.time,
                                        date : req.session.answers.date,
                                    });
                                    req.session.user = result
                                    delete req.session.answers
                                    report
                                        .save()
                                        .then(result => {
                                            res.status(200).json({ message: result })
                                           // mailer.noticeEmail(req.session.user.name,req.session.user.email,req.session.answers.date,req.session.answers.time)
                                            
                                        })
                                        .catch(error => {
                                            res.status(500).json({ error: error.message })
                                        })
                                    }
                                    else{

                                        res.status(200).json(result)
                                    }
                                
                                
                            })
                            .catch((error) => {
                                res.status(500).json(error.message)
                            })
                    } else {
                        res.status(400).json({ error: "l'e-mail existe déjà" })
                    }
                })

        } else {
            res.status(401).json({ error: 'email invalide' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



router.patch('/setUserStatus/:id', async (req, res) => {
    try {
        User.findByIdAndUpdate(req.params.id, { status: req.body.status }).exec()
            .then(result => {
                if (result) {
                    res.status(200).json({ message: "status updated successfully" })
                } else {
                    res.status(404).json({ message: "id not found" })
                }
            })
            .catch(error => {
                res.status(500).json({ error: error.message })
            })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/getAllUsers', async (req, res) => {
    try {
        User.find().exec()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                res.status(500).json({ message: message.error })
            })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/getUserById/:id', async (req, res) => {
    try {
        User.findById(req.params.id).exec()
            .then(result => {
                if (result) {
                    res.status(200).json(result)
                } else {
                    res.status(404).json({ message: 'id not found' })
                }
            })
            .catch(error => {
                res.status(500).json({ message: message.error })
            })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/getUserByName',async(req,res)=>{
    try {
        User.find({name : req.body.name}).exec()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(error=>{
            res.status(500).json({error : error.message})
        })
    } catch (error) {
        res.status(500).json({error : error.message})
    }
})

