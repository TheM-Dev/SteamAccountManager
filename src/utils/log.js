const dayjs = require('dayjs');
const colors = require('colors');

//1: Info log (green)
//2: Error log (red)
//3: Warning log (magenta)

module.exports = (logLevel, module, log, account) => {
    let currentDate = dayjs(Date.now()).format('DD/MM/YYYY HH:mm:ss');
    if(!account){
        switch(logLevel){
            case 1: console.log(colors.yellow(currentDate), colors.blue.bold(module.toUpperCase()), colors.green(log)); break;
            case 2: console.log(colors.yellow(currentDate), colors.blue.bold(module.toUpperCase()), colors.red(log)); break;
            case 3: console.log(colors.yellow(currentDate), colors.blue.bold(module.toUpperCase()), colors.magenta(log)); break;
            default: console.log(colors.yellow(currentDate), colors.blue.bold(module.toUpperCase()), colors.yellow(log)); break;
        }
    } else {
        switch(logLevel){
            case 1: console.log(colors.yellow(currentDate), colors.blue.bold(module.toUpperCase()), colors.yellow(account.toLowerCase()), colors.green(log)); break;
            case 2: console.log(colors.yellow(currentDate), colors.blue.bold(module.toUpperCase()), colors.yellow(account.toLowerCase()), colors.red(log)); break;
            case 3: console.log(colors.yellow(currentDate), colors.blue.bold(module.toUpperCase()), colors.yellow(account.toLowerCase()), colors.magenta(log)); break;
            default: console.log(colors.yellow(currentDate), colors.blue.bold(module.toUpperCase()), colors.yellow(account.toLowerCase()), colors.yellow(log)); break;
        }
    }
    
}