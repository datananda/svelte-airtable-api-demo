import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } from '$env/static/private';
import Airtable from 'airtable';
import { error } from '@sveltejs/kit';

export async function load() {
    const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE_ID);

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
		throw error(err.statusCode, `Something went wrong trying to fetch data from airtable. ${err.error}: ${err.message}`)
	}

	return {
        airtableRecords: data
    }
}