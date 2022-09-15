<script>
	export let disabled = false;
	export let value = 30;
	export let max = 1000;

    $: meterPct = (100*value/max).toString() + "%";
    let initialValue = value;
</script>

<style>
	div.meter-container {
		width: 100%;
	}

    /* There's a lot of css here to handle different browsers; see
    https://www.smashingmagazine.com/2021/12/create-custom-range-input-consistent-browsers
    for details. */

    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      padding: 12px 0;  /* Make clickable area bigger (for touch devices) */
      width: 100%;
    }

    input[type="range"]:focus {
      outline: none;
    }

    /* For chrome, ie, safari */
    input[type="range"]::-webkit-slider-runnable-track {
      background: linear-gradient(
        to right,
        var(--black) var(--meter-value),
        var(--light-grey) var(--meter-value)
      );
      height: 5px;
    }

    input[type="range"]::-webkit-slider-thumb {
       -webkit-appearance: none;
       appearance: none;
       margin-top: -5px;
       background-color: var(--black);
       height: 15px;
       width: 5px;
    }

    input[type="range"]:focus::-webkit-slider-thumb {
      outline: 2px solid var(--light-blue);
      outline-offset: 1px;
    }

    /* for firefox */
    input[type="range"]::-moz-range-track {
      background: linear-gradient(
        to right,
        var(--black) var(--meter-value),
        var(--light-grey) var(--meter-value)
      );
      height: 5px;
    }

    input[type="range"]::-moz-range-thumb {
      border: none;
      border-radius: 0;
      background-color: var(--black);
      height: 15px;
      width: 5px;
    }

    input[type="range"]:focus::-moz-range-thumb {
      outline: 2px solid var(--light-blue);
      outline-offset: 1px;
    }

</style>

<div class='meter-container' style='--meter-value: {meterPct}'>
	<input type="range"
	       min="0"
	       max="{max}"
	       bind:value="{value}"
	       class="meter"
	       disabled={disabled}
	       style="{disabled ? '' : 'cursor: pointer;'}"
	       >

</div>
