import buble from "@rollup/plugin-buble";
import uglify from "@lopatnov/rollup-plugin-uglify";

/**
 * 公開用ファイルの設定データを作成
 * @param {string} moduleName - ライブラリ名
 * @param {string} input_name - 入力となるES6のライブラリのトップファイル名
 * @param {string} output_name - 出力するファイル名
 * @param {string} format - umd, cjs, esm
 * @param {boolean} isUglify - コードを最小化させるか否か
 */
const createData = function (moduleName, input_name, output_name, format, isUglify) {
	const data = {};
	data.output = {};
	data.output.name = moduleName;
	data.output.file = output_name;
	data.output.format = format;
	data.input = input_name;
	/**
	 * @type {import("rollup").Plugin[]}
	 */
	data.plugins = [];

	if (format === "umd" || format === "cjs") {
		data.plugins.push(buble());
	}
	if (isUglify) {
		data.plugins.push(uglify());
	}

	return data;
};

const data = [];

data.push(createData("Test", "./src/index.js", "./build/cjs/index.js", "cjs", false));
data.push(createData("Test", "./src/index.js", "./build/cjs/index.min.js", "cjs", true));
data.push(createData("Test", "./src/index.js", "./build/esm/index.js", "esm", false));
data.push(createData("Test", "./src/index.js", "./build/esm/index.min.js", "esm", true));

export default data;
