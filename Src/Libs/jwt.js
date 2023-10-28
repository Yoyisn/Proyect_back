const { TOKEN_SECRET } = require('../config.js');
const jwt = require('jsonwebtoken');

function createAccessToken(payload) {
    return new Promise((resolve) => {
        jwt.sign(
            payload,
            TOKEN_SECRET, 
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if (err) reject()
                resolve(token)
            }
            );
    });
};

module.exports = createAccessToken;