<script>
	import Dropdown from './lib/Dropdown.svelte';
	import NumberInput from './lib/NumberInput.svelte';
	import MiniCalcWrapper from './lib/MiniCalcWrapper.svelte';
	export let total_carbon;
	
	// define choices user can select from
	let time_units = [
		{ label: 'day',   value: 365 },
		{ label: 'week',  value: 52  },
		{ label: 'month', value: 12  },
		{ label: 'year',  value: 1   }
	];
	let energy_sources = [ // 'value' == CO2 per mile
		{  label: 'electric',   value: 0.31 },
		{  label: 'gas', value: 0.2  },
	];
	for (let i=energy_sources.length; i--;) {
		energy_sources[i].period = time_units[2];
		energy_sources[i].amount = 0;
	};

	// calculate carbon emissions (kg) and export
	function get_carbon(energy_source) {
		return energy_source.amount * energy_source.value * energy_source.period.value;
	};
	
	function sum_carbon(energy_sources) {
		let total = 0;
		for (var i=energy_sources.length; i--;) {
			total += get_carbon(energy_sources[i])
		};
		return total;
	};

	$: total_carbon = sum_carbon(energy_sources);
</script>

<MiniCalcWrapper name="home" min_width="300px">
	{#each energy_sources as mode}
		<p>
		kWh of {mode.label} per
		<Dropdown bind:value={mode.period} items={time_units}/>:
		</p>
		<NumberInput bind:value={mode.amount}/>
	{/each}
	<p>Your household energy usage emits ~{total_carbon.toFixed(2)}kg of co2 per year</p>
</MiniCalcWrapper>
