

//First action to get all servers from NomadDB




// const sql = 'SELECT f_ip_address, F_NAME, f_id, F_PARENT_ID FROM t_g_branch GROUP BY f_ip_address, F_NAME, f_id, F_PARENT_ID';
const sql = `SELECT f_ip_address, MAX(F_NAME) AS F_NAME, MAX(f_id) AS f_id, MAX(F_PARENT_ID) AS F_PARENT_ID
FROM t_g_branch
GROUP BY f_ip_address;`;
const server_fetch = (pool) => {
    console.log('All Server fetch started');
    return new Promise(async (resolve, reject) => {
        try {
            const [rows, fields] = await pool.query(sql);

            if (!rows || rows.length === 0) {
                resolve([]); // No results, return an empty array
                return;
            }
            // console.log('Rows:', rows);

            const servers = rows
                .filter(element => element.f_ip_address !== null && element.f_ip_address !== '' &&
                    element.f_ip_address !== undefined && element.f_ip_address !== 'null')
                .map(element => {
                    
                    try {
                        if (element.F_NAME !== null && element.F_NAME !== undefined) {
                          //kgd  
                          const val = element.F_NAME.split(';')[1].replace('RU=', '');
                           //tenge 
                        //    const val = element.F_NAME.replace('RU=', ''); 
                            
                            element.F_NAME = val;
                            
                            return element;
                        }
                    } catch (error) {
                        return null;
                    }
                    // console.log(element);
                })
                .filter(element => element !== null); // Filter out null elements

            resolve(servers);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = server_fetch;
