const path = require('path');
const express = require('express');
const config = require('./src/config');

const PORT = process.env.PORT || 3000;


if (config.credentials.client_id == null || config.credentials.client_secret == null) {
    console.error('Missing FORGE_CLIENT_ID or FORGE_CLIENT_SECRET env. variables.');
    return;
}

let relativePath = express();
let app = express.Router();

relativePath.use(config.baseUrl, app)

app.use(express.static(path.join(__dirname, './src/public')));
app.use(express.json({ limit: '50mb' }));
app.use('/api/forge/oauth', require('./src/routes/oauth'));
app.use('/api/forge/oss', require('./src/routes/oss'));
app.use('/api/forge/modelderivative', require('./src/routes/modelderivative'));
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode).json(err);
});

relativePath.listen(PORT, () => { 
    console.log(`
    Server listening at http://localhost/forge.
    Please set up the haproxy correctly!
    
    Please, access the server at http://localhost:3000/forge without the proxy config.
    For this work properly, set the Callback URL for http://localhost:3000/forge/api/forge/callback/oauth
    both in .env file and Autodesk Forge App at https://forge.autodesk.com/myapps/
`); });
