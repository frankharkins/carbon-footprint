<script>
	export let value = 30;
</script>

<style>
	div.meter-outer {
		width: 100%;
		height: 50px;
		border: 1px solid black;
	}

	div.meter-inner {
		height: 100%;
		background: blue;
		border-right: 1px solid black;
	}
</style>

<div class='meter-outer'>
	<div class='meter-inner' style='width: {value}%'></div>
</div>
