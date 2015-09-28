'use strict';
/* global require */

var test = require('tape');
var fileRegister = require('../');


test('setup file register api', function(assert){
  var register = fileRegister();
  var actual = Object.keys(register).length;
  var expected = 3;
  assert.equal(actual, expected, 'File register should return an api.');
  assert.end();
});

test('add files should return complete function', function(assert){
  var register = fileRegister();
  register.addFiles('', function(){
    assert.pass('addFiles onComplete.');
    assert.end();
  });
});

test('get file from register', function(assert){
  var register = fileRegister();
  register.addFiles('./test/fixtures/*', function(){
    var actual = register.getFile('./test/fixtures/jade.jade');
    var expected = 'div\n  | foo';

    assert.equal(actual, expected, 'Given an existing file, it should return its contents.');
    assert.end();
  });
});

test('get file from register', function(assert){
  var register = fileRegister();
  register.addFiles('./test/fixtures/*', function(){
    var actual = register.getFile('test/fixtures/javascript.js');
    var expected = 'function foo(){}';

    assert.equal(actual, expected, 'Given an existing file, it should return its contents.');
    assert.end();
  });
});

test('get file from register', function(assert){
  var register = fileRegister();
  register.addFiles('./test/fixtures/*', function(){
    var actual = register.getFile('test/fixtures/text.txt');
    var expected = 'foo.txt';

    assert.equal(actual, expected, 'Given an existing file, it should return its contents.');
    assert.end();
  });
});

test('get non existant file from register: error', function(assert){
  var register = fileRegister();
  register.addFiles('./test/fixtures/*', function(){
    var actual = Boolean(register.getFile('nope.txt'));
    var expected = true;

    assert.equal(actual, expected, 'Given a non existant file, it should return an error.');
    assert.end();
  });
});

test('get all when no files are added', function(assert){
  var register = fileRegister();
  register.addFiles('foo.jade', function(){
    var actual = register.getAll();
    var expected = {};

    assert.deepEqual(actual, expected, 'Given no files, getAll should return an empty object.');
    assert.end();
  });
});

test('get all', function(assert){
  var register = fileRegister();
  register.addFiles(['./test/fixtures/jade.jade', './test/fixtures/text.txt'], function(){
    var actual = Object.keys(register.getAll()).length;
    var expected = 2;
    assert.equal(actual, expected, 'Given files, getAll should return an object with 2 keys.');
    assert.end();
  });
});