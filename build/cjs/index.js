'use strict';

var fs = require('fs');
var child_process = require('child_process');

/**
 * NTFile.js
 * Copyright 2013-2023 natade < https://github.com/natade-jp >
 *
 * The MIT license.
 * https://opensource.org/licenses/MIT
 */


/**
 * ファイルクラス
 */
var NTFile = function NTFile () {};

NTFile.saveTextFile = function saveTextFile (path, text) {
	fs.writeFileSync(path, text, "utf-8");
};

/**
	 * UTF-8 with BOM でテキストを書き込む
	 * @param {string} path
	 * @param {string} text
	 */
NTFile.saveTextFileWithBOM = function saveTextFileWithBOM (path, text) {
	if (text.length > 0 && text.charAt(0) !== "\uFEFF") {
		fs.writeFileSync(path, "\uFEFF" + text, "utf-8");
	} else {
		fs.writeFileSync(path, text, "utf-8");
	}
};

/**
	 * BOMあり／なしに関わらず、UTF-8のテキストを読み込む
	 * @param {string} path
	 * @returns {string} テキストデータ
	 */
NTFile.loadTextFile = function loadTextFile (path) {
	var text = fs.readFileSync(path, "utf-8");
	if (text.length > 0 && text.charAt(0) === "\uFEFF") {
		return text.substring(1);
	} else {
		return text;
	}
};

/**
	 * バイナリデータを書き込む
	 * @param {string} path
	 * @param {number[]} binary
	 */
NTFile.saveBinaryFile = function saveBinaryFile (path, binary) {
	var buffer = new Uint8Array(binary.length);
	for (var i = 0; i < buffer.length; i++) {
		buffer[i] = binary[i];
	}
	fs.writeFileSync(path, buffer);
};

/**
	 * バイナリデータを読み込む
	 * @param {string} path
	 * @returns {number[]} バイナリデータ
	 */
NTFile.loadBinaryFile = function loadBinaryFile (path) {
	var buffer = fs.readFileSync(path);
	var binary = new Array(buffer.length);
	for (var i = 0; i < buffer.length; i++) {
		binary[i] = buffer.readUInt8(i);
	}
	return binary;
};

/**
	 * 実行する
	 * @param {string} command
	 */
NTFile.exec = function exec (command) {
	var execSync = child_process.execSync;
	execSync(command);
};

/**
	 * ファイルが存在するか調べる
	 * @param {string} path
	 * @return {boolean}
	 */
NTFile.isExist = function isExist (path) {
	try {
		fs.statSync(path);
		return true;
	} catch (error) {
		if (error.code === "ENOENT") {
			return false;
		} else {
			console.log(error);
		}
	}
	return false;
};

/**
	 * ディレクトリかどうか判定する
	 * @param {string} path
	 * @return {boolean}
	 */
NTFile.isFile = function isFile (path) {
	if (!NTFile.isExist(path)) {
		return false;
	}
	return fs.statSync(path).isFile();
};

/**
	 * ディレクトリかどうか判定する
	 * @param {string} path
	 * @return {boolean}
	 */
NTFile.isDirectory = function isDirectory (path) {
	if (!NTFile.isExist(path)) {
		return false;
	}
	return fs.statSync(path).isDirectory();
};

/**
	 * ファイルをコピーする
	 * @param {string} from
	 * @param {string} to
	 */
NTFile.copy = function copy (from, to) {
	var bin = fs.readFileSync(from);
	fs.writeFileSync(to, bin);
};

/**
	 * ファイルを削除する
	 * @param {string} path
	 */
NTFile.deleteFile = function deleteFile (path) {
	if (!NTFile.isExist(path)) {
		return;
	}
	fs.unlinkSync(path);
};

/**
	 * フォルダを作成する
	 * @param {string} path
	 */
NTFile.makeDirectory = function makeDirectory (path) {
	if (NTFile.isExist(path)) {
		return;
	}
	fs.mkdirSync(path);
};

