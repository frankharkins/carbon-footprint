<script>
  export let width = "33%";
  export let minWidth = "0";
  export let onClick = () => void(0);
  export let state = 'active';
  export let notification = false;
</script>

<style>
  .panel {
    padding: 20px;
    margin: 10px;
    border-radius: 5px;
    border: 1px solid var(--light-grey);
    float: left;
    box-shadow: 0 0 10px -1px var(--light-grey);
    background: white;
    transition-duration: 0.3s;
  }

  .notification {
    overflow: auto;
    box-shadow: none;
    max-height: 80vh;
  }

  .required {
    border: 1px solid var(--highlight-color);
    box-shadow: 0 0 25px -4px var(--highlight-color);
  }

  .hidden {
    opacity: 0.5;
    border: dashed 2px var(--light-grey);
    margin: 9px;
    box-shadow: none;
    background: var(--stripes-gradient);
    background-size: var(--stripes-bg-size);
  }

</style>

<div class="panel {state} {notification ? 'notification' : ''}"
     style="width: calc({width} - 60px);
            min-width: {minWidth};
            max-width: var(--max-app-size);"
     on:click={onClick}>
  <slot></slot>
</div>

