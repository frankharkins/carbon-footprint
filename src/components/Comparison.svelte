<script>
	import { appState } from '../state.js'
	import Panel from './lib/Panel.svelte'
	import Meter from './lib/Meter.svelte'
	export let value = 30;

  const ukAverage = 10000;
	$: meterMax = Math.max(ukAverage*1.5, value);
</script>

<style>
	div.top-sticky {
		position: -webkit-sticky;
		position: sticky;
		top: 0;
        z-index: 1000;
        max-width: var(--max-app-size);
	}

	div.top-sticky:after {
		content: "";
		display: table;
		clear: both;
	}
</style>

<div class="top-sticky {($appState === 'Play') ? 'active' : 'hidden'}">
  {#if $appState === 'Play' }
    <Panel topSticky={true} showFooter={false}>
      <div slot="front">
        Your footprint (~{Math.round((value/1000)).toString()} tonnes of CO2 per year):
        <Meter bind:value={value} max="{meterMax}" disabled={true}/>
        UK average (~{ukAverage/1000} tonnes of CO2 per year):
        <Meter value={10000} max="{meterMax}" disabled={true}/>
      </div>
	  </Panel>
  {/if}
</div>
