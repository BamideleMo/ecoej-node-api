const pool = require("../../config/database");


module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into users (category,username,password,first_name,middle_name,last_name) 
            values(?,?,?,?,?,?)`,
            [
                data.category,
                data.username,
                data.password,
                data.first_name,
                data.middle_name,
                data.last_name,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getUsers: callBack => {
        pool.query(
            `select * from users`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getUserById: (id, callBack) => {
        pool.query(
            `select * from users where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0]);
            }
        )
    },
    getUserByUsername: (username, callBack) => {
        pool.query(
            `select * from users where username = ?`,
            [username],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0]);
            }
        )
    },
    updateUser: (data, callBack) => {
        pool.query(
            `select * from users where id = ?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                // return callBack(null, results[0]);
                if (results.length == 1) {
                    var curVals = results[0];

                    pool.query(
                        `update users set username=?, first_name=?, middle_name=?, last_name=?, category=?, password=? where id=?`,
                        [
                            data.username || curVals.username,
                            data.first_name || curVals.first_name,
                            data.middle_name || curVals.middle_name,
                            data.last_name || curVals.last_name,
                            data.category || curVals.category,
                            data.password || curVals.password,
                            data.id
                        ],
                        (error, results, fields) => {
                            if (error) {
                                return callBack(error)
                            }
                            return callBack(null, results);
                        }
                    )
                }
            }
        )
    },
    deleteUser: (data, callBack) => {
        pool.query(
            `delete from users where id=?`,
            [
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0]);
            }
        )
    },
};