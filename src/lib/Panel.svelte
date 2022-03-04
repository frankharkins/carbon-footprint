<script>
	export let width = "33%";
	export let min_width = "0";
</script>

<style>
	.panel {
		padding: 20px;
		border-radius: 5px;
		margin: 10px;
		float: left;
		box-shadow: 0 0 10px -1px lightgrey;
		background: white;
	}

	:global(p:first-child) {
		margin-top: 0;
	}

</style>

<div class="panel"
     style="width: calc({width} - 60px);
	    min-width: {min_width};"
>
	<slot></slot>
</div>

