# NTFormat
![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

- Node.js用のファイルの読み書きライブラリ
- [npm](https://www.npmjs.com/package/ntfile)

# Install

```sh
npm install --save-dev ntfile
```

# Exsample

## save

```javascript
import NTFile from "ntfile";
NTFile.saveTextFile("readme.txt",  "test");
```

## exec

```javascript
import NTFile from "ntfile";
console.log(NTFile.loadTextFile("readme.txt",  "test"));
```

## exec

```javascript
import NTFile from "ntfile";
NTFile.exec("npx jest");
```

