module.exports = {
    getAll: function (con, callback) {
        con.query(`
        SELECT id_event, event_name, dependency_name, id_dependency 
        FROM events
            JOIN dependencies
            ON events.fk_dependency = dependencies.id_dependency;`,
            callback)
    },

    getById: function (con, id, callback) {
        con.query(`SELECT * FROM events WHERE id_event=${id}`, callback)
    },

    create: function (con, fk_dependency, event_name, callback) {
        con.query(`
            INSERT INTO events(event_name, fk_dependency) 
            VALUES ("${event_name}", ${fk_dependency})`,
            callback
        )
    },

    update: function (con, id, event_name, callback) {
        con.query(`
        UPDATE events 
        SET event_name=?
        WHERE id_event=?;
        `, [event_name, id], callback)
    },

    delete: function (con, id, callback) {
        con.query(`DELETE FROM events WHERE id_event=${id}`, callback)
    },

    getByDependency: function (con, fk, callback) {
        con.query(`SELECT * FROM events WHERE fk_dependency=${fk};`, callback)
    }
}