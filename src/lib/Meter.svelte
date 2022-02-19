<script>
	// TODO:
	// - Make compatible with chrome & ie
	export let value = 30;
</script>

<style>
	div.meter-container {
		width: 100%;
	}

	input.meter {
		-webkit-appearance: none;
		width: 100%;
		height: 5px;
		background: black;
		-webkit-transition: .2s;
	}

	input.meter::-moz-range-thumb {
		width: 5px;
		height: 15px;
		background: black;
		border: none;
		border-radius: 0;
	}

	input.meter::-moz-range-progress {
		background: black;
		height: 5px;
		border: none;
	}

	input.meter::-moz-range-track {
		background: lightgrey;
		height: 5px;
		border: 1px solid white;
	}
</style>

<div class='meter-container'>
	<input type="range" min="0" max="1000" value="{value*10}" class="meter" disabled="true">
</div>
