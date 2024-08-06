import { JSDOM } from 'jsdom';

function normalizeURL(url) {
	let urlArr = url.split('//');
	let normalizedURL;
	if (urlArr.length > 1) {
		normalizedURL = urlArr[1];
	} else {
		normalizedURL = urlArr[0];
	}
	if (normalizedURL.slice(-1) === '/') {
		normalizedURL = normalizedURL.slice(0, -1);
	}
	normalizedURL = normalizedURL.toLowerCase();
	return normalizedURL;
}

// returns the absolute path = baseURL/path
function getURLsFromHTML(html, baseURL) {
	const dom = new JSDOM(html);
	const doc = dom.window.document;
	const anchors = doc.querySelectorAll('a');

	const urls = [];
	for (const anchor of anchors) {
		if (anchor.hasAttribute('href')) {
			let currentURL = anchor.href;
			try {
				// convert any URL to absolute URLs
				currentURL = new URL(currentURL, baseURL).href;
				urls.push(currentURL);
			} catch (err) {
				console.log(`${err.message}: ${currentURL}`);
			}
		}
	}
	return urls;
}

async function fetchHTML(url) {
	let res;
	try {
		res = await fetch(url);
	} catch (err) {
		throw new Error(`Got Network error: ${err.message}`);
	}

	if (res.status > 399) {
		throw new Error(`Got HTTP error: ${res.status} ${res.statusText}`);
	}

	const contentType = res.headers.get('content-type');
	if (!contentType || !contentType.includes('text/html')) {
		throw new Error(`Got non-HTML response: ${contentType}`);
	}

	return res.text();
}

// use default args to prime the first call
async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
	// if this is an offsite URL, stop right away
	const currentURLObj = new URL(currentURL);
	const baseURLObj = new URL(baseURL);
	if (currentURLObj.hostname !== baseURLObj.hostname) {
		return pages;
	}

	// use the normalized url format
	const normalizedURL = normalizeURL(currentURL);

	// if we've already visited this page increase the count and don't enter another recursion
	if (pages[normalizedURL] > 0) {
		pages[normalizedURL]++;
		return pages;
	}

	// here the page doesn't exist yet so we initialize this page in the map
	pages[normalizedURL] = 1;

	// fetch and parse the html of the currentURL
	console.log(`crawling ${currentURL}`);
	let html = '';
	try {
		html = await fetchHTML(currentURL);
	} catch (err) {
		console.log(`${err.message}`);
		return pages;
	}

	// recur through the page's links
	const nextURLs = getURLsFromHTML(html, baseURL);
	for (const nextURL of nextURLs) {
		pages = await crawlPage(baseURL, nextURL, pages);
	}

	return pages;
}

export { normalizeURL, getURLsFromHTML, crawlPage };
