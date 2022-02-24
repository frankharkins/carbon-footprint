<script>
	export let value = 30;
	import Panel from './Panel.svelte'
	import Meter from './Meter.svelte'
</script>

<Panel width="1200">
	Your footprint:
	<Meter bind:value={value}/>
	UK average:
	<Meter value="30"/>
</Panel>
