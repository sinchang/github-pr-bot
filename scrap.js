const axios = require('axios')
const fs = require('fs')
const cheerio = require('cheerio')
const sleep = require('sleep')

// copy github cookie set here
const cookie = ''

const fetchRepo = (page = 72) => {
  sleep.sleep(5)
  console.log(page)
  const url = `https://github.com/search?l=Markdown&p=${page}&q=href%3D%27https%3A%2F%2Fapp.codesponsor.io%2Flink%2F&type=Code&utf8=%E2%9C%93`

  axios({
    method: 'GET',
    url,
    headers: {
      Cookie: `${cookie}`
    }
  }).then(res => {
    const $ = cheerio.load(res.data)
    try {
      const els = Array.from($('#code_search_results .text-bold'))
      let repos = ''

      if (!els || els.length === 0) return false

      els.forEach(el => {
        repos += el.attribs.href + '\n'
      })

      fs.appendFileSync('repos.txt', repos)
      fetchRepo(++page)
    } catch (e) {
      console.log(e)
      fetchRepo(++page)
    }
  }).catch(err => {
    throw new Error(err)
  })
}

fetchRepo()
