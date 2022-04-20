(function (dbUtil) {
    const Q = require('q');
    const mysql = require('mysql2');
    const dbconfig = require('../config/dbconfig');

    var con = mysql.createConnection({
        host: dbconfig.dbHost,
        user: dbconfig.dbUserName,
        password: dbconfig.dbPassword,
        database: dbconfig.dbSchema
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected");
    });

    dbUtil.query = function (sqlStatment, parameters) {
        let deffered = Q.defer();
        con.query(sqlStatment, parameters, function (err, result1) {
            if (err) {
                console.error(new Date() + ': Error in database', err);
                deffered.reject(err);
                return;
            }
            deffered.resolve(result1);
        });
        return deffered.promise;
    }
})(module.exports);