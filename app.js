const app = require('./src/app/server.config');

const port = app.get('port')

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
