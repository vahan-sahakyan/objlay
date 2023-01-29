# @vahan-sahakyan/objlay

[![npm (scoped)](https://img.shields.io/npm/v/@vahan-sahakyan/objlay.svg)](https://www.npmjs.com/package/@vahan-sahakyan/objlay)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@vahan-sahakyan/objlay.svg)](https://www.npmjs.com/package/@vahan-sahakyan/objlay)

Displays an object via Express.js in the browser.

## Install

```
$ npm install @vahan-sahakyan/objlay
```

## Usage

```js
const objlay = require('@vahan-sahakyan/objlay');

const object = {
  name: 'Vahan',
  job: 'Software Engineer',
};

objlay(object, 3000, 4, false);

// OBJECT, PORT, INDENT, GRAY_PRIMITIVES
```
