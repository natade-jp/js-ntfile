/**
 * UTF-8 でテキストを書き込む
 * @param path
 * @param text
 */
declare function saveTextFile(path: string, text: string): void;

/**
 * UTF-8 with BOM でテキストを書き込む
 * @param path
 * @param text
 */
declare function saveTextFileWithBOM(path: string, text: string): void;

/**
 * BOMあり／なしに関わらず、UTF-8のテキストを読み込む
 * @param path
 * @returns テキストデータ
 */
declare function loadTextFile(path: string): string;

/**
 * バイナリデータを書き込む
 * @param path
 * @param binary
 */
declare function saveBinaryFile(path: string, binary: number[]): void;

/**
 * バイナリデータを読み込む
 * @param path
 * @returns バイナリデータ
 */
declare function loadBinaryFile(path: string): number[];

/**
 * 実行する
 * @param command
 */
declare function exec(command: string): void;

/**
 * ファイルが存在するか調べる
 * @param path
 */
declare function isExist(path: string): boolean;

/**
 * ディレクトリかどうか判定する
 * @param path
 */
declare function isFile(path: string): boolean;

/**
 * ディレクトリかどうか判定する
 * @param path
 */
declare function isDirectory(path: string): boolean;

/**
 * ファイルをコピーする
 * @param from
 * @param to
 */
declare function copy(from: string, to: string): void;

/**
 * ファイルを削除する
 * @param path
 */
declare function deleteFile(path: string): void;

/**
 * フォルダを作成する
 * @param path
 */
declare function makeDirectory(path: string): void;

/**
 * 指定したディレクトリ及び条件下のファイルのリストを作成
 * @param path_or_types
 */
declare function createList(path_or_types: string | Object): string[];

/**
 * フォルダを削除する
 * @param path
 */
declare function deleteDirectory(path: string): void;

/**
 * 環境ファイルの定義値をJSONで取得する - XX = YY といったデータが記載された文章を読み込む
 * @param path
 */
declare function getEnvironmentFile(path: String): { [key: string]: string };

