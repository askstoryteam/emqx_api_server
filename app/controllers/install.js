const requestHandler  = require('../services/install')

var handler = 
{
    'add_gateway'               :	requestHandler.add_gateway		// gateway
,   'add_temp'				    :	requestHandler.add_temp			// 온습도계
,   'add_ir'				    :	requestHandler.add_ir			// ir 장비
,   'add_ac_ir'				    :	requestHandler.add_ac_ir		// aircon ir code
}



const process_install =  (req,res) => 
{
    console.log('gotcha2');
    try 
    {
        console.log("req.body",req.body);
        let cmd = req.body.cmd;
        if(!cmd)
        {
            console.log("cmd is null");
            res.json("{code:33333}");
            return; 
        }

		return handler[cmd](req, res);
    }
    catch (err) 
    {
        res.status(500).send(err)
    }
}
module.exports.process_install = process_install;