/**
	 * 追加条件
	 * @typedef {Object} NTFilterObject
	 * @property {Array<RegExp|string>} [includes]
	 * @property {Array<RegExp|string>} [excludes]
	 */

/**
	 * 指定したディレクトリ及び条件下のファイルのリストを作成
	 * @param {string} target_directory
	 * @param {NTFilterObject} [filter]
	 * @return {Array<string>}
	 */
NTFile.createList = function createList (target_directory, filter) {
	var dir_path = target_directory.replace(/[\\/]+$/, "");
	var load_list = fs.readdirSync(dir_path);
	var list = [];
	for (var i = 0; i < load_list.length; i++) {
		list[i] = dir_path + "/" + load_list[i];
	}
	for (var i$1 = 0; i$1 < list.length; i$1++) {
		if (NTFile.isDirectory(list[i$1])) {
			var new_list = fs.readdirSync(list[i$1]);
			for (var j = 0; j < new_list.length; j++) {
				/**
					 * @type {string}
					 */
				var add_file = list[i$1] + "/" + new_list[j];
				list.push(add_file);
			}
		}
	}

	if (filter == undefined) {
		return list;
	}

	/**
		 * @type {Array<string>}
		 */
	var filtered_list = [];

	for (var i$2 in list) {
		var name = list[i$2];
		var is_target = false;
		if (filter.includes) {
			for (var j$1 in filter.includes) {
				var fi = filter.includes[j$1];
				if (typeof fi === "string") {
					if (name.indexOf(fi) === -1) {
						is_target = true;
						break;
					}
				} else if (fi.test(name)) {
					is_target = true;
					break;
				}
			}
		}
		if (!is_target) {
			continue;
		}
		if (filter.excludes) {
			for (var j$2 in filter.excludes) {
				var fi$1 = filter.excludes[j$2];
				if (typeof fi$1 === "string") {
					if (name.indexOf(fi$1) === -1) {
						is_target = false;
						break;
					}
				} else if (fi$1.test(name)) {
					is_target = false;
					break;
				}
			}
		}
		if (!is_target) {
			continue;
		}
		filtered_list.push(name);
	}
	return filtered_list;
};

/**
	 * フォルダを削除する
	 * @param {string} path
	 */
NTFile.deleteDirectory = function deleteDirectory (path) {
	if (!NTFile.isDirectory(path)) {
		return;
	}
	{
		// まずはファイルのみを全消去
		var list = NTFile.createList(path);
		for (var i = 0; i < list.length; i++) {
			if (NTFile.isFile(list[i])) {
				NTFile.deleteFile(list[i]);
			}
		}
	}
	// フォルダの中身が0のフォルダを繰り返し削除
	for (var i$1 = 0; i$1 < 10; i$1++) {
		var list$1 = NTFile.createList(path);
		for (var j = 0; j < list$1.length; j++) {
			if (NTFile.createList(list$1[j]).length === 0) {
				fs.rmdirSync(list$1[j]);
			}
		}
	}
	// 最後に目的のフォルダを削除
	fs.rmdirSync(path);
};

/**
	 * 環境ファイルの定義値をJSONで取得する
	 * - XX = YY といったデータが記載された文章を読み込む
	 * @param {String} path
	 * @return {Object<string, string>}
	 */
NTFile.getEnvironmentFile = function getEnvironmentFile (path) {
	var text = NTFile.loadTextFile(path).split(/\r?\n/g);
	/**
		 * @type Object<string, string>
		 */
	var output = {};
	for (var i = 0; i < text.length; i++) {
		var line = text[i];
		line = line.replace(/#.*/, "").trim();
		if (line.length === 0) {
			continue;
		}
		if (!/=/.test(line)) {
			continue;
		}
		var name = line.replace(/=.*/, "").trim();
		var data = line.replace(/[^=]+=/, "").trim();
		if (/^".*"$/.test(data)) {
			data = data.replace(/^"(.*)"$/, "$1");
		}
		output[name] = data;
	}
	return output;
};

module.exports = NTFile;
