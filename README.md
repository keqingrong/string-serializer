# string-serializer

[![npm version](https://img.shields.io/npm/v/string-serializer.svg)](https://www.npmjs.com/package/string-serializer)

> A JavaScript utility for parsing and stringifying values

## Installation

```js
npm install string-serializer
```

The CDN build is also available on unpkg:

- [unpkg.com/string-serializer/dist/string-serializer.umd.js](https://unpkg.com/string-serializer/dist/string-serializer.umd.js)
- [unpkg.com/string-serializer/dist/string-serializer.umd.min.js](https://unpkg.com/string-serializer/dist/string-serializer.umd.min.js)

## API

- parseArray()
- parseObject()
- stringifyArray()
- stringifyObject()

## Usage

```js
import { parseArray, parseObject } from 'string-serializer';

parseArray('[1,2,3]'); // [1, 2, 3]
parseArray('1,2,3'); // [1, 2, 3]
parseArray('"1","2","3"'); // ["1", "2", "3"]

parseArray('["a","b","c"]'); // ["a", "b", "c"]
parseArray('[a,b,c]'); // ["a", "b", "c"]
parseArray('a,b,c'); // ["a", "b", "c"]

parseObject('{a:1}'); // { a: 1 }
parseObject('{"a":1}'); // { a: 1 }
```

## License

MIT © Qingrong Ke
