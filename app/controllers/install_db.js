const requestHandler  = require('../services/install_db')

var handler = 
{
    'add_gateway'               :	requestHandler.add_gateway		// gateway
,   'add_temp'				    :	requestHandler.add_temp			// 온습도계
,   'add_ir'				    :	requestHandler.add_ir			// ir 장비
,   'add_ac_ir'				    :	requestHandler.add_ac_ir		// aircon ir code
}



const process_install_db =  (req,res) => 
{
    console.log('gotcha2');
    
    try 
    {
        if(!req?.body)
        {
            console.log("body is null");
            return res.status(500).send("body is null");
        }
        let body = req.body;
        //console.log("body",body);

        const topic                 = body.topic;
        const clientid              = body.clientid;
        const response_topic        = body.pub_props['Response-Topic'];
        const correlation_data      = body.pub_props['Correlation-Data'];
        const payload               = body.payload;
        const cmd                   = payload.cmd;
        if(!cmd)
        {
            console.log("cmd is null");
            return res.status(500).send("cmd is null");
        }
        //console.log("cmd",cmd);

		return handler[cmd](req, res);
    }
    catch (err) 
    {
        console.log("exception occured",err);
        res.status(500).send(err)
    }
}
module.exports.process_install_db= process_install_db;
