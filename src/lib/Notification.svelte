<script>
	import Panel from './Panel.svelte';
	import NotificationInfo from './NotificationInfo.svelte';
	export let info = 'none';
	
</script>

<style>
	
	.centered {
		display: table-cell;
		vertical-align: middle;
	}
</style>

<div class="centered">
<Panel width="80%" margin="10%">
	<NotificationInfo info="{info}"/>
</Panel>
</div>
