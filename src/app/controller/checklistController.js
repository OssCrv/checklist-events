
module.exports = {

    index: function (req, res) {
        console.log(req.session)
        res.render("checkLists")
    },

}