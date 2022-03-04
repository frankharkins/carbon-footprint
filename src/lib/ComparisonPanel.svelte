<script>
	import Panel from './Panel.svelte'
	import Meter from './Meter.svelte'
	export let value = 30;
	let max = 150000;
</script>

<style>
	div.top-sticky {
		position: -webkit-sticky;
		position: sticky;
		top: 0;
	}

	div.top-sticky:after {
		content: "";
		display: table;
		clear: both;
	}
</style>

<div class="top-sticky">
	<Panel width="100%">
		Your footprint:
		<Meter bind:value={value} max="{max}"/>
		UK average:
		<Meter value="10000" max="{max}"/>
	</Panel>
</div>
