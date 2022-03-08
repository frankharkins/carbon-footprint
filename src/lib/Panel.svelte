<script>
	export let width = "33%";
	export let min_width = "0";
	export let margin = "10px";
	export let on_click = () => void(0);
	export let state = 'active';
</script>

<style>
	.panel {
		padding: 20px;
		border-radius: 5px;
		border: 1px solid transparent;
		float: left;
		box-shadow: 0 0 10px -1px lightgrey;
		background: white;

		transition-duration: 0.3s;
	}

	.required {
		border: 1px solid orange;
		box-shadow: 0 0 25px -4px orange;
	}

	.hidden {
		opacity: 0;
	}

	:global(p:first-child) {
		margin-top: 0;
	}

</style>

<div class="panel {state}"
     style="width: calc({width} - 60px);
	    min-width: {min_width};
	    margin: {margin}"
     on:click={on_click}
>
	<slot></slot>
</div>

