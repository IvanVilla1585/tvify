import votes from '../models'

export function incrementVote (id, callback) {
  votes.findOne({ id: id  }, (err, data) => {
    if (!err && data){
      data.count = data.count + 1
      data.save((err) => {
        if (err) return callback(err)
        return callback(null, data)
      })
    }else{
      let vote = new votes()
      vote.id = id
      vote.count = 1
      vote.save((err) => {
        if (err) return callback(err)
        return callback(null, vote)
      })
    }
  })
}

export function getVotes (callback) {
  votes.find({}, (err, votes) => {
    if (err) return callback(err)

    callback(null, votes)
  })
}

export function addVotes (shows, callback) {
  getVotes((err, votes) => {
    if (err) return votes = []

    shows = shows.map(show => {
      let vote = votes.filter(vote => vote.id === show.id)[0]
      show.count = vote ? vote.count : 0
      return show
    })

    callback(shows)
  })
}
