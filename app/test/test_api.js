const axios = require('axios')


const username = '0ebeb719ec587b6d'
const password = 'BcC1q4P61Pk6UfVvz0TpsmuD2lyWA9ATYrRfQmhRjp5B'



const getData = (topic,payload,properties,qos,retain) => 
{
// data: {
//     topic: 'test_topic/1',
//     qos: 2,
//     payload: 'hello emqx api',
//     properties: { response_topic: 'some_other_topic', correlation_data: '123456' },
//     retain: false
//   }
    let data = 
    {
        topic
    ,   qos
    ,   payload
    ,   properties
    ,   retain
    };
    return data;
}


const publish_topic = async (data) => 
{
    try 
    {
        let string_data = JSON.stringify(data);
        // let params = 
        // {
        //     method: 'POST',
        //     auth: { username: username, password: password, },
        //     url: 'http://localhost:18083/api/v5/publish',
        //     headers: { 'Content-Type': 'application/json' },
        //     data: string_data        
        // };

        let params = 
        {
            method: 'POST',
            auth: { username: username, password: password, },
            url: 'http://192.168.0.14:18083/api/v5/publish',
            headers: { 'Content-Type': 'application/json' },
            data :string_data 

        };
        console.log("params",params);


        const resp = await axios(params);
        //console.log(resp);
    } 
    catch (err) {
        // Handle Error Here
        console.error(err);
    }
}

(async () => {



    //const getData = (topic,payload,properties,qos,retain) => 
    let topic = "s1/1/install_db";
    //let payload = "prod_no: IG0001";
    //let payload="hello hello";
    let properties =  
    {
        "response_topic": "s1/response/me",
        "correlation_data": "123456",
        "payload_format_indicator": 1,
        "user_properties" : {
            "cmd": "add_gateway"
        ,   "shop_id" : 1
        }
    };
 
        // "shop_id": 1,
        // "timestamp" : '2023-08-30T12:12:00'
    let qos = 1;
    let retain = false;



    // data = 
    // {
    //     "topic": "test_topic/1",
    //     "qos": 0,
    //     "payload": "hello emqx api",
    //     "properties": 
    //     {
    //         "response_topic": "some_other_topic",
    //         "correlation_data": "123456",
    //         "user_properties": 
    //         {
    //             "abc": "eft"
    //         },
    //
    //     },
    //     "retain": false,
    //     
    // }
    // console.log("data",data);

    //data = getData(topic,payload,properties,qos,retain);
    //console.log("data",data);

//     let data = {
//   "payload_encoding": "plain",
//   "topic": "s1/1/install_db",
//   "qos": 0,
//   "payload":  "test1" ,
//   "properties": {
//     "payload_format_indicator": 0,
//     "message_expiry_interval": 0,
//     "response_topic": "s1/response/me",
//     "correlation_data": "111111",
//     "user_properties": {
//       "foo": "bar"
//     },
//     "content_type": "text/json"
//   },
//   "retain": false
// }


    //let payload = '{"aaa":"bbb"}'; 
    let payload = {"aaa":"bbb"}; 
    //let payload = "aaa";
    //let payload = "{\"id\": \"pxx\"}";
    // {
    //     shop_id :1
    // }
    //
    payload = JSON.stringify(payload);

    let data = {
  "payload_encoding": "plain",
  "topic": "s1/idfeelme@gmail.com/me",
  "qos": 2,
  "payload": payload,
  "properties": {
    "payload_format_indicator": 0,
    "message_expiry_interval": 0,
    "response_topic": "some_other_topic",
    "correlation_data": "string",
    "user_properties": {
      "foo": "bar"
    },
    "content_type": "text/json"
  },
  "retain": false
}

//
//     data = 
//     {
//         "topic": "s1/1/install_db",
//         "qos": 0,
//         "payload": "hello emqx api",
//         "properties": 
//         {
//             "response_topic": "some_other_topic",
//             "correlation_data": "123456",
//             "user_properties": 
//             {
//                 "abc": "eft"
//             },
//
//         },
//         "retain": false,
//         
//     }
//  


    let result = await publish_topic(data);
    //console.log("result",result);
    //console.log("hello");

})().catch(e => {
    // Deal with the fact the chain failed
});




//
// axios
//   .get('http://localhost:18083/api/v5/nodes', {
//     auth: {
//       username: username,
//       password: password,
//     },
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//   .then((response) => {
//     console.log(response.data)
//   })
//   .catch((error) => {
//     console.log(error)
//   })
