const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendOtpMail = (email, otp) => {
    sgMail.send({
        to: email,
        from: 'chiragrv44@gmail.com',
        subject: 'Forget Password',
        html: `Your OTP is ${otp}.`
    }).then(() => {
        console.log('success')
    }).catch((error) => {
        console.log('error', error);
    });
}

module.exports = sendOtpMail;

