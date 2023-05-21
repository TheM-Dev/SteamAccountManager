const fs = require('fs');
const path = require('path');
const log = require('../../../utils/log');

module.exports = async () => {
    const commandsPath = path.join(__dirname, '../../../accounts');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    let accounts = [];

    for(const file of commandFiles){
    	const filePath = path.join(commandsPath, file);
    	const account = require(filePath);
    	if(!account.login) return log(3, 'account_loader', 'No login provided in account file!');
        if(!account.password) return log(3, 'account_loader', `No password provided in account file!`, account.login);
        if(!account.sharedSecret) return log(2, 'account_loader', `No shared secret provided in account file!`, account.login);
        if(!account.identitySecret) return log(2, 'account_loader', `No identity secret provided in account file!`, account.login);
        if(account.login && account.password && account.sharedSecret && account.identitySecret){
            accounts.push(account);
            log(1, 'account_loader', `Successfully checked and loaded account file!`, account.login);
        } else log(2, 'account_loader', `Account not loaded in properly!`, account.login);
    }

    return accounts;
}