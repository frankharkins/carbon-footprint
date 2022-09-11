<script>
  import { appState } from '../state.js';
  import { getUnit } from '../utils.js';
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


  function parseLabel ( labelStr ) {
      // identifies parts of string as dropdowns or plaintext
      // e.g.: identify distance dropdown in:
      //'[ km | miles ] travelled by car per...'

      const splitLabel = labelStr.split(/(\[.*?\])/g)  // Split on square brackets
                                 .filter(Boolean);  // Remove empty strings
      const label = [];
      splitLabel.forEach(function (labelSegment, labelIndex) {
        if (labelSegment.includes('[')) {
            // labelSegment is a unit (need a dropdown)
            labelSegment = labelSegment.replace(/[\[\]\s]/g, '');
            let units = [];
            labelSegment.split('|').forEach(function (unit, index) {
              units.push(getUnit(unit))
            })
            label.push({
                type: 'dropdown',
                selectedUnit: units[0],
                units: units,
                capitalize: (labelIndex === 0)
              })
        } else {
            label.push({
                type: 'text',
                value: labelSegment
          })
        }
      })
      return label;
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

<Panel state={panelState}>
  {#each variables as variable}
    <p>
    {#each variable.labelData as l}
      {#if l.type === 'dropdown'}
        <Dropdown bind:value={l.selectedUnit}
                  items={l.units}
                  capitalize={l.capitalize}/>
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
