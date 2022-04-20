const Q = require('q');
var bcrypt = require('bcrypt');
(function (login) {

    const dbUtil = require('./dbUtil');

    //login function
    login.getDetails = async (email, password) => {
        let deffered = await Q.defer();
        const bcrypt = require('bcrypt');
        console.log("Start of getting details");
        dbUtil.query("SELECT * FROM user WHERE email = ?", [email])
            .then((response) => {
                console.log(response);
                if (response.length > 0) {
                    var hashPassword = response[0].password;
                    var u_id = response[0].u_id;
                    // console.log(u_id);
                    module.exports = { u_id };
                    bcrypt.compare(password, hashPassword).then(function (response) {
                        if (response == true) {
                            deffered.resolve(true);
                        } else {
                            deffered.resolve(false);
                        }
                    });
                } else {
                    deffered.reject(false)
                }
            })
            .catch(err => {
                console.log(err);
                deffered.reject(err)
            });
        return deffered.promise;
    };

    //register function
    login.register = async (name, email, password) => {
        let deffered = Q.defer();
        const bcrypt = require('bcrypt');
        var hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);
        console.log("Start of registration");
        dbUtil.query("INSERT INTO user (name, email, password) VALUES (?, ?, ?)", [name, email, hashPassword])
            .then(response => deffered.resolve(response))
            .catch(err => deffered.reject(err));
        return deffered.promise;
    }
})(module.exports);
