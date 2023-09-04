const axios         = require('axios')
const constants     = require('../config/constants');


const publish_topic = async (data) => 
{
    try 
    {
        let string_data = JSON.stringify(data);
        let params = 
        {
            method: 'POST',
            auth: { username: process.env.MQTT_API_USERNAME, password: process.env.MQTT_API_PASSWORD },
            url: `http://${constants.API_SERVER_IP}:18083/api/v5/publish`,
            headers: { 'Content-Type': 'application/json' },
            data : string_data
        };
        await axios(params);
    } 
    catch (err) 
    {
        // Handle Error Here
        console.error(err);
    }
}


const get_topic_value = (topic,index) => 
{
    if(!topic) return '';

    let temp_array = topic.split("/");
    if(index <= temp_array.length)
        return temp_array[index];

    return '';
}


const publish_result = async(result) => 
{
    payload = JSON.stringify(result.msg);
    let data = 
    {
        "payload_encoding": "plain"
    ,   "topic": result.response_topic
    ,   "qos": 2
    ,   "payload": payload
    ,   "retain": false
    }
    await publish_topic(data);
}

exports.get_topic_value     = get_topic_value;
exports.publish_result      = publish_result;
