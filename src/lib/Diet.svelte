<script>
	import Dropdown from './Dropdown.svelte';
	import NumberInput from './NumberInput.svelte';
	import MiniCalcWrapper from './MiniCalcWrapper.svelte';
	export let total_carbon;
	
	// define choices user can select from
	let mass_units = [
		{ value: 'grams',  label: 'grams'  },
		{ value: 'ounces', label: 'ounces' }
	];
	let time_units = [
		{ label: 'day',   value: 365 },
		{ label: 'week',  value: 52  },
		{ label: 'month', value: 12  },
		{ label: 'year',  value: 1   }
	];
	let food_types = [ // 'value' == GHG per 100g
		{ label: 'beef',   value: 0.26*50/100 },
		{ label: 'cheese', value: 0.25*11/100 },
		{ label: 'tofu',   value:   0.8*2/100 }
	];
	for (let i=food_types.length; i--;) {
		food_types[i].mass = 0;
		food_types[i].units = mass_units[0];
		food_types[i].period = time_units[1];
	};

	// calculate carbon emissions (kg) and export
	function get_carbon(food_type) {
		let mass = food_type.mass;
		if (food_type.units.value === 'ounces') {
			mass = mass * 28.35;
		};
		let per_year = mass * food_type.value;
		return per_year * food_type.period.value;
	};
	
	function sum_carbon(food_types) {
		let total = 0;
		for (var i=food_types.length; i--;) {
			total += get_carbon(food_types[i])
		};
		return total;
	};

	$: total_carbon = sum_carbon(food_types);
</script>
<MiniCalcWrapper name="diet" min_width="270px">
	{#each food_types as food}
		<p>
		<Dropdown bind:value={food.units} items={mass_units} capitalize={true}/>
		of {food.label} bought per
		<Dropdown bind:value={food.period} items={time_units}/>
		:</p>
		<NumberInput bind:value={food.mass}/>
	{/each}
	<p>Your diet emits ~{total_carbon.toFixed(2)}kg of co2 per year</p>
</MiniCalcWrapper>
