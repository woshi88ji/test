const fs = require('fs')

const KEY_LENGTH = 1024
const KEY_COUNT = 2048
const KEY_CHART = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890(){}[]!@#$%^&*'

let arr = []
for (let i = 0; i < KEY_COUNT; i++) {
  let key = ''
  for (let j = 0; j < KEY_LENGTH; j++) {
    key = key + KEY_CHART[Math.floor(Math.random() * KEY_CHART.length)]
    
  }
  arr.push(key)
}
fs.writeFileSync('.keys', arr.join('\n'))
console.log(`${KEY_COUNT} keys have generated`)