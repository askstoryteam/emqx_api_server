const express       = require('express')
const bodyParser    = require('body-parser')
const app           = express()
const routes        = require('./routes/v1')
const Auth          = require('./middleware/apikey_check.js')
//const util          = require('./util/util')
//const cors          = require('cors');
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({ extended: false }));

// var corsOptions = {
//      origin: 'http://localhost:3003',
//      credentials: true,
//      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
 // 모든 도메인의 통신을 허용합니다.
//app.use(cors(corsOptions))
app.use(Auth.ApiKeyAuth);
app.use('/v1', routes);

module.exports = app;
