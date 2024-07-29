import { test, expect } from '@jest/globals';
import { normalizeURL } from '../crawl';

test('Input: https://test.com/path1/ | Expected: test.com/path1', () => {
	expect(normalizeURL('https://test.com/path1/')).toBe('test.com/path1');
});

test('Input: http://test.com/path2 | Expected: test.com/path2', () => {
	expect(normalizeURL('http://test.com/path2')).toBe('test.com/path2');
});

test('Input: test.com/path_s/path3/ | Expected: test.com/path_s/path3', () => {
	expect(normalizeURL('test.com/path_s/path3/')).toBe('test.com/path_s/path3');
});

test('Input: TEST.com/path_s/path4/ | Expected: test.com/path_s/path4', () => {
	expect(normalizeURL('TEST.com/path_s/path4/')).toBe('test.com/path_s/path4');
});
