<script>
  import Travel from './lib/Travel.svelte'
  import Meter from './lib/Meter.svelte'

  let travel_carbon = 0;
  $: meter_value = travel_carbon/30;
</script>

<main>
<Meter bind:value={meter_value}/>
<Travel bind:total_carbon={travel_carbon}/>
</main>
