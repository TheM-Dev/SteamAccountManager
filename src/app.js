//Controls the overall of the app
//Turns on every enabled component
const expressServer = require('./components/dashboard/server');
const server = new expressServer();
const log = require('./utils/log');

server.app.post('/statuses/process/update', server.loggingMiddleware, (req, res) => {
    log(1, 'web_dashboard', req)
    res.sendStatus(200)
});