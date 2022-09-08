<script>
  export let width = "33%";
  export let minWidth = "0";
  export let margin = "10px";
  export let onClick = () => void(0);
  export let state = 'active';
  export let notification = false;
</script>

<style>
  .panel {
    padding: 20px;
    border-radius: 5px;
    border: 1px solid lightgrey;
    float: left;
    box-shadow: 0 0 10px -1px lightgrey;
    background: white;

    transition-duration: 0.3s;
  }

  .notification {
    overflow: auto;
    max-height: 80vh;
  }

  .required {
    border: 1px solid orange;
    box-shadow: 0 0 25px -4px orange;
  }

  .hidden {
    opacity: 0.33;
    border: dashed 2px lightgrey;
    /* border: none; */
    box-shadow: none;
    background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 30%,
        #F3F3F3 30%,
        #F3F3F3 50%,
        transparent 50%
      );
    background-size: 10px 10px;
    background-opacity: 0.1;
  }

  .hidden :global(*) {
      opacity: 0;
  }

  :global(p:first-child) {
    margin-top: 0;
  }

</style>

<div class="panel {state} {notification ? 'notification' : ''}"
     style="width: calc({width} - 60px);
	    min-width: {minWidth};
	    margin: {margin}"
     on:click={onClick}>
  <slot></slot>
</div>

