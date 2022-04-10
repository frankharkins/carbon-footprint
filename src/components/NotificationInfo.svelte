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
	<p>We estimate the emissions per mile for each mode of transport and
	multiply it by the distance you enter (converting km to miles if needed).
	</p><p>
	For cars, we estimate ~0.35 kg CO2 per mile. This comes from the average <a href="https://www.carbonindependent.org/17.html">CO2 emissions per gallon</a>, divided by the <a href="https://www.nimblefins.co.uk/cheap-car-insurance/average-mpg">average miles per gallon in the UK</a>.
	</p><p>
	For buses and trains, we estimate ~0.1 kg CO2 per mile. We use the estimates from <a href="https://www.carbonindependent.org/20.html">this page</a> and <a href="https://www.carbonindependent.org/21.html">this page</a>.
	</p>
	<p>For planes, we estimate ~0.5 kg CO2 per mile. This comes from <a href="https://www.carbonindependent.org/22.html">Carbon Independent's estimate</a> estimate of 0.25 tonnes CO2 per hour flying. We estimate the average speed of a plane to be ~500 mph, which is how we convert between miles and hours.
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

