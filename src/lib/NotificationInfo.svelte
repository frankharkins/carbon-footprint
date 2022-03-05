<script>
	export let info = 'none';
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
{:else}
	<h2>Notification</h2>
	<p>We use this popup to show more information about the workings of this app.</p>
{/if}


