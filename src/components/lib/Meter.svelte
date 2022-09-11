<script>
	// TODO:
	// - Make compatible with chrome & ie
	export let disabled = false;
	export let value = 30;
	export let max = 1000;
</script>

<style>
	div.meter-container {
		width: 100%;
	}

	input.meter {
		-webkit-appearance: none;
		width: 100%;
		height: 5px;
		background: var(--black);
		-webkit-transition: .2s;
	}

	input.meter::-moz-range-thumb {
		width: 5px;
		height: 15px;
		background: var(--black);
		border: none;
		border-radius: 0;
	}

	input.meter::-moz-range-progress {
		background: var(--black);
		height: 5px;
		border: none;
	}

	input.meter::-moz-range-track {
		background: var(--light-grey);
		height: 5px;
		border: 1px solid white;
	}
</style>

<div class='meter-container'>
	<input type="range"
	       min="0"
	       max="{max}"
	       bind:value="{value}"
	       class="meter"
	       disabled={disabled}
	       style="{disabled ? '' : 'cursor: pointer;'}"
	       >

</div>
