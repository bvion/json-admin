const async = require('async');
const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');

class FileIO {
  constructor(params = {}) {
    if(!params.fileName) {
      throw "File name is not set for FileIO module!";
    }

    this._fileName = params.fileName;
  }

  read(cb) {
    fs.open(path.join(this._fileName), 'r', (err, contents) => {
      cb(err, contents);
    });
  }

  write(content, cb) {
    //File Descriptor
    let fd;

    async.waterfall(
      [
        (cb) => {
          fs.open(path.join(this._fileName), 'w', (err, _fd) => {
            fd = _fd;
            cb(err);
          });
        },

        (cb) => {
          exec(`flock -n -x ${fd}`, cb);
        },

        (cb) => {
          fs.write(fd, contents, 0, 'utf-8', cb);
        },

        (cb) => {
          exec(`flock -u ${fd}`, cb);
        }
      ],

      (err) => {
        cb(err);
      }
    );
  }
}

module.exports = FileIO;



/**** new code
 *
 *
 *

module.exports = JsonAdmin;
const net = require('net');
const fs = require('fs');

const PORT = 4139;
const HOST = '127.0.0.1';

function tryLock(callback) {
  const server = net.createServer((socket) => {
  }).on('error', (err) => {
    setTimeout( () => {
      tryLock(callback);
    }, 100);
  });

  server.listen(PORT, HOST, () => {
    callback(null, server);
  });
}



function tryWrite(content, callback) {
  tryLock( (err, server) => {
    fs.appendFileSync( 'test.txt', content+"\n");
    setTimeout( () => {
      server.close();
      callback();
    },100);
  });
}

let counter = 0;
while(counter < 10000) {
  let content = "hmmz " + counter;
  tryWrite(content, () => {
    console.log("yazildi ("+content+")");
  });
  counter++;
}
*/
