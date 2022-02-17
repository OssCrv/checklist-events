const Events = require("../model/eventModel")
const Dependencies = require("../model/dependencyModel")


module.exports = {
    list: function (req, res) {
        Events.getAll(req.con,
            function (err, rows) {
                if (err) console.error(err)
                let events = rows

                Dependencies.get(req.con, (err, rows) => {
                    if (err) console.error(err)
                    let dependencies = rows.map(row => row.dependency_name)

                    res.render("events", {
                        events: events, dependencies: dependencies,
                        activeSession: {
                            loggedIn: req.session.loggedIn,
                            name: req.session.name
                        }
                    })
                })
            }
        )
    },

    create: function (req, res) {
        let fkDependency
        eventName = req.body.event_name
        dependencyName = req.body.dependency_name

        Dependencies.get(req.con, (err, rows) => {
            if (err) console.error(err)
            fkDependency = rows.filter(dependency => {
                return dependency.dependency_name == req.body.dependency_name
            }).map(dependency => dependency.id_dependency)

            Events.create(req.con, fkDependency, eventName, (err, rows) => {
                if (err) console.error(err)
                res.redirect("/events")
            })
        })

    },

    edit: function (req, res) {
        const id = req.params.id
        const name = req.body.event_name;

        Events.update(req.con, id, name, function (err, rows) {
            if(err) console.error(err)
            res.redirect("/events")
        })
    },

    delete: function (req, res) {
        Events.delete(req.con, req.params.id,
            function (err, rows) {
                if (err) console.error(err)
                res.redirect("/events")
            })
    },

   
}
