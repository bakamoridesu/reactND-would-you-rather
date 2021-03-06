let users = {
  lucyheartfilia: {
    id: 'lucyheartfilia',
    name: 'Lucy Heartfilia',
    avatarURL: "url('/images/lucy_heartfilia.png')",
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionTwo',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  natsudragneel: {
    id: 'natsudragneel',
    name: 'Natsu Dragneel',
    avatarURL: "url('/images/natsu.jpg')",
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  happydragneel: {
    id: 'happydragneel',
    name: 'Happy',
    avatarURL: "url('/images/happy.png')",
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionTwo'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  }
}

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'lucyheartfilia',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['lucyheartfilia'],
      text: 'buy a magic key',
    },
    optionTwo: {
      votes: [],
      text: 'buy plenty of clothes'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'happydragneel',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'eat a tasty fish',
    },
    optionTwo: {
      votes: ['happydragneel', 'lucyheartfilia'],
      text: 'eat 2 tasty fishes'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'lucyheartfilia',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'have a photoset for a glamour magazine',
    },
    optionTwo: {
      votes: ['lucyheartfilia'],
      text: 'go shopping for a week!'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'natsudragneel',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'burn a town with a fire',
    },
    optionTwo: {
      votes: ['lucyheartfilia'],
      text: 'eat one hundred chicken legs'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'natsudragneel',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['natsudragneel'],
      text: 'complete a 100 000$ task',
    },
    optionTwo: {
      votes: ['happydragneel'],
      text: 'find 10 000$ on a road'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'happydragneel',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['happydragneel'],
      text: 'learn new magic power',
    },
    optionTwo: {
      votes: ['natsudragneel'],
      text: 'learn new combat ability'
    }
  },
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...questions}), 1000)
  })
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

export function _saveQuestion (question) {
  return new Promise((res, rej) => {
    const authedUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }

      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          questions: users[authedUser].questions.concat([formattedQuestion.id])
        }
      }

      res(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
  console.log(authedUser)
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer
          }
        }
      }

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser])
          }
        }
      }

      res()
    }, 500)
  })
}