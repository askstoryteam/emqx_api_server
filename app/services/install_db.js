const db        = require('../config/database');

const insert_gateway = async (shop_id,prod_no,email) => 
{
    let query = 'insert into iot_gateway(shop_id,prod_no,installer_email) values (?,?,?);';
    return  db.query(query,[shop_id,prod_no,email]);
}

const insert_th = async (shop_id,prod_no,gw_prod_no) => 
{
    let query = 'insert into iot_th(shop_id,prod_no,gw_prod_no) SELECT ?, gw_id,? FROM iot_gateway where prod_no=?;'
    return  db.query(query,[shop_id,prod_no,gw_prod_no]);
}

const insert_ir = async (prod_no,shop_id,th_prod_no) => 
{
    let query = `insert into iot_ir(prod_no,shop_id, gw_id,th_id) 
                    select ?, ?,A.gw_id , B.th_id 
                    from iot_gateway A join iot_th B 
                    on A.gw_id  = B.gw_id 
                    where B.prod_no = ?;`; 
    return db.query(query,[prod_no,shop_id,th_prod_no]);
}

const add_ac_ir = async (req,res) => 
{
    console.log("add_ac_ir");
    res.json("{code:300}");
}

exports.insert_gateway = insert_gateway; 
exports.insert_th      = insert_th; 
exports.insert_ir      = insert_ir; 
exports.add_ac_ir   = add_ac_ir; 
