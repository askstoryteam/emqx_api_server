const db = require('../config/database');
const getAirFanInfo = async (id) => 
{
    let query = `
select  B.company               as company
,       B.place1                as place1
,       B.place2                as place2
,       C.bmt_id                as id
,       CASE  
        WHEN A.power & b'00000001' = 0
            THEN 0 
        WHEN A.power & b'00000001' = 1
            THEN 1 
        ELSE 0 
        End                     as power              

,       CASE   
        WHEN A.power >>3 & b'00000111'  = 1
            THEN 1  
        WHEN A.power >>3  & b'00000111' = 2
            THEN 2  
        WHEN A.power >>3  & b'00000111' = 3
            THEN 3  
        WHEN A.power >>3  & b'00000111' = 4
            THEN 1  
        ELSE 1 
        End                     as airvol              
,       CASE				
			WHEN A.power >>7 & b'00000001'= 1		
			THEN 1		
			WHEN A.power >>7 & b'00000001'  = 0		
			THEN 0		
			ELSE 0 		
		END AS                  plazma
,       CASE
        WHEN power >>1 & b'00000011'  = 0 
            THEN 0  
        WHEN power >>1 & b'00000011'  = 1
            THEN 1  
        WHEN power >>1 & b'00000011'  = 2
            THEN 2
        ELSE 0  
        End                     as mode              
,       0                       as status_code
,       0                       as error_code
,       DATE_FORMAT(A.updated_at,'%Y-%m-%d %H:%i:%s')  as created_at
from iot_device_onoff A join v_iot_places2 B 
on A.dev_id = B.dev_id join iot_devices C 
on A.dev_id = C.id
where C.bmt_id = '${id}'
`;
    let content = await db.query(query,[]);
    return content;
}

exports.getAirFanInfo = getAirFanInfo; 
