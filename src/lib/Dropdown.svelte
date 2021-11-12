<script>
	export let options = [0];
	export let value = options[0];
</script>


<select bind:value={value}>
	{#each options as opt}
	<option value='{opt}'>
		{opt}	
	</option>
	{/each}
</select>
