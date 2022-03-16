<script>
	import Panel from '../lib/Panel.svelte';
	import NotificationInfo from './NotificationInfo.svelte';
	export let info = 'none';
	export let footprint = 0;
	
	function handleClick(event) {
		event.stopPropagation();
	};
	
</script>

<style>
	
	.centered {
		display: table-cell;
		vertical-align: middle;
	}
</style>

<div class="centered">
<Panel width="80%" margin="10%" on_click={handleClick}>
	<NotificationInfo info={info} carbon={footprint}/>
</Panel>
</div>
