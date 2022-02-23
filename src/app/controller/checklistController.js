const { redirect } = require('express/lib/response');
const Events = require('../model/eventModel');
const Requirements = require('../model/requirementModel');

module.exports = {

    index: function (req, res) {
        console.log(req.session)
        console.log(req.params.id)
        const fkDependency = req.params.id

        let dependency = {}
        let events = []

        Events.getByDependency(req.con, fkDependency, (err, rows) => {
            if (err) console.error(err)

            console.log("Events.getByDependency")
            console.table(rows)

            rows.forEach(row => {
                if(!dependency.dependency_name) dependency.dependency_name = row.dependency_name
                if(!events.includes(row.task_name)) {
                    let aux = {}
                    aux.id_event = row.id_event
                    aux.event_name = row.event_name
                    aux.requirements = []
                    events.push(aux)
                }
            })

            console.log("dependency")
            console.log(dependency)
            console.log("events")
            console.log(events)

            Requirements.getAllByDependency(req.con, fkDependency, (err, rows) => {
                if (err) console.error(err)

                console.log("Requirements.getByDependency")
                console.table(rows)

                events.forEach(event => {
                    rows.forEach(row => {
                        if(row.event_name == event.event_name) event.requirements.push(row.requirement_name)
                    })
                })

                console.log("events")
                console.log(events)

                            res.render("checkLists",{
                                fkDependency: fkDependency,
                                events: events
                            })
            })

        })

    },

    addChecklist: function (req, res) {
        const fkEvent = req.params.fk
        const requirement = req.body.requirement

        console.log(req.body.requirement)
        console.log(req.body.fkDependency)

        Requirements.getDependency(req.con, fkEvent, (err, rows) => {
            if (err) console.error(err)

            console.log("Requirements.getDependency")
            let fkDependency = rows[0].fk_dependency
            Requirements.create(req.con, fkEvent, requirement, (err, rows) => {
                if (err) console.error(err)

                console.log("requirements.create")
                console.log(rows)

                res.redirect(`/dependencia/${fkDependency}`)
            })
        })
    }

}
