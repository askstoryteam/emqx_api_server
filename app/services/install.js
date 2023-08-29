const db = require('../config/database');
const add_gateway = async (req,res) => 
{
    console.log("add_gateway");
    res.json("{code:300}");
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
