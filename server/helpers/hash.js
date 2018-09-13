const crypto = require('crypto');

module.exports = function(email,password){
    const hash = crypto.createHmac('sha256', email)
                       .update(password)
                       .digest('hex');
    return hash
}