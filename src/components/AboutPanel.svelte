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
    margin-bottom: 10px;
    float: left;
  }

  img {
    max-height: 1.2em;
    margin-bottom: 10px;
    float: right;
  }

</style>

<Panel onClick={handleClick} state='active' showFooter={false}>
  <div slot="front">
    <div class="md-container">
      <SvelteMarkdown source={ content.description }/>
    </div>
    <a href="{ content.githubLink }">
      <img title="View source on GitHub"
           alt="Link to source code on GitHub."
           src="images/gh-logo.png">
    </a>
  </div>
</Panel>
