<script>
	import Select from 'svelte-select';
	export let items = [0];
	export let value = options[0];

	function handleSelect(event) {
		value = event.detail;
	}
</script>

<Select {items} {value} on:select={handleSelect}></Select>
