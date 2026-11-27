/**
 * js/request-demo.js
 * ---------------------------------------------------------------------------
 * WEEK 4 PREVIEW - you are not expected to understand this yet.
 *
 * It exists for one reason: to make Monday's lesson visible. When this page
 * loads, the script asks the Express server for /api/profile and prints the
 * whole request/response round trip in the browser console.
 *
 * TO SEE IT
 *   1. npm start
 *   2. open http://localhost:3000
 *   3. open DevTools (F12 or Cmd+Option+I) and look at the Console tab
 *   4. switch to the Network tab and reload - every row is one HTTP request
 *
 * Nothing on the page depends on this file. Delete it and the site is fine.
 * ---------------------------------------------------------------------------
 */

// An IIFE (immediately invoked function expression) keeps these names out of
// the global scope. Week 3 covers why that matters.
(async function showTheRequest() {
  const endpoint = '/api/profile';

  console.log('%cWeek 1 - watch an HTTP request happen', 'font-weight:bold;font-size:14px');
  console.log('1. The browser already made a request for this HTML page.');
  console.log('2. It then requested css/main.css, which requested 12 more files.');
  console.log(`3. Now this script is requesting ${endpoint} ...`);

  try {
    // fetch() sends an HTTP GET request and returns a Promise.
    const response = await fetch(endpoint);

    // IMPORTANT: fetch only rejects on a NETWORK failure. A 404 or a 500 is a
    // perfectly successful round trip as far as fetch is concerned, so you
    // must check response.ok yourself. This catches out almost everyone once.
    if (!response.ok) {
      throw new Error(`Server answered ${response.status} ${response.statusText}`);
    }

    const payload = await response.json();

    console.log(`4. The server answered ${response.status} ${response.statusText}`);
    console.log('   Content-Type:', response.headers.get('content-type'));
    console.log('5. Here is the data it sent back:', payload.data);
    console.log('');
    console.log('That is the entire client/server cycle. Everything you build');
    console.log('for the next 11 weeks is a variation on these five steps.');
  } catch (error) {
    // The most likely cause: the page was opened straight from the file system
    // (file:///...) instead of through the server, so there is no API to call.
    console.warn('Could not reach the API:', error.message);
    console.warn('Are you running `npm start` and visiting http://localhost:3000 ?');
  }
})();
