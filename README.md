# File register
Adds text files into a js object with file path as key. Used for quick lookup of file contents.


```js
var fileRegister = require('text-file-register');
var register = fileRegister();
```

```js
register.addFiles('./files/**/*.txt', function(){});
```

```js
register.addFiles('./files/*.txt', function(){
    var contents = register.getFile('files/test.txt');
    console.log(contents);
});
```

```js
register.addFiles('./files/*.txt', function(){
    var obj = register.getAll();
    console.log(obj);
});
```

### API
```js
addFiles(["multi-glob", "patterns"], function(){});
```
```js
getFile('path/to/file.txt');
```

```js
getAll();
```
