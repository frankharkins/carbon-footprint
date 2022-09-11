<script>
	import { appState, nextAppState } from '../../state.js';
        export let content;
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
		color: var(--black);
	}

	.about-button {
		color: grey;
		font-size: 0.8em;
	}
</style>

<div class="footer">
	<p>
		<span class="about-button" on:click={() => window.showPopup(content.about)}>About this panel</span>
		{#if $appState === content.name}
			<span on:click={nextAppState} class="next-button">Next</span>
		{/if}
	</p>
</div>
