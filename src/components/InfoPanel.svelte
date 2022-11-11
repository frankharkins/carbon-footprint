<script>
import { appState } from '../state.js';
  import SvelteMarkdown from 'svelte-markdown';
  import Panel from './lib/Panel.svelte';
  export let content = 'No text specified.';
  export let hideUntil = '';

  let visible = false;
  $: visible = ($appState === hideUntil || visible);

  function handleClick(event) {
    event.stopPropagation();
  };
	
</script>

<style>
  .md-container {
    margin-bottom: 10px;
    float: left;
  }

</style>

<Panel onClick={handleClick} state={visible ? 'active' : 'hidden'} showFooter={false}>
  <div slot="front">
    <div class="md-container">
      <SvelteMarkdown source={ content }/>
    </div>
  </div>
</Panel>
