const pm2 = require('pm2');
const axios = require('axios');

pm2.connect(async function(err) {
    if (err) {
        console.error(err)
        process.exit(2)
    }

    await pm2.start({
        script: 'src/app.js',
        name: 'steamaccountmanager'
    }, function(err, apps) {
        if (err) {
            console.error(err)
            return pm2.disconnect()
        }
    });
    setInterval(() => {
        pm2.describe('steamaccountmanager', function(err, proc) {
            if(err) return err;
            axios.post(`http://localhost:5555/statuses/process/update`, {
                cpu: (proc[0].monit?.cpu).toFixed(1),
                memory: (proc[0].monit?.memory / 1000000).toFixed(1)
            })
            .catch(function (error) { console.log(error); });
        });
    }, 1000);
});