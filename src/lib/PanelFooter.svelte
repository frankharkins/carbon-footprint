<script>
	import { getContext } from 'svelte';
	export let name = 'none';

	let appStateNum = getContext('appStateNum')
	$: state = getContext('appStatesList')[ $appStateNum ];

	function handleClick(event) {
		appStateNum.update( x => x + 1);
	};
</script>

<style>
	p {
		margin-bottom: 0px;
		margin-top: 20px;
	}

	span {
		cursor: pointer;
	}

	.next-button {
		float: right;
		color: black;
	}

	.about-button {
		color: grey;
		font-size: 0.8em;
	}
</style>

<div class="footer">
	<p>
		<span class="about-button" on:click={() => window.showPopup(name)}>About this panel</span>
		{#if state === name}
			<span on:click={handleClick} class="next-button">Next</span>
		{/if}
	</p>
</div>
