import { test, expect } from '@jest/globals';
import { normalizeURL, getURLsFromHTML } from '../crawl';

// normalize URLs tests
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

// get un-normalized URLs from HTML tests
test('getURLsFromHTML absolute', () => {
	const inputURL = 'https://test.com';
	const inputHTML =
		'<html><body><a href="https://test.com"><span>test.com></span></a></body></html>';
	const actual = getURLsFromHTML(inputHTML, inputURL);
	const expected = ['https://test.com/'];
	expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative', () => {
	const inputURL = 'https://test.com';
	const inputHTML =
		'<html><body><a href="/path_s/path1"><span>test.com></span></a></body></html>';
	const actual = getURLsFromHTML(inputHTML, inputURL);
	const expected = ['https://test.com/path_s/path1'];
	expect(actual).toEqual(expected);
});

test('getURLsFromHTML both', () => {
	const inputURL = 'https://test.com';
	const inputBody =
		'<html><body><a href="/path_s/path2"><span>test.com></span></a><a href="https://other.com/path_s/"><span>test.com></span></a></body></html>';
	const actual = getURLsFromHTML(inputBody, inputURL);
	const expected = [
		'https://test.com/path_s/path2',
		'https://other.com/path_s/',
	];
	expect(actual).toEqual(expected);
});
