import {  json } from '@sveltejs/kit';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } from '$env/static/private';
import Airtable from 'airtable';

// leaving this here though we are not using it in our main +page.svelte anymore as an example 
// of how you could stand up an api endpoint in svelte if you wanted too
// for example, if you wanted others to be able to request the data from an api you provide
// the logic is the pretty much the same as in +page.server.js
// except that here we return the data as a json response
export async function GET() {
	var base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE_ID);

	const data = [];

	try {
		const airtablePromise = base(AIRTABLE_TABLE_NAME).select({
			view: "Grid view"
		}).eachPage(function page(records, fetchNextPage) {
			// This function (`page`) will get called for each page of records.
	
			records.forEach(function(record) {
				data.push(record.fields);
			});
	
			// To fetch the next page of records, call `fetchNextPage`.
			// If there are more records, `page` will get called again.
			// If there are no more records, `done` will get called.
			fetchNextPage();
		})

		await airtablePromise;
	} catch (err) {
		if (err) {
			console.error(err);
		}
	}

	return new json(data);
}