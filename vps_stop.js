const pm2 = require('pm2');
const axios = require('axios');

pm2.connect(async function(err) {
    if (err) {
        console.error(err)
        process.exit(2)
    }

    await pm2.stop('steamaccountmanager');
});