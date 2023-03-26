const app = require('express').Router()

const viewResults = (io, candidates) => {
    io.of('/admin').on('connection', (socket) => {
        console.log(`Admin Connected: ${socket.id}`)
        socket.on('disconnect', () => {
            console.log('Admin Disconnected!')
        })
    })
    app.get('/', (req, res) => {
        res.render('index')
    })

    return app
}

module.exports = viewResults