const pm2 = require('pm2')

pm2.connect(async function(err) {
    if (err) {
        console.error(err)
        process.exit(2)
    }

    await pm2.start({
        script: 'src/app.js',
        name: 'api'
    }, function(err, apps) {
        if (err) {
            console.error(err)
            return pm2.disconnect()
        }
    });
    setInterval(() => {
        pm2.describe('api', function(err, proc) {
            if(err) return err;
            console.log(`Process is using ${(proc[0].monit?.memory / 1000000).toFixed(1)}MB of memory and ${(proc[0].monit?.cpu).toFixed(1)}% of CPU!`)
        })
    }, 1000)
});