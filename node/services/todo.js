const Q = require('q');
const user = require('./login');
(function (todo) {
    const dbUtil = require('./dbUtil');
    todo.getdata = () => {
        let deffered = Q.defer();
        const { u_id } = require('./login');
        // console.log(u_id);
        console.log("Start of todoList");
        dbUtil.query("SELECT * FROM todo WHERE u_id = ?", [u_id])
            .then(response => deffered.resolve(response))
            .catch(err => deffered.reject(err));
        return deffered.promise;
    }

    todo.addTodoList = (task, date) => {
        let deffered = Q.defer();
        console.log("Start of addTodoList");
        const { u_id } = require('./login');
        console.log(u_id);
        dbUtil.query("INSERT INTO todo (`task`,`date`,`u_id`) VALUES (?, ?, ?)", [task, date, u_id])
            .then(response => deffered.resolve(response))
            .catch(err => deffered.reject(err));
        return deffered.promise;
    }

    todo.editData = (task, date) => {
        let deffered = Q.defer();
        console.log("Start of Update data");
        const { u_id } = require('./login');
        dbUtil.query("UPDATE todo SET task=? , date=? where u_id = ?  ;", [task, date, u_id])
            .then((response) => deffered.resolve(response))
            .catch((err) => deffered.reject(err));
        return deffered.promise;
    }

    todo.deleteTask = (id) => {
        let deffered = Q.defer();
        console.log("Deleting a task");
        dbUtil.query("DELETE FROM todo WHERE id = ?", [id])
            .then(response => deffered.resolve(response))
            .catch(err => deffered.reject(err));
        return deffered.promise;
    }
})(module.exports);
