const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
module.exports = {
    noticeEmail : function(name,email,date,time,id){
        var readHTMLFile = function (path, callback) {
            fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
                if (err) {
                    callback(err);
                    throw err;
                }
                else {
                    callback(null, html);
                }
            });
        };
        var transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.MAILER_EMAIL,
                pass: process.env.MAILER_PASSWORD
            }
        });
        readHTMLFile('./Controller/email/notice.html', function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                name : name,
                date : date,
                time : time,
                id : id
            };
            var htmlToSend = template(replacements);
            var mailOptions = {
                from: process.env.MAILER_EMAIL,
                to: email,
                subject: 'Notification',    
                html: htmlToSend
            };
            transporter.sendMail(mailOptions, function (error, response) {
                if (error){
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        });
    },
    respondEmail : function(email){
        var readHTMLFile = function (path, callback) {
            fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
                if (err) {
                    callback(err);
                    throw err;
                }
                else {
                    callback(null, html);
                }
            });
        };
        var transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.MAILER_EMAIL,
                pass: process.env.MAILER_PASSWORD
            }
        });
        readHTMLFile('./Controller/email/responde.html', function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {
               
            };
            var htmlToSend = template(replacements);
            var mailOptions = {
                from: process.env.MAILER_EMAIL,
                to: email,
                subject: 'Notification',    
                html: htmlToSend
            };
            transporter.sendMail(mailOptions, function (error, response) {
                if (error){
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        });
    },
}
