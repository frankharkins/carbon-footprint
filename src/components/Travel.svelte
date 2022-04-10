<script>
	import Dropdown from './lib/Dropdown.svelte';
	import NumberInput from './lib/NumberInput.svelte';
	import MiniCalcWrapper from './lib/MiniCalcWrapper.svelte';
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
		{  label: 'car',   value: 0.3  },
		{  label: 'bus and/or train', value: 0.1  },
		{  label: 'plane', value: 0.5   }
	];
	for (let i=transport_modes.length; i--;) {
		let mode = transport_modes[i];
		mode.distance = 0;
		mode.allowed_units = distance_units;
		if (mode.label === 'plane') {
			mode.allowed_units =
				[{ value: 'hours', label: 'hours' }].concat(mode.allowed_units);
		};
		mode.units = mode.allowed_units[0];
		mode.period = time_units[(mode.label==='plane') ? 3 : 1];
		console.log(mode);
	};

	// calculate carbon emissions (kg) and export
	function get_carbon(transport_mode) {
		let distance = transport_mode.distance;
		if (transport_mode.units.value === 'km') {
			distance = distance * 0.62137;
		}
		else if (transport_mode.units.value === 'hours') {
			// only for plane travel
			distance = distance * 500;
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

<MiniCalcWrapper name="travel" min_width="300px">
	{#each transport_modes as mode}
		<p>
		<Dropdown bind:value={mode.units}
			  items={mode.allowed_units}
			  capitalize={true}/>
		travelled by {mode.label} per
		<Dropdown bind:value={mode.period}
			  items={time_units}/>:
		</p>
		<NumberInput bind:value={mode.distance}
			     minmax_value={30}/>
	{/each}
	<p>Your travel emits ~{Math.round(total_carbon)}kg of co2 per year</p>
</MiniCalcWrapper>
