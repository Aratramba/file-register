# File register
Adds text files into a js object with file path as key. Used for quick lookup of file contents.


```js
var fileRegister = require('file-register.js');
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
`addFiles(["multi-glob", "patterns"], function(){});`
`getFile('path/to/file.txt');`
`getAll();`