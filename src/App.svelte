<script>
  import { appState } from './state.js';
  import Travel from './components/Travel.svelte'
  import Home from './components/Home.svelte'
  import Diet from './components/Diet.svelte'
  import Raw from './components/Raw.svelte'
  import Comparison from './components/Comparison.svelte'
  import Notification from './components/Notification.svelte'

  // Handle popup notifications
  let popup = false;
  let popup_info = 'none';

  window.showPopup = function(info) {
	popup = true;
	popup_info = info;
  };
  window.hidePopup = function() {
	popup = false;
  };

  // Handle carbon calculations
  let travel_carbon = 0;
  let home_carbon = 0;
  let diet_carbon = 0;
  let raw_carbon = 0;
  $: meter_value = (home_carbon + travel_carbon + diet_carbon + raw_carbon);
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');

:global(body) {
	font-family: 'Source Sans Pro', sans-serif;
}

.app-container {
	max-width: 1200px;
	position: absolute;
	left: 0;
	right: 0;
	margin: auto auto;
}

.popup {
	background: rgba(0, 0, 0, 0.4);
	position: fixed;
	width: 100%;
	height: 100%;
	margin: -8px;
}
</style>

<main>
	<div class="app-container">
		<Comparison value={meter_value}/>
		<Travel bind:total_carbon={travel_carbon}/>
		<Diet bind:total_carbon={diet_carbon}/>
		<Home bind:total_carbon={home_carbon}/>
		<Raw bind:total_carbon={raw_carbon}/>
	</div>
	<div class="popup"
	     style="display: {popup ? 'table' : 'none'};"
	     on:click={window.hidePopup}>
		<Notification info={popup_info} footprint={meter_value}/>
	</div>
</main>
