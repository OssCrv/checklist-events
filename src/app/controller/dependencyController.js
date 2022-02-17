const Dependencies = require("../model/dependencyModel")

module.exports = {

    index: function (req, res) {
        console.log(req.session)
        Dependencies.get(req.con,
            function (err, rows) {
                if (err) console.error(err)
                res.render("index", {
                    dependencies: rows, activeSession: {
                        loggedIn: req.session.loggedIn,
                        name: req.session.name
                    }
                })
            })
    },
    list: function (req, res) {
        Dependencies.get(req.con,
            function (err, rows) {
                if (err) console.error(err)
                res.render("dependencies", {
                    dependencies: rows, activeSession: {
                        loggedIn: req.session.loggedIn,
                        name: req.session.name
                    }
                })
            })
    },

    create: function (req, res) {
        Dependencies.create(req.con, req.body.dependency_name,
            function (err, rows) {
                if (err) console.error(err)
                res.redirect("/dependencies")
            })
    },

    edit: function (req, res) {
        const id = req.params.id
        const name = req.body;

        Dependencies.update(req.con,
            id,
            name,
            function (err, rows) {
                if (err) console.error(err)
                res.redirect("/dependencies")
            })
    },

    delete: function (req, res) {
        Dependencies.delete(req.con, req.params.id,
            function (err, rows) {
                res.redirect("/dependencies")
            })
    }
}
