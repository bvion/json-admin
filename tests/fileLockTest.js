const FileIO = require('../lib/FileIO');
const async = require('async');

const file = new FileIO({fileName: '/tmp/mehmet.txt'});
let counter = 1;

async.each(new Array(100), (i, cb) => {
  console.log(counter);
  file.write(`Test ${counter++}`, cb);
},
(err) => {
  if(err) {
    console.trace(err);
  } else {
    console.log('Test completed successfully');

    file.read((err, contents) => {
      if(!err) {
        console.log(`File content is: ${contents}`);
      } else {
        console.trace(err);
      }
    });
  }
});
