<script>
	import Panel from './Panel.svelte';
	import NotificationInfo from './NotificationInfo.svelte';
	export let info = 'none';
	
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
	<NotificationInfo info="{info}"/>
</Panel>
</div>
