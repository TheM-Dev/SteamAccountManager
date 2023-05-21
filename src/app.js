//Controls the overall of the app
//Turns on every enabled component
const expressServer = require('./components/dashboard/server');
const server = new expressServer();
const log = require('./utils/log');

server.app.post('/statuses/process/update', server.loggingMiddleware, server.jsonParser, (req, res) => {
    log(1, 'web_dashboard', `Process is using ${req.body.memory}MB of memory and ${req.body.cpu}% of CPU!`)
    res.sendStatus(200);
});