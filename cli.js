const inquirer = require('inquirer')
const logUpdate = require('log-update')
const bot = require('./app')

const questions = [{
  type: 'input',
  name: 'owner',
  message: 'What\'s the repo owner?',
  validate(value) {
    if (!value) return 'Please enter repo owner'
    return true
  }
},
{
  type: 'input',
  name: 'repo',
  message: 'What\'s the repo name?',
  validate(value) {
    if (!value) return 'Please enter repo name'
    return true
  }
}
]

inquirer.prompt(questions).then(answers => {
  bot(answers.owner, answers.repo)
    .then(() => logUpdate('pr done.'))
    .catch(err => logUpdate(err))
})
