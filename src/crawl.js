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

export { normalizeURL };
