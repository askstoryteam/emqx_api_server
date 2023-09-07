/*----------------------------------------------------------------------------*
 *
 *  Copyright (C) 2018 askstoryteam@askstory.com.  All Rights Reserved.
 *
 *
 *  MODULE: constants.js
 *
 *  FUNCTIONS: constants
 *
 *  COMMENTS:
 *
 *  AUTHOR: askstoryteam
 *
 *  DATE: 2018-05-25
 *
 *  LAST EDITED:
 *
 *  TO-DO:
 *
 *----------------------------------------------------------------------------*/

function define(name, value) {
	Object.defineProperty(exports, name, {
		value:      value,
		enumerable: true
	});
}


/*----------------------------------------------------------------------------*
 *                              SERVICE VERSION                               *
 *----------------------------------------------------------------------------*/

define('SERVICE_VERSION',			'1.0.0');


/*----------------------------------------------------------------------------*
 *                                SERVER INFO                                 *
 *----------------------------------------------------------------------------*/

define('SERVICE_PORT',              3003); 


/*----------------------------------------------------------------------------*
 *                                  DEFINE                                    *
 *----------------------------------------------------------------------------*/

define('TOKEN_TYPE_AUTH_CODE',		1); 
define('TOKEN_TYPE_ACCESS',			2); 
define('TOKEN_TYPE_REFRESH',		3); 

// define('DB_PORT',							3306);
//
// define('DB_USER',							'askenergy');
// define('DB_PASS',							'ecomyhand20151201');
// define('DB_DATABASE',						'myOndoDB2');

define('DB_CONNECTION_LIMIT',				1);
define('DB_WAIT_FOR_CONNECTIONS',			true);
define('DB_DEBUG',							false);
define('API_SERVER_IP',					    '192.168.0.14');
//define('API_SERVER_IP',					    '172.30.1.24');

