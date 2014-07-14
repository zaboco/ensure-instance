# ensure-instance

`npm install --save ensure-instance`

Given a class, it takes an object and build an instance of that class based on the object, or returns the object itself if it is already an instance of the class.

Assumes that an instance can be built based on a bare js object, meaning that the class constructor has the following signature:
```js
/**
* @param {object} def
*/
function SomeClass(def, ...) {
  ...
}
```

## Usage

```js
var ensureInstance = require('ensure-instance'),
    SomeClass = require('./SomeClass')
    ensureSomeClassInstance = ensureInstance(SomeClass);

var someInstance = new SomeClass({});

var sameInstance = ensureSomeClassInstance(someInstance),
    newInstance  = ensureSomeClassInstance({})

assert(sameInstance === someInstance);
assert(newInstace instanceof SomeClass);
```

It also works for extra arguments to the constructor:
```js
function MultiArgsConstructor(def, custom) {
  this.def = def;
  this.def.custom = custom;
}

var multiArgsInstance = ensureInstance(MultiArgsConstructor)({}, 5);

assert(multiArgsInstance.def.custom === 5);
```

