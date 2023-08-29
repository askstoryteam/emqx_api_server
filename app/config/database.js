/*----------------------------------------------------------------------------*
 *
 *  Copyright (C) 2018 askstoryteam@askstory.com.  All Rights Reserved.
 *
 *
 *  MODULE: database.js
 *
 *  FUNCTIONS: database(mysql) function
 *
 *  COMMENTS:
 *
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


/*----------------------------------------------------------------------------*
 *                                  INCLUDE                                   *
 *----------------------------------------------------------------------------*/

var mysql     = require('mysql2/promise');
var constants = require('./constants');


/*----------------------------------------------------------------------------*
 *                              GLOBAL VARIABLES                              *
 *----------------------------------------------------------------------------*/

var pool  = mysql.createPool({
                host 				: process.env.DB_HOST,
                port 				: process.env.DB_PORT,
                user 				: process.env.DB_USER,
                password 			: process.env.DB_PASS,
                database 			: process.env.DB_DATABASE,
                debug				: constants.DB_DEBUG,	// FOR DEBUG
                connectionLimit 	: constants.DB_CONNECTION_LIMIT,
                waitForConnections 	: constants.DB_WAIT_FOR_CONNECTIONS
            });


/*----------------------------------------------------------------------------*
 *
 *  Function: function query(sql, values, cb)
 *
 *  Purpose: SQL query
 *
 *  Accepts: SQL string
 *           parameters
 *           callback function
 *
 *  Returns: void
 *
 *  Comments:
 *
 *----------------------------------------------------------------------------*/
const query = async (sql, values) => 
{
    try 
    {
        const rows = await pool.query(sql, values);
        return rows[0];
    } 
    catch (error) 
    {
        console.log(error);
        throw error;
    }
}
//old version
function query2(sql, values, cb) {


	if (typeof values === 'function') {
		cb     = values;	
		values = undefined;
	}

	if (typeof cb !== 'function') {
		cb = function() {};	
	}

	pool.getConnection(function(err, conn) {

		if (err) {
			cb(err);
			return;
		}

		var q = conn.query(sql, values, function(err, res, fields) {

			if (err) {

				conn.release();

				console.error(err);

				cb(err);

				return;			// Exception Error: Connection already released
			}

			cb(err, res, fields);

			conn.release();
		});

		// FOR DEBUG
		// console.log(q.sql);
	});
}


/*----------------------------------------------------------------------------*
 *                                   EXPORT                                   *
 *----------------------------------------------------------------------------*/

	exports.query		= query;
	exports.query2		= query2;
