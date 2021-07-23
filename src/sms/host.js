const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSms = (phone, host, visitor, purpose) => {
    client.messages
        .create({
            body: `\n\nHello, ${host} \n\t You have visitor ${visitor} checked-in for ${purpose}.`,
            from: '+14153603761',
            to: '+' + phone
        })
        .then(message => console.log(message.sid));
}

module.exports = sendSms;
