import NTFile from "./NTFile.js";

const td = "./tmp_test";

test("NTFile.makeDirectory", () => {
	NTFile.makeDirectory(td);
	expect(NTFile.isExist(td)).toBe(true);
	expect(NTFile.isFile(td)).toBe(false);
	expect(NTFile.isDirectory(td)).toBe(true);
	NTFile.deleteDirectory(td);
	expect(NTFile.isExist(td)).toBe(false);
	expect(NTFile.isFile(td)).toBe(false);
	expect(NTFile.isDirectory(td)).toBe(false);
});

test("NTFile.saveTextFile", () => {
	NTFile.makeDirectory(td);
	expect(NTFile.isExist(td + "/test.txt")).toBe(false);
	expect(NTFile.isFile(td + "/test.txt")).toBe(false);
	expect(NTFile.isDirectory(td + "/test.txt")).toBe(false);
	NTFile.saveTextFile(td + "/test.txt", "test");
	expect(NTFile.isFile(td + "/test.txt")).toBe(true);
	expect(NTFile.isExist(td + "/test.txt")).toBe(true);
	expect(NTFile.isDirectory(td + "/test.txt")).toBe(false);
	expect(NTFile.loadTextFile(td + "/test.txt")).toBe("test");
	NTFile.deleteFile(td + "/test.txt");
	NTFile.deleteDirectory(td);
});

test("NTFile.saveTextFileWithBOM", () => {
	NTFile.makeDirectory(td);
	NTFile.saveTextFileWithBOM(td + "/test.txt", "test");
	expect(NTFile.loadTextFile(td + "/test.txt")).toBe("test");
	NTFile.deleteDirectory(td);
});

test("NTFile.createList", () => {
	NTFile.makeDirectory(td);
	NTFile.saveTextFile(td + "/test1.doc", "test1");
	NTFile.saveTextFile(td + "/test2.xls", "test2");
	const path1 = NTFile.createList(td);
	expect(path1.length).toBe(2);
	expect(path1[0]).toBe(td + "/test1.doc");
	expect(path1[1]).toBe(td + "/test2.xls");
	const path2 = NTFile.createList({ source: td, includes: [/.doc$/] });
	expect(path2.length).toBe(1);
	expect(path2[0]).toBe(td + "/test1.doc");
	const path3 = NTFile.createList({ source: td, includes: [/.doc$/], excludes: [/.doc$/] });
	expect(path3.length).toBe(0);
	NTFile.deleteDirectory(td);
});
