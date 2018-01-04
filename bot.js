const Bot = require('./app')
const repos = require('./repos.json')
const async = require('async')

async.mapLimit(Object.keys(repos[0]), 2, async function(key) {
  console.log(key)
  const repo = key
  const owner = repos[0][key]
  const response = await Bot(owner, repo)
  return response
}, (err, results) => {
  console.log(err)
  if (err) throw err
  console.log(results)
})
