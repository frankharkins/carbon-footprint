<script>
	import Dropdown from './Dropdown.svelte';
	import Panel from './Panel.svelte';
	export let total_carbon;
	
	// define choices user can select from
	let distance_units = [
		{ value: 'miles', label: 'miles' },
		{ value: 'km',    label: 'km'    }
	];
	let time_units = [
		{ label: 'day',   value: 365 },
		{ label: 'week',  value: 52  },
		{ label: 'month', value: 12  },
		{ label: 'year',  value: 1   }
	];
	let transport_modes = [ // 'value' == CO2 per mile
		{  label: 'car',   value: 0.28  },
		{  label: 'train', value: 0.07  },
		{  label: 'bus',   value: 0.1   }
	];
	for (let i=transport_modes.length; i--;) {
		transport_modes[i].distance = 0;
		transport_modes[i].units = distance_units[0];
		transport_modes[i].period = time_units[1];
	};

	// calculate carbon emissions (kg) and export
	function get_carbon(transport_mode) {
		let distance = transport_mode.distance;
		if (transport_mode.units.value === 'km') {
			distance = distance * 0.62137;
		};
		let per_year = distance * transport_mode.value;
		return per_year * transport_mode.period.value;
	};
	
	function sum_carbon(transport_modes) {
		let total = 0;
		for (var i=transport_modes.length; i--;) {
			total += get_carbon(transport_modes[i])
		};
		return total;
	};

	$: total_carbon = sum_carbon(transport_modes);
</script>
<Panel>
	{#each transport_modes as mode}
		<p>Number of
		<Dropdown bind:value={mode.units} items={distance_units}/>
		travelled by {mode.label} per
		<Dropdown bind:value={mode.period} items={time_units}/>
		:</p>
		<input type='number' min='0' bind:value={mode.distance}>
	{/each}
	<p>Your travel emits ~{total_carbon.toFixed(2)}kg of co2 per year</p>
</Panel>
