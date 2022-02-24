<script>
  import Travel from './lib/Travel.svelte'
  import ComparisonPanel from './lib/ComparisonPanel.svelte'

  let travel_carbon = 0;
  $: meter_value = travel_carbon/30;
</script>

<main>
<ComparisonPanel bind:value={meter_value}/>
<Travel bind:total_carbon={travel_carbon}/>
</main>
