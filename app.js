const axios = require('axios')
const base64 = require('base-64')
const cheerio = require('cheerio')
const { token, githubId } = require('./config')

const BASE_URL = 'https://api.github.com'
const regex = /<a\starget='_blank'\srel='nofollow'\shref='https:\/\/app.codesponsor.io\/link(.*)\n(.*)\n<\/a>/g
const accessToken = `token ${token}`

function forkRepo(owner, githubId, repo) {
  return axios({
    method: 'POST',
    url: `${BASE_URL}/repos/${owner}/${repo}/forks`,
    headers: {
      Authorization: accessToken
    },
    data: {
      organization: githubId
    }
  }).then(res => Promise.resolve(res.data)).catch(err => Promise.reject(err))
}

function getReadmeContent(githubId, repo) {
  return axios({
    method: 'GET',
    url: `${BASE_URL}/repos/${githubId}/${repo}/readme`,
    headers: {
      Authorization: accessToken
    }
  }).then(res => Promise.resolve(res.data)).catch(err => Promise.reject(err))
}

function updateContent(githubId, repo, params = {}) {
  return axios({
    method: 'PUT',
    url: `${BASE_URL}/repos/${githubId}/${repo}/contents/${params.path}`,
    headers: {
      Authorization: accessToken
    },
    data: {
      ...params
    }
  }).then(res => Promise.resolve(res.data)).catch(err => Promise.reject(err))
}

function createPr(githubId, repo, params = {}) {
  return axios({
    method: 'POST',
    url: `${BASE_URL}/repos/${githubId}/${repo}/pulls`,
    headers: {
      Authorization: accessToken
    },
    data: {
      ...params
    }
  }).then(res => Promise.resolve(res.data)).catch(err => Promise.reject(err))
}

const Bot = (owner, repo) => {
  return forkRepo(owner, githubId, repo)
    .then((forkRes) => {
      const base = forkRes.default_branch
      return getReadmeContent(githubId, repo)
        .then(readmeRes => {
          const {
            path,
            sha,
            content
          } = readmeRes
          const text = base64.decode(content).replace(regex, '')
          return updateContent(githubId, repo, {
            path,
            message: 'remove codesponsor',
            sha,
            content: base64.encode(text)
          }).then(contentRes => {
            return createPr(owner, repo, {
              title: 'remove codesponsor',
              head: githubId + ':master',
              body: `auto send pull request by ${githubId} <https://github.com/${githubId}>`,
              base
            })
          })
        })
    })
}

module.exports = Bot
