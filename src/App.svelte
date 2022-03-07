<script>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import Travel from './lib/Travel.svelte'
  import Diet from './lib/Diet.svelte'
  import Raw from './lib/Raw.svelte'
  import ComparisonPanel from './lib/ComparisonPanel.svelte'
  import Notification from './lib/Notification.svelte'

  // Handle app state (todo: find a way to put this in an object)
  const appState = writable(0);
  setContext('appState', appState);
  const appStatesList = ['travel', 'diet', 'raw', 'play'];
  setContext('appStatesList', appStatesList);

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
  let diet_carbon = 0;
  let raw_carbon = 0;
  $: meter_value = (travel_carbon + diet_carbon + raw_carbon);
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
		<ComparisonPanel bind:value={meter_value}/>
		<Travel bind:total_carbon={travel_carbon}/>
		<Diet bind:total_carbon={diet_carbon}/>
		<Raw bind:total_carbon={raw_carbon}/>
	</div>
	<div class="popup"
	     style="display: {popup ? 'table' : 'none'};"
	     on:click={window.hidePopup}>
		<Notification info="{popup_info}"/>
	</div>
</main>
