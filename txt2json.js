const fs = require('fs')

const txt = fs.readFileSync('repos.txt').toString()

const arr = []
const txtArr = txt.split('\n')

txtArr.forEach(item => {
  const a = item.split('/')
  const owner = a[1]
  const repo = a[2]
  if (owner && repo) arr.push({ owner, repo })
})

fs.writeFileSync('repos.json', JSON.stringify(arr))
