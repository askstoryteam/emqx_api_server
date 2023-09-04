require("dotenv").config();
const express       = require('express')
const bodyParser    = require('body-parser')
const app           = express()
const routes        = require('./routes/v1')
const Auth          = require('./middleware/apikey_check.js')
//const util          = require('./util/util')
//const cors          = require('cors');



// Log
let console_list = ["log", "warn", "error"];
console_list.forEach(function(fn) {

	var org = console[fn].bind(console);

	console[fn] = function() {

		var now = new Date();
		var arg = Array.prototype.slice.call(arguments);
		var tag = '[' + now.toTimeString().slice(0, 8) + '.' + now.getMilliseconds() + ']';

		arg.unshift(tag);

        org.apply(console, arg);
    };
});


app.use(bodyParser.json());
//app.use(app.bodyParser());
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
