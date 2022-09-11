<script>
  import SvelteMarkdown from 'svelte-markdown';
  import Panel from './lib/Panel.svelte';
  export let content = 'No text specified.';
  export let closeButtonText = 'Close';

  function handleClick(event) {
    event.stopPropagation();
  };
	
</script>

<style>
  .centered {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<div class="centered">
  <Panel width="100%" onClick={handleClick} notification={true}>
    <SvelteMarkdown source={ content }/>
    <div style="text-align: right; font-size: 1.2em; cursor: pointer;"
         on:click={window.hidePopup}>
      { closeButtonText }
    </div>
  </Panel>
</div>
