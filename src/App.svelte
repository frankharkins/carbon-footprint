<script>
  import { appState } from './state.js';
  import appContent from "./content.yaml";
  import MiniCalc from './components/MiniCalc.svelte'
  import Comparison from './components/Comparison.svelte'
  import Notification from './components/Notification.svelte'
  import AboutPanel from './components/AboutPanel.svelte'

  // Handle popup notifications
  const popup = {};
  popup.content = 'none';
  popup.closeButtonText = 'Close';
  popup.visible = false;

  window.showPopup = function(content, closeButtonText='Close') {
    popup.visible = true;
    popup.content = content;
    popup.closeButtonText = closeButtonText;
  };
  window.hidePopup = function() {
    popup.visible = false;
  };

  // Handle carbon calculations
  const carbonContributions = new Array(appContent.calculators.length).fill(0);
  $: meterValue = carbonContributions.reduce((partialSum, a) => partialSum + a, 0);
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
   <Comparison value={meterValue}/>
   {#each Array(appContent.calculators.length) as _, i}
     <MiniCalc content={appContent.calculators[i]} bind:totalCarbon={carbonContributions[i]}/>
  {/each}
  <AboutPanel content={appContent.aboutPanel}/>
 </div>
 <div class="popup"
   style="display: {popup.visible ? 'table' : 'none'};"
   on:click={window.hidePopup}>
   <Notification content={popup.content} closeButtonText={popup.closeButtonText}/>
 </div>
</main>
