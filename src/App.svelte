<script>
  import Travel from './lib/Travel.svelte'
  import Diet from './lib/Diet.svelte'
  import Raw from './lib/Raw.svelte'
  import ComparisonPanel from './lib/ComparisonPanel.svelte'

  let travel_carbon = 0;
  let diet_carbon = 0;
  let raw_carbon = 0;
  $: meter_value = (travel_carbon + diet_carbon + raw_carbon);
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');

:global(body) {
	font-family: 'Source Sans Pro', sans-serif;
}

.app-container {
	max-width: 1200px;
	position: absolute;
	left: 0;
	right: 0;
	margin: auto auto;
}
</style>

<main>
	<div class="app-container">
		<ComparisonPanel bind:value={meter_value}/>
		<Travel bind:total_carbon={travel_carbon}/>
		<Diet bind:total_carbon={diet_carbon}/>
		<Raw bind:total_carbon={raw_carbon}/>
	</div>
</main>
