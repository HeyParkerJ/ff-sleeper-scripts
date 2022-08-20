import { doCSVCalculations } from './csvCalculations'

test('doCSVCalculations provides the appropriate data', () => {
  const fs = require('fs');

  let rawdata = fs.readFileSync('src/mocks/matchups.json')
  const matchups = JSON.parse(rawdata)

  rawdata = fs.readFileSync('src/mocks/rosters.json')
  const rosters = JSON.parse(rawdata)

  rawdata = fs.readFileSync('src/mocks/users.json')
  const users = JSON.parse(rawdata)

  const data = {
    matchups: matchups,
    rosters: rosters,
    users: users,
  }
  doCSVCalculations(data, 2021)
})
