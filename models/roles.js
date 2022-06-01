const db = require('../config/config');

const Role ={};

Role.create=(id_user,id_role,result)=>{
    const sql =`
    INSERT INTO
        user_has_roles(
            id_user,
            id_role,
            created_at,
            updated_at
        )
    VALUES(?,?,?,?)
    `;

    db.query(
        sql,
        [id_user,id_role,new Date(),new Date()],
        (err,res)=>{
            if(err){
                console.log(`Error:`,err);
                result(err,null);
            }else{
                console.log(res.insertedId,'APA INI');
                console.log(`User role berhasil di tambah`,res.insertId);
                result(null,res.insertId);
            }
        }
    )
}

module.exports = Role;