<script>
	import Dropdown from './Dropdown.svelte';
	export let total_carbon;
	let distance_units = ['miles', 'km'];
	let time_units = { 'day': 365,
			   'week': 52,
			   'month': 12,
			   'year': 1 };
	let transport_modes = [ // 'ratio' == CO2 per mile
		{ 'name': 'car',   'ratio': 0.28 },
		{ 'name': 'train', 'ratio': 0.07 },
		{ 'name': 'bus',   'ratio': 0.1 }
		];
	
	for (let i=transport_modes.length; i--;) {
		transport_modes[i].distance = 0;
		transport_modes[i].units = 'miles';
		transport_modes[i].period = 'week';
	};

	function get_carbon(transport_mode) {
		let distance = transport_mode.distance;
		if (transport_mode.units === 'km') {
			distance = distance * 0.62137;
		};
		let per_year = distance * transport_mode.ratio;
		return per_year * time_units[transport_mode.period];
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

{#each transport_modes as mode}
	<p>Number of
	<Dropdown bind:value={mode.units} options={distance_units}/>
	travelled by {mode.name} per
	<Dropdown bind:value={mode.period} options={Object.keys(time_units)}/>
	:</p>
	<input type='number' min='0' bind:value={mode.distance}>
{/each}
<p>Your travel emits ~{total_carbon.toFixed(2)}kg of co2 per year</p>
