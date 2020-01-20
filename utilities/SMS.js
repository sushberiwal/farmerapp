const Nexmo = require('nexmo');
const config=require("../configs/config")

const nexmo = new Nexmo({
    apiKey: config.API_KEY,
    apiSecret: config.API_SECRET,
});

module.exports = (to,message) => {
    var text=message
    const from = 919711545082;
    nexmo.message.sendSms(from, to, text)
}

