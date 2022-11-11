<script>
  import { appState } from './state.js';
  import appContent from "./content.yaml";
  import MiniCalc from './components/MiniCalc.svelte'
  import Comparison from './components/Comparison.svelte'
  import Notification from './components/Notification.svelte'
  import InfoPanel from './components/InfoPanel.svelte'
  import AboutPanel from './components/AboutPanel.svelte'

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

:global(h1 {
    font-size: 1em;
    margin-top: 0;
})

</style>

<main>
 <div class="app-container">
   <Comparison value={meterValue}/>
   {#each appContent.calculators as calc}
     <MiniCalc content={calc} bind:totalCarbon={calc.carbon}/>
   {/each}
  <InfoPanel content={appContent.completionInstructions} hideUntil='Play'/>
  <AboutPanel content={appContent.aboutPanel}/>
 </div>
</main>
