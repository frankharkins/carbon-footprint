<script>
  import SvelteMarkdown from 'svelte-markdown';
  import Panel from './lib/Panel.svelte';
  export let content = 'No text specified.';

  function handleClick(event) {
    event.stopPropagation();
  };
	
</script>

<style>
  .md-container {
    margin-bottom: 12px;
  }

</style>

<Panel onClick={handleClick} state='info'>
  <div class="md-container">
    <SvelteMarkdown source={ content }/>
  </div>
</Panel>
