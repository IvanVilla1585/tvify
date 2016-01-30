import express from 'express'
import votes from '../models'
import tvmaze from 'tv-maze'
import { incrementVote, getVotes, addVotes } from '../lib'

const router = express.Router()
const client = tvmaze.createClient()

router.get('/shows', (req, res) => {
  client.shows((err, shows) => {
    if (err) {
      return res.sendStatus(500).json(err)
    }

    addVotes(shows, shows => {
      res.json(shows)
    })
  })
})

router.get('/show/:id', (req, res) => {
  let id = req.params.id

  client.show(id, (err, show) => {
    if (err) {
      return res.sendStatus(500).json(err)
    }

    res.json(show)
  })
})

router.get('/search', (req, res) => {
  let query = req.query.q
  client.search(query, (err, shows) => {
    if (err){
       return res.sendStatus(500).json(err)
    }

    shows = shows.map(show => show.show)

    addVotes(shows, shows => {
      res.json(shows)
    })
  })
})

router.get('/votes', (req, res) => {
  getVotes((err, votes) => {
    if (err){
       return res.sendStatus(500).json(err)
    }

    res.json(votes)
  })
})

router.post('/vote/:id', (req, res) => {
  let id = req.params.id

  incrementVote(id, (err, data) =>{
    if (err) return res.sendStatus(500).json(err)

    res.json(vote)
  })
})

export default router
