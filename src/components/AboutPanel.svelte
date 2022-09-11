<script>
  import SvelteMarkdown from 'svelte-markdown';
  import Panel from './lib/Panel.svelte';
  export let content = 'No text specified.';

  function handleClick(event) {
    event.stopPropagation();
  };
	
</script>

<style>
  .centered {
    display: table-cell;
    vertical-align: middle;
  }
</style>

<Panel onClick={handleClick} notification={true}>
  <SvelteMarkdown source={ content }/>
</Panel>
