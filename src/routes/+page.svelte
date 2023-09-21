<script>
    // updated to use +page.server.js to load data for a load function that should always run on the server
    // see https://kit.svelte.dev/docs/load#page-data
    
	// make the data returned by +page.server.js available to the page
    // see https://kit.svelte.dev/docs/routing#page-page-server-js
    export let data
</script>

<h1>Airtable API Demo</h1>
<table>
	<thead>
		<tr>
			{#each Object.keys(data.airtableRecords[0]) as columnName}
				<th>{columnName}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each Object.values(data.airtableRecords) as row}
			<tr>
				{#each Object.values(row) as cell}
					<td>{cell}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>