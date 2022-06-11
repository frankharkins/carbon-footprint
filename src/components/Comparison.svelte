<script>
	import { appState } from '../state.js'
	import Panel from './lib/Panel.svelte'
	import Meter from './lib/Meter.svelte'
	export let value = 30;

	let max = 15000;
</script>

<style>
	div.top-sticky.hidden {
		display: none;
	}

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

<div class="top-sticky {($appState === 'Play') ? 'active' : 'hidden'}">
	<Panel width="100%">
		Your footprint:
		<Meter bind:value={value} max="{max}" disabled="true"/>
		UK average:
		<Meter value="10000" max="{max}" disabled="true"/>
	</Panel>
</div>
