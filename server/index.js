const app = require('express')()
const { createServer } = require('http')
const { Server } = require('socket.io')
const server = createServer(app)
const io = new Server(server, {cors : { origin: "*"}})

let candidates = [
    {
        name: "Kofi",
        vote: 0
    },
    {
        name: "Ama",
        vote: 0
    }
]

const adminRoutes = require('./routes/routes')(io, candidates)
const castVote  = require('./routes/userRoutes')(io, candidates)

app.set('view engine', 'ejs')

app.use('/admin', adminRoutes)
app.use('/voter', castVote)


server.listen(3000, () => {
    console.log('Server is running on port 3000')
})
