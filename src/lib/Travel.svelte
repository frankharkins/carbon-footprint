<script>
	import Dropdown from './Dropdown.svelte';
	let distance_units = ['miles', 'km'];
	let transport_modes = [ // 'ratio' == CO2 per mile
		{ 'name': 'car',   'ratio': 0.28 },
		{ 'name': 'train', 'ratio': 0.07 },
		{ 'name': 'bus',   'ratio': 0.1 }
		];
	
	for (let i=transport_modes.length; i--;) {
		transport_modes[i].distance = 0;
		transport_modes[i].units = 'miles';
	};

	function get_carbon(transport_mode) {
		let distance = transport_mode.distance;
		if (transport_mode.units === 'km') {
			distance = distance * 0.62137;
		};
		return distance * transport_mode.ratio;
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
	<p>Number of <Dropdown bind:value={mode.units} options={distance_units}/> travelled by {mode.name} per week:</p>
	<input type='number' min='0' bind:value={mode.distance}>
{/each}
<p>Your travel emits ~{total_carbon.toFixed(2)}kg of co2 per week</p>
