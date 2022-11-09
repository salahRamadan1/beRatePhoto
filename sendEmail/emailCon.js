const nodemailer = require("nodemailer");
async function sendEmail (option){
    let transporter = nodemailer.createTransport({
     service:'gmail' , 
        auth: {
          user: 'salahlever@gmail.com', // generated ethereal user
          pass: 'rfqgwqmubxasnctr', // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <salahlever@gmail.com>', // sender address
        to: option.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: option.message, // html body
      });
 
    }
    module.exports = sendEmail
    
    



    
