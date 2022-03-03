<script>
	import Dropdown from './Dropdown.svelte';
	import Panel from './Panel.svelte';
	export let total_carbon;
	
	// user can choose time period
	let time_units = [
		{ label: 'day',   value: 365 },
		{ label: 'week',  value: 52  },
		{ label: 'month', value: 12  },
		{ label: 'year',  value: 1   }
	];
	
	let selected_units = time_units[3];
	let carbon = 0;
	$: total_carbon = carbon * selected_units.value;
</script>
<Panel>
	<p>Enter additional emissions (in kg) per
	<Dropdown bind:value={selected_units} items={time_units}/>
	:</p>
	<input type='number' min='0' bind:value={carbon}>
</Panel>
