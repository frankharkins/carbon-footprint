<script>
	import { appState } from '../state.js';
	import Meter from './Meter.svelte';
	export let value = 0;
	let finalValue = 0;
		
	function incValue(event) {
		value = value + 5;
	};
	
	function decValue(event) {
		if (value > 5) {
			value = value - 5;
		}
		else {
			value = 0;
		}
	};
	
	function getFinalValue(state) {
		if (state === 'play' && finalValue === 0) {
			finalValue = value;
		}
	};
	
	$: getFinalValue($appState);
</script>

<style>
	input[type=number] {
		-moz-appearance: textfield;
	}

	input[type=number]::-webkit-inner-spin-button,
	input[type=number]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.input-container {
		height: 1.55em;
		width: 10em;
		border: 1px solid lightgrey;
		padding-top: 5px;
		user-select: none;
	}

	input[type=number] {
		border: none;
		text-align: right;
		width: 9em;
		padding-right: 5px;
	}

	.input-buttons {
		cursor: pointer;
	}

	.input-buttons:active {
		color: lightgrey;
	}

	input:focus {
		outline: 0;
	}
</style>

{#if ($appState === 'play')}
<div style="width: 100%; touch-action: none;">
	<span style="margin-left: 10px">{value}</span>
	<Meter max="{(finalValue < 0.1) ? 100 : finalValue*1.5}" bind:value={value} disabled={false}/>
</div>
{:else}
<div class="input-container">
	<input type="number" min="0" bind:value={value}>
	<span class="input-buttons" on:click={incValue}>+</span> <span class="input-buttons" on:click={decValue}>−</span>
</div>
{/if}
