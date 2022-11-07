<script>
  import { appState } from './state.js';
  import appContent from "./content.yaml";
  import MiniCalc from './components/MiniCalc.svelte'
  import Comparison from './components/Comparison.svelte'
  import Notification from './components/Notification.svelte'
  import AboutPanel from './components/AboutPanel.svelte'

  // Handle popup notifications
  const popup = {
      content: 'none',
      closeButtonText: 'Close',
      visible: false
  };

  window.showPopup = function(content, closeButtonText='Close') {
    popup.visible = true;
    popup.content = content;
    popup.closeButtonText = closeButtonText;
  };
  window.hidePopup = function() {
    popup.visible = false;
  };

  // Handle carbon calculations
  appContent.calculators.forEach( (calc) => calc["carbon"] = 0 );
  $: meterValue = appContent.calculators.reduce(
                             (partialSum, calc) => partialSum + calc.carbon, 0);
</script>

<style>
.app-container {
  max-width: var(--max-app-size);
  position: absolute;
  left: 0;
  right: 0;
  margin: auto auto;
}

.popup-overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  margin: -8px;
  display: flex;
  opacity: 0;
  visibility: hidden;
}

.popup-overlay-visible {
  visibility: visible;
  opacity: 1;
}

.notification-container {
    max-width: var(--max-app-size);
    margin: auto;
}

</style>

<main>
 <div class="app-container">
   <Comparison value={meterValue}/>
   {#each appContent.calculators as calc}
     <MiniCalc content={calc} bind:totalCarbon={calc.carbon}/>
  {/each}
  <AboutPanel content={appContent.aboutPanel}/>
 </div>
 <div class="popup-overlay {popup.visible ? 'popup-overlay-visible' : ''}"
   on:click={window.hidePopup}>
   <div class="notification-container">
     <Notification content={popup.content} closeButtonText={popup.closeButtonText}/>
   </div>
 </div>
</main>
