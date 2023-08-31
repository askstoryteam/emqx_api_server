const db        = require('../config/database');
const get_data = (req) => 
{
    if(!(req?.body?.topic)) return [null,null,null];

    const topic         = req.body.topic;
    const clientid      = req.body.clientid;
    const payload       = req.body.payload;
    return [topic,clientid,payload];

}
const add_gateway = async (req,res) => 
{
    let body = req.body;
    //console.log("body",body);

    const topic                 = body.topic;
    const clientid              = body.clientid;
    const response_topic        = body.pub_props['Response-Topic'];
    const correlation_data      = body.pub_props['Correlation-Data'];

    console.log("response_topic",response_topic);


    res.json("{code:200}");
}

const add_temp = async (req,res) => 
{
    console.log("add_temp");
    res.json("{code:300}");
}

const add_ir = async (req,res) => 
{
    console.log("add_ir");
    res.json("{code:300}");
}

const add_ac_ir = async (req,res) => 
{
    console.log("add_ac_ir");
    res.json("{code:300}");
}


exports.add_gateway = add_gateway; 
exports.add_temp    = add_temp; 
exports.add_ir      = add_ir; 
exports.add_ac_ir   = add_ac_ir; 
