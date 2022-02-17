module.exports = {
    get: function (con, callback) {
        con.query("SELECT * FROM dependencies;", callback)
    },

    getById: function (con, id, callback) {
        con.query(`SELECT * FROM dependencies WHERE id_dependency=${id}`, callback)
    },

    create: function (con, dependency_name, callback) {
        con.query(`INSERT INTO dependencies(dependency_name) VALUES ("${dependency_name}")`, callback
        )
    },

    update: function (con, id, data, callback) {
        con.query(`
        UPDATE dependencies 
        SET dependency_name=?
        WHERE id_dependency=?;
        `, [data.dependency_name, id], callback)
    },

    delete: function (con, id, callback) {
        con.query(`DELETE FROM dependencies WHERE id_dependency=${id}`, callback)
    }
}