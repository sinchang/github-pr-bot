const fs = require('fs')

const txt = fs.readFileSync('repos.txt').toString()

let arr = [{}]
const txtArr = txt.split('\n')

txtArr.forEach(item => {
  const a = item.split('/')
  const owner = a[1]
  const repo = a[2]
  if (!arr[0][repo]) {
    arr[0][repo] = owner
  }
})

fs.writeFileSync('repos.json', JSON.stringify(arr))


