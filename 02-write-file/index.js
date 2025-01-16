const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const fs = require('node:fs');
const path = require('path');

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const rl = readline.createInterface({ input, output });

console.log('Hello! Start typing. Type "exit" to quit:');
rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Good bye!');
    rl.close();
  } else {
    writeStream.write(input + '\n');
  }
});

rl.on('close', () => {
  writeStream.end();
});

rl.on('SIGINT', () => {
  console.log('Good bye!');
  rl.close();
});
