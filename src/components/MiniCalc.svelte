<script>
  import { appState } from '../state.js';
  import Panel from './lib/Panel.svelte';
  import PanelFooter from './lib/PanelFooter.svelte';
  import Dropdown from './lib/Dropdown.svelte';
  import NumberInput from './lib/NumberInput.svelte';
  export let content;
  export let totalCarbon;
  let minWidth = "300px";
  let unlocked = false;
  let variables = content.variables;

  function getPanelState(appState) {
    if (appState === content.name) {
      unlocked = true;
      return 'required';
    } else if (unlocked) {
      return 'active';
      } else {
      return 'hidden';
    }
  };
  
  $: panelState = getPanelState($appState);

  // This stuff should be in another file
  function getUnit ( name ) {
    const units = {
      // distance (default is km)
      miles: 1.61,
      km: 1,
      // time (default is year)
      day: 365,
      week: 52,
      month: 12,
      year: 1,
      // mass (default is grams)
      grams: 1,
      ounces: 28.3
    };
    
    return { label: name, value: units[name] }
  }

  function parseLabel ( label ) {
      // identifies parts of string as dropdowns or plaintext
      const splitLabel = label.split(/(\[.*?\])/g);
      const labelData = [];
      for (let i=0; i < splitLabel.length; i++) {
        let chunk = splitLabel[i];
        if (chunk.includes('[')) {
            // chunk is a unit (need a dropdown)
            chunk = chunk.replace(/[\[\]\s]/g, '');
            chunk = chunk.split('|');
            let units = [];
            for (let u=0; u < chunk.length; u++) {
              units.push(getUnit(chunk[u]))
            }
            labelData.push({
                type: 'dropdown',
                selectedUnit: units[0],
                units: units
              })
        } else {
            labelData.push({
                type: 'text',
                value: chunk
          })
        }
      }
      return labelData;
    }

  function calculateCarbon ( variables ) {
    let totalCarbon = 0;
    for (let v=variables.length; v--;) {
      let unitConversion = 1;
      let labelData = variables[v].labelData;
      for (let i=labelData.length; i--;) {
        let chunk = labelData[i];
        if (chunk.type === 'dropdown') {
            unitConversion *= chunk.selectedUnit.value;
        }
      }
      totalCarbon += variables[v].value * variables[v].kgco2pu * unitConversion;
    }
    return totalCarbon;
  }
  
  // This stuff should stay in the component
  for (let v=0; v < variables.length; v++){
    variables[v].labelData = parseLabel(variables[v].label)
  }
  $: totalCarbon = calculateCarbon(variables);
</script>

<Panel state={panelState} minWidth={minWidth}>
  {#each variables as variable}
    <p>
    {#each variable.labelData as l}
      {#if l.type === 'dropdown'}
        <Dropdown bind:value={l.selectedUnit}
                  items={l.units}/>
      {:else}
        {l.value}
      {/if}
    {/each}
    </p>
    {#if variable.type === 'number' }
      <NumberInput bind:value={variable.value}
                  minmax_value={variable.minmax}/>
    {/if}
  {/each}
  <p>{ content.summary.replace('%', Math.round(totalCarbon.toString())) }</p>
  <PanelFooter content={content}/>
</Panel>
