const Bot = require('./app')
const repos = require('./repos.json')

const promises = Object.keys(repos[0]).map(key => {
  const repo = key
  const owner = repos[0][key]
  return Bot(owner, repo)
})

Promise.all(promises).then((data) => {
  console.log(data)
}).catch(error => {
  throw new Error(error)
})
