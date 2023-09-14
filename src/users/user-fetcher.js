const createConnectionPool = require("../database/SitDB");


const pool = createConnectionPool();

const sql = 'Select id,login,id_branch,email from users';


const fetchUsers = async () => {
    const usersWithEmail = [];
    try{
    console.log('Fetching users');
    const users = await pool.query(sql);
    if(users[0].length === 0) return;
    users[0].forEach(element => {
        if(element.email){
            usersWithEmail.push(element);
        }
    });
    } catch (error) {
        console.log(error);
    }
    return usersWithEmail;
}
module.exports = fetchUsers;