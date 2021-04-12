const path = require('path');
const express = require('express');
const cookieSession = require('cookie-session');
const config = require('./src/config');

const PORT = process.env.PORT || 3000;


if (config.credentials.client_id == null || config.credentials.client_secret == null) {
    console.error('Missing FORGE_CLIENT_ID or FORGE_CLIENT_SECRET env. variables.');
    return;
}

let app = express();

app.use('/bim/', express.static(path.join(__dirname, './src/public')));
app.use(cookieSession({
    name: 'forge_session',
    keys: ['forge_secure_key'],
    maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days, same as refresh token
}));
app.use(express.json({ limit: '50mb' }));
app.use('/bim/api/forge', require('./src/routes/oauth'));
app.use('/bim/api/forge', require('./src/routes/datamanagement'));
app.use('/bim/api/forge', require('./src/routes/user'));
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode).json(err);
});

app.listen(PORT, () => { 
    console.log(`
    Server listening at http://localhost/bim.
    Please set up the haproxy correctly!
    
    Please, access the server at http://localhost:3000/bim without the proxy config.
    For this work properly, set the Callback URL for http://localhost:3000/bim/api/forge/callback/oauth
    both in .env file and Autodesk Forge App at https://forge.autodesk.com/myapps/
`); });
