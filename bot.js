const Bot = require('./app')
const repos = require('./repos.json')
const async = require('async')

async.mapLimit(repos, 2, async function(item) {
  const repo = item.repo
  const owner = item.owner
  const response = await Bot(owner, repo)
  return response
}, (err, results) => {
  console.log(err)
  if (err) throw err
  console.log(results)
})
