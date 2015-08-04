var fs = require('fs')

function log(file, config, recoveryPoint, scheduler, time){

}

function mkdir(dir, cb){
  fs.exists(dir, funciton(exists){
    if(!exists){
      fs.mkdir(dir, function(){
          return cb()
      })
    }
    else {
      return cb();
    }
  })
}

function analyzeAndValidateMessageSet(messages){

}

function loadSegments(dir){
  mkdir(dir, function(){

  })
}
