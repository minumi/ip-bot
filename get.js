const fs = require('fs');

const getIP = async () => {
    return await new Promise((resolve, reject) =>
        fs.readFile('./ip.txt', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.trim());
            }
        }),
    );
};

module.exports = {
    getIP,
};
