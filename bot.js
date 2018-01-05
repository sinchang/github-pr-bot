const bot = require('./app')
const repos = require('./repos.json')
const async = require('async')

async.mapLimit(repos, 2, async item => {
  const repo = item.repo
  const owner = item.owner
  const response = await bot(owner, repo)
  return response
}, (err, results) => {
  console.log(err)
  if (err) throw err
  console.log(results)
})
