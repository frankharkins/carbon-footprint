<script>
	import Meter from './lib/Meter.svelte';
	export let info = 'none';
	export let carbon = 0;
	let uk_average = 10000;
	let world_average = 4000;
	
	$: max_carbon = Math.max(carbon, uk_average)*1.2;

</script>

{#if (info === 'travel')}
	<h2>How do we calculate travel emissions?</h2>
	<p>We estimate car emissions from
	<a href="https://www.carbonindependent.org/17.html">this page</a>,
	bus emissions from
	<a href="https://www.carbonindependent.org/20.html">this page</a>,
	and train emissions from
	<a href="https://www.carbonindependent.org/21.html">this page</a>
	</p>

{:else if (info === 'diet')}
        <h2>How did we calculate this?</h2>
        <p>We used the mean CO2 equivalent emissions from
        <a href='https://www.researchgate.net/publication/325532198_Reducing_food%27s_environmental_impacts_through_producers_and_consumers'>this paper.</a>
        </p>

{:else if (info === 'raw')}
        <h2>What is this panel?</h2>
        <p>Use this panel to input raw emissions (in CO2 equivalent) from any cases we missed out.
        </p>

{:else if (info === 'comparison')}
	<h1 style="margin-top: 0 ;">Results</h1>
	<p>According to our calculator, your lifestyle contributes ~{(carbon/1000).toFixed(1)} tonnes of CO2 per year.
	The UK average is currently ~10 tonnes, and the world average is ~4 tonnes.</p>
	<br>
	Your footprint:
	<Meter value={carbon} max="{max_carbon}" disabled="true"/>
	UK average:
	<Meter value={uk_average} max="{max_carbon}" disabled="true"/>
	World average:
	<Meter value={world_average} max="{max_carbon}" disabled="true"/>
	<p></p>
	<br>
	<p>
	When you're ready, click 'play' to see how adjusting your lifestyle affects your footprint.
	It's hard to remember to do lots of small things, so try to find three things you can realistically change that have the biggest impact.
	</p>

{:else}
	<h2>Notification</h2>
	<p>We use this popup to show more information about the workings of this app.</p>
{/if}

<br>
<div style="text-align: right; font-size: 1.2em; cursor: pointer;"
     on:click={window.hidePopup}>{(info === 'comparison') ? "Play" : "Close"}</div>

