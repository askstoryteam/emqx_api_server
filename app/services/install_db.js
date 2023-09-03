const db        = require('../config/database');
const { get_topic_value,publish_result }  = require('../util/util');
const get_data = (req) => 
{
    if(!(req?.body?.topic)) return [null,null,null];

    const topic         = req.body.topic;
    const clientid      = req.body.clientid;
    const payload       = req.body.payload;
    return [topic,clientid,payload];
}

//add gateway device to db
const add_gateway = async (req,res) => 
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
    const response_topic        = body.pub_props['Response-Topic'] || 's1/missing/me';
    const correlation_data      = body.pub_props['Correlation-Data'] || '12345678';
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
        let query = 'insert into iot_gateway(shop_id,prod_no,installer_email) values (?,?,?)';
        let insert_result = await db.query(query,[shop_id,prod_no,email]);
        if(insert_result.insertId)
        {
            console.log("result after insert ",result);
            result.msg =  { status:200, code : 'OK',msg };
        }
        else 
        {
            result.msg =  { status: 500, code: 'unknown error' ,msg: 'insert 에 실패하였습니다.' };
        }
        //publish with reponse_topic
        await publish_result(result)
    }
    catch(err)
    {
        if(err.code == 'ER_DUP_ENTRY')
        {
            msg = "이미 등록된 gateway  장비 입니다."
        }
        else 
        {
            msg = err.code + " 오류가 발생하였습니다."; 
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

    if(!body || !topic || !payload 
        || !payload.prod_no
        || !payload.gw_prod_no
    ) return res.status(400).send('missing body,topic,payload,prod_no,gw_prod_no');

    const prod_no               = payload.prod_no;
    const gw_prod_no            = payload.gw_prod_no;
    const response_topic        = body.pub_props['Response-Topic'];
    const correlation_data      = body.pub_props['Correlation-Data'];
    const user_property         = body.pub_props['User-Property'];
    //const installer_id          = user_property?.user_id || 0 ;
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
        let query = 'insert into iot_th(shop_id,gw_id,prod_no) SELECT ?, gw_id,? FROM iot_gateway where prod_no=?'

        let insert_result = await db.query(query,[shop_id,prod_no,gw_prod_no]);
        if(insert_result.insertId)
        {
            console.log("result after insert ",result);
            result.msg =  { status:200, code : 'OK',msg };
            await publish_result(result)
        }
        else 
        {
            result.msg =  { status: 500, code: 'unknown error' ,msg: 'insert 에 실패하였습니다.' };
            await publish_result(result)
        }
    }
    catch(err)
    {
        if(err.code == 'ER_DUP_ENTRY')
        {
            msg = "이미 등록된 온습도 장비 입니다."
        }
        else 
        {
            msg = err.code + " 오류가 발생하였습니다."; 
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

    if(!body || !topic || !payload 
        || !payload.prod_no
        || !payload.th_prod_no
    ) return res.status(400).send('missing body,topic,payload,prod_no,th_prod_no');

    const prod_no               = payload.prod_no;
    const th_prod_no            = payload.th_prod_no;
    const response_topic        = body.pub_props['Response-Topic'];
    const correlation_data      = body.pub_props['Correlation-Data'];
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
        let query = `insert into iot_ir(prod_no,shop_id, gw_id,th_id) 
                    select ?, ?,A.gw_id , B.th_id 
                    from iot_gateway A join iot_th B 
                    on A.gw_id  = B.gw_id 
                    where B.prod_no = ?; `; 

        let insert_result = await db.query(query,[prod_no,shop_id,th_prod_no]);
        if(insert_result.insertId)
        {
            console.log("result after insert ",result);
            result.msg =  { status:200, code : 'OK',msg };
            await publish_result(result)
        }
        else 
        {
            result.msg =  { status: 500, code: 'unknown error' ,msg: 'insert 에 실패하였습니다.' };
            await publish_result(result)
        }
    }
    catch(err)
    {
        if(err.code == 'ER_DUP_ENTRY')
        {
            msg = "이미 등록된 IR 장비 입니다."
        }
        else 
        {
            msg = err.code + " 오류가 발생하였습니다."; 
        }

        result.msg =  { status: 500, code: err.code ,msg };
        //publish with reponse_topic
        await publish_result(result)
    }

    return res.status(200).send('success');
}

const add_ac_ir = async (req,res) => 
{
    console.log("add_ac_ir");
    res.json("{code:300}");
}


exports.add_gateway = add_gateway; 
exports.add_th      = add_th; 
exports.add_ir      = add_ir; 
exports.add_ac_ir   = add_ac_ir; 
