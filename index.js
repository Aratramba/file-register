const glob = require('multi-glob').glob;
const fs = require('fs');
const path = require('path');
const async = require('async');


function fileRegister(){
  const register = {};


  /**
   * Read file
   */

  function readFile(file, cb){
    fs.readFile(file, 'utf8', function(err, data){
      if(err) throw err;

      register[path.resolve(file)] = data;
      if(cb) cb();
    });
  }


  /**
   * Add files to register
   */

  function addFiles(pattern, cb){
    glob(pattern, function(err, files){
      if(err) throw err;

      async.each(files, readFile, function(err){
        if(err) throw err;
        if(cb) cb();
      });
    });
  }


  /**
   * Get file
   */

  function getFile(file){
    file = path.resolve(file);

    if(!register[file]){
      return new Error('File '+ file +' not found in file register.');
    }

    return register[file] || null;
  }


  /**
   * Get register
   */

  function getAll(){
    return register;
  }


  return {
    addFiles: addFiles,
    getFile: getFile,
    getAll: getAll
  };
}

module.exports = fileRegister;