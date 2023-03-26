const app = require('express').Router();

const castVote = (io, candidates) => {
    let voterNameSpace = io.of('/voter')
    let adminNameSpace = io.of('/admin')

    let voter;
    voterNameSpace.on('connection', (soc) => {
        console.log(`Voter Connected: ${soc.id}`)
        voter = soc.id
        soc.on('disconnect', () => {
            console.log('Voter disconnected!')
        })
        soc.on('vote', (vote) => {
            candidates.forEach(cand => {
                if (cand.name === vote) {
                    cand.vote ++
                }
                console.log(cand)
            });
        })
        adminNameSpace.emit('results', candidates)
    })
    // io.of('/voter').on('connection', (socket) => {
    //     console.log(`Voter Connected: ${socket.id}`)
    //     socket.on('disconnect', () => {
    //         console.log('A User Disconnected!')
    //     })
    //     socket.on('vote', (candidate) => {
    //         candidates.map((cand) => {
    //             if(candidate === cand.name) {
    //                 cand.vote ++
    //             }
    //             console.log(cand)
    //         })
    //     })

    //     io.of('/admin').emit('result', candidates)
    // })
    app.get('/', (req, res) => {
        res.render('voter')
    })

    return app
}

module.exports = castVote

