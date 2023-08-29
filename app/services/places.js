const db = require('../config/database');

const getCompanyInfo = async (company) => 
{
    let query =`
select  A.place_name        as company
,       A.info              as company_info
,       B.place_name        as place1
, 		B.info              as place1_info
,       C.place_name        as place2
, 		C.info              as place2_info
from iot_places A join iot_places B
ON A.id = B.parent_id join iot_places C
ON B.id = C.parent_id
where A.parent_id is NULL and A.place_name = '${company}'
order by place1 asc, place2 asc
`;
    let content = await db.query(query,[]);
    return content;
}


const getPlace1Info = async (company,place1) => 
{
    let query =`
select  A.place_name        as company
,       A.info              as company_info
,       B.place_name        as place1
, 		B.info              as place1_info
,       C.place_name        as place2
, 		C.info              as place2_info
from iot_places A join iot_places B
ON A.id = B.parent_id join iot_places C
ON B.id = C.parent_id
where A.parent_id is NULL and A.place_name = '${company}' and B.place_name = '${place1}'
order by place1 asc, place2 asc
`;
    let content = await db.query(query,[]);
    return content;
}


const getPlace2Info = async (company,place1,place2) => 
{

    let query =`
select  A.place_name        as company
,       A.info              as company_info
,       B.place_name        as place1
, 		B.info              as place1_info
,       C.place_name        as place2
, 		C.info              as place2_info
from iot_places A join iot_places B
ON A.id = B.parent_id join iot_places C
ON B.id = C.parent_id
where A.parent_id is NULL and A.place_name = '${company}' and B.place_name = '${place1}'
and C.place_name = '${place2}'
order by place1 asc, place2 asc
`;

    let content = await db.query(query,[]);
    return content;
}

exports.getCompanyInfo      = getCompanyInfo; 
exports.getPlace1Info       = getPlace1Info; 
exports.getPlace2Info       = getPlace2Info; 
