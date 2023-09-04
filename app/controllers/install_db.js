const { insert_gateway ,insert_th,insert_ir }   = require('../services/install_db')
const { get_topic_value,publish_result }        = require('../util/util')

const add_gateway = async(req,res) => 
{
    if(!req.body || !req.body.topic || !req.body.payload || !req.body.payload.email) 
    {
        console.log("ERROR some missing data");
        return res.status(400).send('missing body,topic,payload,email');
    }

    //data 준비 
    const body                  = req.body;
    const topic                 = body.topic;
    const payload               = body.payload;
    const prod_no               = payload.prod_no;
    const email                 = payload.email;
    // const response_topic        = body.pub_props['Response-Topic'] || 's1/missing/me';
    // const correlation_data      = body.pub_props['Correlation-Data'] || '12345678';
    const response_topic        = payload.response_topic; 
    const correlation_data      = payload.correlation_data; 


    const shop_id               = get_topic_value(topic,1); 


    let msg = "gateway 등록이 정상적으로 처리 되었습니다";
    let result = 
    {
        response_topic
    ,   correlation_data
    };
    //inset table iot_gateway
    try
    {

        result.msg =  { status:200, code : 'OK',msg };
        let insert_result = await insert_gateway(shop_id,prod_no,email);
        if(!insert_result.insertId)
        {
            result.msg =  { status: 500, code: 'unknown error' ,msg: 'insert 에 실패하였습니다.' };
        }
        console.log("result",result);
        //publish with reponse_topic
        await publish_result(result)
    }
    catch(err)
    {
        msg = err.code + " 오류가 발생하였습니다."; 
        if(err.code == 'ER_DUP_ENTRY')
        {
            msg = "이미 등록된 gateway  장비 입니다."
        }
        result.msg =  { status: 500, code: err.code ,msg };
        //publish with reponse_topic
        await publish_result(result)
    }

    return res.status(200).send('success');
}

const add_th = async (req,res) => 
{
    console.log("in add th");

    //data 준비 
    const body                  = req.body;
    const topic                 = body.topic;
    const payload               = body.payload;

    if(!body || !topic || !payload || !payload.prod_no || !payload.gw_prod_no) 
        return res.status(400).send('missing body,topic,payload,prod_no,gw_prod_no');

    const prod_no               = payload.prod_no;
    const gw_prod_no            = payload.gw_prod_no;

    const response_topic        = payload.response_topic; 
    const correlation_data      = payload.correlation_data; 

    // const response_topic        = body.pub_props['Response-Topic'];
    // const correlation_data      = body.pub_props['Correlation-Data'];
    //


    const shop_id               = parseInt(get_topic_value(topic,1)); 



    let msg = "온습도계 등록이  정상적으로 처리 되었습니다";
    let result = 
    {
        response_topic
    ,   correlation_data
    };

    //inset table iot_gateway
    try
    {
        result.msg =  { status:200, code : 'OK',msg };
        let insert_result = await insert_th(shop_id,prod_no,gw_prod_no);
        if(!insert_result.insertId)
        {
            result.msg =  { status: 500, code: 'unknown error' ,msg: 'insert 에 실패하였습니다.' };
        }
        await publish_result(result)
    }
    catch(err)
    {
        msg = err.code + " 오류가 발생하였습니다."; 
        if(err.code == 'ER_DUP_ENTRY')
        {
            msg = "이미 등록된 gateway  장비 입니다."
        }
        result.msg =  { status: 500, code: err.code ,msg };
        //publish with reponse_topic
        await publish_result(result)
    }

    return res.status(200).send('success');
}

const add_ir = async (req,res) => 
{
    console.log("in add ir");

    //data 준비 
    const body                  = req.body;
    const topic                 = body.topic;
    const payload               = body.payload;

    if(!body || !topic || !payload || !payload.prod_no || !payload.th_prod_no)
        return res.status(400).send('missing body,topic,payload,prod_no,th_prod_no');

    const prod_no               = payload.prod_no;
    const th_prod_no            = payload.th_prod_no;
    // const response_topic        = body.pub_props['Response-Topic'];
    // const correlation_data      = body.pub_props['Correlation-Data'];
    const response_topic        = payload.response_topic; 
    const correlation_data      = payload.correlation_data; 


    const shop_id               = parseInt(get_topic_value(topic,1)); 



    let msg = "IR 장비등록이  정상적으로 처리 되었습니다";
    let result = 
    {
        response_topic
    ,   correlation_data
    };

    //inset table iot_ir
    try
    {
        result.msg =  { status:200, code : 'OK',msg };
        let insert_result = await insert_ir(prod_no,shop_id,th_prod_no);
        if(!insert_result.insertId)
        {
            result.msg =  { status: 500, code: 'unknown error' ,msg: 'insert 에 실패하였습니다.' };
            await publish_result(result)
        }
    }
    catch(err)
    {
        msg = err.code + " 오류가 발생하였습니다."; 
        if(err.code == 'ER_DUP_ENTRY')
        {
            msg = "이미 등록된 IR 장비 입니다."
        }

        result.msg =  { status: 500, code: err.code ,msg };
        await publish_result(result)
    }

    return res.status(200).send('success');
}

const add_ac_ir = async (req,res) => 
{
    return res.status(200).send('success');
}


var handler = 
{
    'add_gateway'               :	add_gateway		// gateway
,   'add_th'				    :	add_th			// 온습도계
,   'add_ir'				    :	add_ir			// ir 장비
,   'add_ac_ir'				    :	add_ac_ir		// aircon ir code
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
        let body                    = req.body;
        const payload               = body.payload;
        const cmd                   = payload.cmd;
        if(!cmd)
        {
            console.log("cmd is null");
            return res.status(500).send("cmd is null");
        }

		return handler[cmd](req, res);
    }
    catch (err) 
    {
        console.log("exception occured",err);
        res.status(500).send(err)
    }
}
module.exports.process_install_db= process_install_db;
