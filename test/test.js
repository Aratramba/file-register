const test = require('tape');
const fileRegister = require('../');


test('setup file register api', function(assert){
  const register = fileRegister();
  const actual = Object.keys(register).length;
  const expected = 3;
  assert.equal(actual, expected, 'File register should return an api.');
  assert.end();
});

test('add files should return complete function', function(assert){
  const register = fileRegister();
  register.addFiles('', function(){
    assert.pass('addFiles onComplete.');
    assert.end();
  });
});

test('get file from register', function(assert){
  const register = fileRegister();
  register.addFiles('./test/fixtures/*', function(){
    const actual = register.getFile('./test/fixtures/jade.jade');
    const expected = 'div\n  | foo';

    assert.equal(actual, expected, 'Given an existing file, it should return its contents.');
    assert.end();
  });
});

test('get file from register', function(assert){
  const register = fileRegister();
  register.addFiles('./test/fixtures/*', function(){
    const actual = register.getFile('test/fixtures/javascript.js');
    const expected = 'function foo(){}';

    assert.equal(actual, expected, 'Given an existing file, it should return its contents.');
    assert.end();
  });
});

test('get file from register', function(assert){
  const register = fileRegister();
  register.addFiles('./test/fixtures/*', function(){
    const actual = register.getFile('test/fixtures/text.txt');
    const expected = 'foo.txt';

    assert.equal(actual, expected, 'Given an existing file, it should return its contents.');
    assert.end();
  });
});

test('get non existant file from register: error', function(assert){
  const register = fileRegister();
  register.addFiles('./test/fixtures/*', function(){
    const actual = Boolean(register.getFile('nope.txt'));
    const expected = true;

    assert.equal(actual, expected, 'Given a non existant file, it should return an error.');
    assert.end();
  });
});

test('get all when no files are added', function(assert){
  const register = fileRegister();
  register.addFiles('foo.jade', function(){
    const actual = register.getAll();
    const expected = {};

    assert.deepEqual(actual, expected, 'Given no files, getAll should return an empty object.');
    assert.end();
  });
});

test('get all', function(assert){
  const register = fileRegister();
  register.addFiles(['./test/fixtures/jade.jade', './test/fixtures/text.txt'], function(){
    const actual = Object.keys(register.getAll()).length;
    const expected = 2;
    assert.equal(actual, expected, 'Given files, getAll should return an object with 2 keys.');
    assert.end();
  });
});