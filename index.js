// const fs = require("fs");
// require("log-timestamp");

// const buttonPressesLogFile = "./button-presses.log";

// console.log(`Watching for file changes on ${buttonPressesLogFile}`);

// fs.watchFile(buttonPressesLogFile, { interval: 1000 }, (curr, prev) => {
//   console.log(`${buttonPressesLogFile} file Changed`);
// });

// const fs = require('fs');
// require('log-timestamp');

// const buttonPressesLogFile = './button-presses.log';

// console.log(`Watching for file changes on ${buttonPressesLogFile}`);

// fs.watch(buttonPressesLogFile, (event, filename) => {
//   if (filename) {
//     console.log(`${filename} file Changed`);
//   }
// });
const fs = require('fs');
require('log-timestamp');

const buttonPressesLogFile = './button-presses.log';

console.log(`Watching for file changes on ${buttonPressesLogFile}`);

let fsWait = false;
fs.watch(buttonPressesLogFile, (event, filename) => {
  if (filename) {
    if (fsWait) return;
    fsWait = setTimeout(() => {
      fsWait = false;
    }, 100);
    console.log(`${filename} file Changed`);
  }
});
