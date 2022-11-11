<script>
  import { appState } from '../state.js';
  import { getUnit } from '../utils.js';
  import SvelteMarkdown from 'svelte-markdown';
  import Panel from './lib/Panel.svelte';
  import Dropdown from './lib/Dropdown.svelte';
  import NumberInput from './lib/NumberInput.svelte';
  export let content;
  export let totalCarbon;
  let panel = {
    minWidth: "300px",
    state: 'hidden',
    unlocked: false,
    updateState: function (appState) {
      if (appState === content.name) {
        this.unlocked = true;
        this.state = 'required';
        return this;
      } else if (this.unlocked) {
        this.state = 'active';
        return this;
      } else {
        this.state = 'hidden';
        return this;
      }
    },
  }
  
  $: panel = panel.updateState($appState);


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
  
  for (let v=0; v < content.variables.length; v++){
    content.variables[v].labelData = parseLabel(content.variables[v].label)
  }
  $: totalCarbon = calculateCarbon(content.variables);
</script>

<style>
  p {
      margin: 0;
  }
</style>

<Panel state={panel.state} name={content.name}>
  <div slot="front">
    {#each content.variables as variable}
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
      {#if $appState === 'Play'}
          <span style="float: right;">{variable.value}</span>
      {/if}
      </p>
      {#if variable.type === 'number' }
        <NumberInput bind:value={variable.value}
                    minmax_value={variable.minmax}/>
      {/if}
    {/each}
    <p>{ content.summary.replace('%', Math.round(totalCarbon.toString())) }</p>
  </div>
  <div slot="back" >
    <SvelteMarkdown source={ content.about }/>
  </div>
</Panel>
