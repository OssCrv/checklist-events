module.exports = {
    getAll: function (con, callback) {
        con.query(`
        SELECT *
        FROM requirements
            JOIN events
            ON requirements.fk_event = events.id_event;`,
            callback)
    },

    getByEvent: function (con, id, callback) {
        con.query(`SELECT *
        FROM requirements
        JOIN events
        ON requirements.fk_event = events.id_event
        WHERE events.id_event=${id}`, callback)
    },

    create: function (con, fk_event, requirement_name, callback) {
        con.query(`
        INSERT INTO requirements(requirement_name, fk_event) 
        VALUES ("${requirement_name}", ${fk_event})`,
            callback
        )
    },

    delete: function (con, id, callback) {
        con.query(`DELETE FROM requirements WHERE id_requirement=${id}`, callback)
    },

    getAllByDependency: function (con, fk, callback) {
        con.query(`
        SELECT *
        FROM requirements
            JOIN events
            ON requirements.fk_event = events.id_event
            WHERE events.fk_dependency=${fk};`,
            callback)
    },

    getDependency: function (con, id, callback) {
        con.query(`SELECT fk_dependency
        FROM events
        WHERE id_event=${id}`, callback)
    }
}