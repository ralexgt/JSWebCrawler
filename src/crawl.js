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

export { normalizeURL, getURLsFromHTML };
