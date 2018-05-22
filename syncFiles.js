var dir = process.platform === 'darwin' ? "/Users/msethi/code/cob/src" : 'C:/code/ured/uploads';
var fs = require('fs');
var moment = require('moment');
var afterTime = "2018-05-22T06:00:00"
var path = require('path');
var mkdirp = require('mkdirp');
var toDir = process.platform === 'darwin' ? "/Users/msethi/code/ofc/uploads" : 'C:/dev/wealth-onboarding/client/src';

var getFileInfo = function(fileName) {
  var fileTime = fs.statSync(fileName).mtime.getTime();
  return {
    name: fileName,
    dir: path.dirname(fileName),
    changed: moment(fileTime) > moment(afterTime)
  }
}


var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(getFileInfo(file));
          next();

        }
      });
    })();
  });
};

var copyFiles = function(results) {
  results.forEach(f => {
    var correctPath = path.dirname(f.name.substr(f.name.indexOf('src') + 4));
    console.log(f.name, correctPath);
    var destDir = toDir + "/" + correctPath + "/";
    if (!fs.existsSync(destDir)) {
      mkdirp(destDir, function(err) {
        if (!err) {

          fs.copyFileSync(f.name, destDir + path.basename(f.name));

        }
      });
    } else {
      fs.copyFileSync(f.name, destDir + path.basename(f.name));
    }
  })
}

walk(dir, function(err, results) {
  if (err) throw err;
  copyFiles (results.filter(r=>r.changed));
});
