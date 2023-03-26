const route = (app, io) => {
    io.on('connection', () => {
        console.log('Voter Connected')
    })
    app.get('/castvote', (req, res) => {
        res.send('<h1>Vote</h1>')
    })
}

module.exports = route