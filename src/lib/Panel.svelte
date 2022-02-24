<script>
	export let width = 400;
</script>

<style>
	.panel {
		padding: 20px;
		border: 1px solid black;
		border-radius: 5px;
	}

</style>

<div class="panel" style="max-width: {width}px">
	<slot></slot>
</div>

