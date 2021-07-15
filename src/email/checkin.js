const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendCheckInEmail = (email, host, visitor, purpose) => {
    sgMail.send({
        to: email,
        from: 'chiragrv44@gmail.com',
        subject: 'Visitor Checked In',
        html: `hello, ${host}<br/> You have visitor ${visitor} checke-in for ${purpose}.`
    }).then(() => {
        console.log('success')
    }).catch((error) => {
        console.log('error', error);
    });
}

// const sendCancelationEmail = (email, name) => {
//     sgMail.send({
//         to: email,
//         from: 'andrew@mead.io',
//         subject: 'Sorry to see you go!',
//         text: `Goodbye, ${name}. I hope to see you back sometime soon.`
//     })
// }

module.exports = sendCheckInEmail

