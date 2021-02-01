const fetch = require('node-fetch');
const fs = require('fs');

const IP_FILE_PATH = './ip.txt';

const getIP = async () => {
    if (!fs.existsSync(IP_FILE_PATH)) {
        await setIP();
    }
    return new Promise((resolve, reject) =>
        fs.readFile(IP_FILE_PATH, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        }),
    );
};

const getPublicIP = async () => {
    return fetch('https://ifconfig.me/ip').then((res) => res.text());
};

const setIP = async () => {
    const publicIP = await getPublicIP();

    return new Promise((resolve, reject) =>
        fs.writeFile(IP_FILE_PATH, publicIP.trim(), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        }),
    );
};

module.exports = {
    getIP,
    setIP,
};
