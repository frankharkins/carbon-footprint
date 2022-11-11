<script>
  import { appState, nextAppState } from '../../state.js';
  export let state = 'active';
  export let topSticky = false;
  export let name = '';
  export let showFooter = true;
  let frontSide = true;

  function flipPanel() {
      frontSide = !frontSide;
  }

</script>

<style>
  .panel-container {
    perspective: 1200px;
    transform-style: preserve-3d;
    float: left;
    position: relative;
    width: 33%;
  }

  @media screen and (max-width: 900px) {
      .panel-container {
          width: 50%;
      }
  }
  @media screen and (max-width: 600px) {
      .panel-container {
          width: 100%;
      }
  }

  .panel {
    padding: 18px;
    padding-bottom: 7px;
    margin: 10px;  /* 12px -2px for border*/
    border-radius: 4px;
    border: 1px solid var(--light-grey);
    box-shadow: 0 0 10px -1px var(--light-grey);
    background: white;
    transition-duration: 0.3s;
    backface-visibility: hidden;
    overflow: auto;
  }

  .back {
    position: absolute;
    top: 0;
    left: 0;
    height: calc(100% - 44px);
    overflow: hidden;
  }

  .required {
    border: 1px solid var(--highlight-color);
    box-shadow: 0 0 25px -4px var(--highlight-color);
  }

  .hidden {
    opacity: 0.5;
    border: none;
    margin: 11px;
    box-shadow: none;
    background: var(--stripes-gradient);
    background-size: var(--stripes-bg-size);
  }

  .next-button {
    float: right;
 	color: var(--black);
    cursor: pointer;
  }
 
  .about-button {
    color: grey;
 	font-size: 0.8em;
    cursor: pointer;
  }

  .footer {
    width: 100%;
    padding: 22px 0 12px 0;
    background: white;
  }

  .back .content {
    height: calc(100% - 52px);
    overflow: scroll;
    mask-image: linear-gradient(to bottom, black calc(100% - 24px), transparent 100%);
  }

  .back .footer {
    position: sticky;
    bottom: 0;
  }

</style>

<div class="panel-container"
     style="max-width: var(--max-app-size);
             {topSticky ? 'width: 100%' : ''}">
  <div class="panel {state} front"
       style={frontSide ? '' : 'transform: rotateY(180deg);'}>
    <div class="content">
      <slot name="front"></slot>
    </div>
    {#if showFooter}
      <div class="footer">
        <span class="about-button" on:click={flipPanel}>How do we calculate this?</span>
            {#if $appState == name}
              <span on:click={nextAppState} class="next-button">Next</span>
        	{/if}
        </div>
    {/if}
  </div>
  <div class="panel {state} back"
       style={frontSide ? 'transform: rotateY(180deg)' : 'transform: rotateY(360deg);'}>
    <div class="content">
      <slot name="back"></slot>
      <br>
    </div>
    <div class="footer">
    	<p>
    	  <span class="about-button" on:click={flipPanel}>Back to calculator</span>
    	</p>
    </div>
  </div>
</div>

