const uuidAPIKey        = require('uuid-apikey');
const fs                = require('fs');
const fileName          = './app/middleware/keys.json';
let keyStoreArray       = [];

// api key 를 map 에 저장, 여러개 저장 가능
const setupKeyMap = () =>
{
    fs.readFile(fileName, 'utf-8', (err, data) => 
    {
        if (err) {
          console.error(`Failed to read file ${fileName}`);
          return;
    }
    const keys = JSON.parse(data);
    //마지막 
    for (const key of keys) 
    {
        const keyMap = new Map();
        keyMap.set("apiKey",key.apiKey);
        keyMap.set("uuid",key.uuid);
        keyMap.set("name",key.name);
        keyStoreArray.push(keyMap);
    }
    });
}

setupKeyMap(fileName);

const ApiKeyAuth = (req,res,next) => 
{
    //header에서 x-onpoomkey 값을 읽어온다.
    const apiKey = req.get('emqx_api_server_key');

    //정상적인 api key 정상 여부 1차 검사
    if (!apiKey || !uuidAPIKey.isAPIKey(apiKey))
    {
        res.status(401).send('API key is invalid Unauthorized');
        return;
    }

    //loop 를 돌면서 유효한 api key 를 가지고 있는지 check 2차 검사
    for(let keyMap of keyStoreArray)
    {
        const tempAPIKey = keyMap.get('apiKey');
        
        //일치하는 api key 가 있는지 점검
        if(tempAPIKey !== apiKey) continue;

        const uuid = keyMap.get('uuid');
        if (uuidAPIKey.check(apiKey, uuid))
        {
            req.server = apiKey;  
            return next();
        }
    }

    //통과하지 못하면 401 에러 출력
    console.log('API key is invalid Unauthorized',apiKey);
    res.status(401).send('Unauthorized');
}
exports.ApiKeyAuth  = ApiKeyAuth;
