function printReport(pages) {
	console.log('\n---------------------');
	console.log('Generating report...');
	console.log('---------------------\n');
	const sortedPages = sortPages(pages);
	for (const page of sortedPages) {
		const url = page[0];
		const count = page[1];
		console.log(`Found ${count} links to ${url}`);
	}
}

// get a list of (url, count) tuples ordered descending by count
function sortPages(pages) {
	const pagesArr = Object.entries(pages);
	pagesArr.sort((pageA, pageB) => {
		if (pageB[1] === pageA[1]) {
			return pageA[0].localeCompare(pageB[0]);
		}
		return pageB[1] - pageA[1];
	});
	return pagesArr;
}

export { printReport, sortPages };
