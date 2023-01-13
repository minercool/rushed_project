const router = require('express').Router()
const Report = require('../Models/report')

const mongoose = require('mongoose')
const moment = require('moment')
const mailer = require('./email/mailer')
const User = require("../Models/user");

module.exports = router

router.post('/sessionReport', async (req, res) => {
    try {
        req.session.answers = {
            "Q1": req.body.Q1,
            "Q2": req.body.Q2,
            "Q3": req.body.Q3,
            "Q4": req.body.Q4,
            "Q5": req.body.Q5,
            "Q6": req.body.Q6,
            "Q7": req.body.Q7,
            "Q8": req.body.Q8,
            "Q9": req.body.Q9,
            "Q10": req.body.Q10,
            "Q11": req.body.Q11,
            "Q12": req.body.Q12,
            "Q13": req.body.Q13,
            "Q14": req.body.Q14,
            "Q15": req.body.Q15,
            "Q16": req.body.Q16,
            "Q17": req.body.Q17,
            "Q18": req.body.Q18,
            "Q19": req.body.Q19,
            "Q20": req.body.Q20,
            "Q21": req.body.Q21,
            "Q22": req.body.Q22,
            "time": moment().format('HH:mm'),
            "date": moment().format('DD/MM/YYYY'),

        }
        res.status(200).json(req.session.answers)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


router.post('/addReport/:id', async (req, res) => {
    try {
            const report = new Report({
                _id: mongoose.Types.ObjectId(),
                user_id: req.params.id,
                Q1: req.body.Q1,
                Q2: req.body.Q2,
                Q3: req.body.Q3,
                Q4: req.body.Q4,
                Q5: req.body.Q5,
                Q6: req.body.Q6,
                Q7: req.body.Q7,
                Q8: req.body.Q8,
                Q9: req.body.Q9,
                Q10: req.body.Q10,
                Q11: req.body.Q11,
                Q12: req.body.Q12,
                Q13: req.body.Q13,
                Q14: req.body.Q14,
                Q15: req.body.Q15,
                Q16: req.body.Q16,
                Q17: req.body.Q17,
                Q18: req.body.Q18,
                Q19: req.body.Q19,
                Q20: req.body.Q20,
                Q21: req.body.Q21,
                Q22: req.body.Q22,
                time: moment().format('HH:mm'),
                date: moment().format('DD/MM/YYYY'),
            })
                report
                .save()
                .then(result => {
                    try {
                        User.findById(req.params.id).exec()
                            .then(ress => {
                                if (ress) {
                                    mailer.noticeEmail(ress.name, ress.email, result.date, result.time, result._id)

                                } else {
                                    res.status(404).json({ message: 'id not found' })
                                }
                            })
                            .catch(error => {
                                res.status(500).json({ message: error.message })
                            })
                    } catch (error) {
                        res.status(500).json({ error: error.message })
                    }
                    res.status(200).json(result)
                })
                .catch(error => {
                    res.status(500).json({ error: error.message })
                })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get("/getAllReports", async (req, res) => {
    try {
        Report.find().exec()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                res.status(500).json({ error: error.message })
            })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//////////////////// FOR ADMIN /////////////////////
router.get("/getReportByUserId/:id", async (req, res) => {
    try {
        Report.find({ user_id: req.params.id }).exec()
            .then(result => {
                if (result != 0) {
                    res.status(200).json(result)
                } else {
                    res.status(404).json({ message: 'user id not found' })
                }
            })
            .catch(error => {
                res.status(500).json({ error: error.message })
            })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//////////////////// FOR USER //////////////////////
router.get("/getMyReports", async (req, res) => {
    try {
        if (req.session.user != null) {
            Report.find({ user_id: req.session.user._id }).exec()
                .then(result => {
                    if (result != 0) { }
                    res.status(200).json(result)
                })
                .catch(error => {
                    res.status(500).json({ error: error.message })
                })
        } else {
            res.status(401).json({ message: 'please login to continue' })
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get("/getReportById/:id", async (req, res) => {
    try {
        Report.find({ _id: req.params.id }).exec()
            .then(result => {
                if (result != 0) {
                    res.status(200).json(result)
                } else {
                    res.status(404).json({ message: 'report id not found' })
                }
            })
            .catch(error => {
                res.status(500).json({ error: error.message })
            })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/getReportsNumberPerUser/:id', async (req, res) => {
    try {
        Report.find({ user_id: req.params.id }).exec()
            .then(result => {
                res.status(200).json(result.length)
            })
            .catch(error => {
                res.status(500).json({ error: error.message })
            })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


router.post('/respondToReport/:id', async (req, res) => {
    try {
        Report.findByIdAndUpdate(req.params.id, { status: req.body.status }).exec()
            .then(result => {
                if (result != null) {
                    if (req.body.status == 'valid') {
                        User.findById(result.user_id).exec()
                            .then(result => {
                                mailer.respondEmail(result.email)
                                res.status(200).json({ message: 'updated successfully' })
                            })
                            .catch(error => {
                                res.status(500).json({ error: error.message })
                            })
                    }else{
                        res.status(200).json({message : 'status updated'})
                    }
                } else {
                    res.status(404).json({ message: 'id not found' })
                }
            })
            .catch(error => {
                res.status(500).json({ error: error.message })
            })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/getReportsByStatus', async (req, res) => {
    try {
        Report.find({ status: req.body.status }).exec()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                res.status(500).json({ error: error.message })
            })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
