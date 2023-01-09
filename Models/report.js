const mongoose = require('mongoose')

const  reportSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    user_id : String, 
    Q1: String,
    Q2: String,
    Q3: String,
    Q4: String,
    Q5: String,
    Q6: String,
    Q7: String,
    Q8: String,
    Q9: String,
    Q10: String,
    Q11: String,
    Q12: String,
    Q13: String,
    Q14: String,
    Q15: String,
    Q16: String,
    Q17: String,
    Q18: String,
    Q19: String,
    Q20: String,
    Q21: String,
    Q22: String,
    time : String,
    date : String
})

module.exports = mongoose.model('Report',reportSchema)