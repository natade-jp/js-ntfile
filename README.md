# NTFile
[![ESDoc coverage badge](https://natade-jp.github.io/js-ntfile/badge.svg)](https://natade-jp.github.io/js-ntfile/)
![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

- Node.js用のファイルの読み書きライブラリ
- [npm](https://www.npmjs.com/package/ntfile)

# Install

```sh
npm install --save-dev ntfile
```

# Use

```javascript
import NTFile from "ntfile";
```

# Docs

https://natade-jp.github.io/js-ntfile/

# Example

## save

```javascript
NTFile.saveTextFile("readme.txt",  "test");
```

## load

```javascript
console.log(NTFile.loadTextFile("readme.txt",  "test"));
```

## exec

```javascript
NTFile.exec("npx jest");
```
