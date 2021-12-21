const fs = require('fs');
const dictionary = JSON.parse(fs.readFileSync('./config/dictionary.json', 'utf-8'));

dictionary.sort(function (a, b) {
    return b.length - a.length;
  });

  console.log(dictionary)