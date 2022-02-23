<script>
	export let items = {label: "No values specified", value: 1};
	export let value = items[0];

	function handleSelect(item) {
		value = item;
		console.log(value);
	}
</script>

<style>
	.dropdown {
		display: inline-block;
		cursor: pointer;
		border-bottom: 1px solid black;
	}

	.menu {
		visibility: hidden;
		position: absolute;
		padding: 2px;
		background: white;
		cursor: pointer;
	}

	.item {
		border-bottom: 1px solid white;
	}

	.item:hover {
		border-bottom: 1px solid black;
	}

	.dropdown:hover {
		border-bottom: 1px solid white;
	}

	.dropdown:hover > .menu {
		visibility: visible;
	}

</style>

<span class="dropdown">
	{value.label}
	<div class="menu">
		{#each items as item}
			{#if item != value}
				<div class="item" on:click={handleSelect(item)}>{item.label}</div>
			{/if}
		{/each}
	</div>
</span>
