# Javascript Web Crawler

<details>
<summary>  Project description </summary>
&nbsp;&nbsp;&nbsp;&nbsp; The scope of the project was to generate a report
of how many times an internal link appears in all pages under one base domain.
</details>

</br>

<details>
<summary>  Implementation</summary>
&nbsp;&nbsp;&nbsp;&nbsp; I started by writing some helping functions in crawl.js for normalizing any URLs found in order to check if the page is under the starting domain, getting all links from an HTML page and fetching HTML pages with certain error catchings and made some tests for them. </br>
&nbsp;&nbsp;&nbsp;&nbsp; I first implemented a function to crawl a single page and after testing and seeing it works I made it to recursively crawl any internal link not already crawled, starting on the base URL. </br>
&nbsp;&nbsp;&nbsp;&nbsp; Finishing with a report printed directly in the console, it shows how many times each internal link appeared on all the crawled pages.
</details>

</br>
