<script>
	export let width = "33%";
	export let min_width = "0";
	export let margin = "10px";
</script>

<style>
	.panel {
		padding: 20px;
		border-radius: 5px;
		float: left;
		box-shadow: 0 0 10px -1px lightgrey;
		background: white;
	}

	:global(p:first-child) {
		margin-top: 0;
	}

	:global(div.footer > p) {
		color: grey;
		font-size: 0.8em;
		margin-bottom: 0px;
		cursor: pointer;
	}

</style>

<div class="panel"
     style="width: calc({width} - 60px);
	    min-width: {min_width};
	    margin: {margin}"
>
	<slot></slot>
</div>

