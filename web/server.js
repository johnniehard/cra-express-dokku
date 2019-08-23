import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import compression from 'compression'
import jwt from 'jsonwebtoken'

import { requireAuth } from './api/auth'

const app = express()
app.use(compression())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'build')))

app.use((req, res, next) => {
    try {
        let token
        // get token form auth header or query string
        if (req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1]
        } else if (req.query.token) {
            token = req.query.token
        }
        if (token) {

            jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
                if (payload) {
                    req.authenticated = true
                    next()
                } else {
                    next()
                }
            })
        } else {
            next()
        }
    } catch (e) {
        next()
    }
})

app.post('/auth', (req, res) => {
    const match = req.body.pass === process.env.SECRET
    if (match) {
        const token = jwt.sign('authenticated', process.env.JWT_SECRET)
        res.status(200)
        res.json({ token })
    } else {
        res.status(400)
        res.json({ message: 'Invalid password' })
    }
})

app.get('/auth', requireAuth, (req, res) => {
    res.status(200).send()
})


app.get('/ping', (req, res) => {
    res.send('pong')
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(process.env.PORT || 5000)