import { argv } from 'node:process';
import { crawlPage } from './crawl.js';
import { printReport } from './report.js';

async function main() {
	// skip "node start" from CLI
	const args = argv.slice(2);
	if (!(args.length === 1)) {
		console.log('The program takes exactly ONE argument (baseURL)');
		return;
	}
	// the the base URL provided
	const baseURL = args[0];
	console.log(`Starting crawler for: ${baseURL}...`);

	await crawlPage(baseURL);

	const pages = await crawlPage(baseURL);

	printReport(pages);
}

main();
